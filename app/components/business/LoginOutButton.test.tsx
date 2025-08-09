import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // 导入自定义匹配器
import React from 'react'; // 确保导入 React
import SignOutButton from './LoginOutButton';

// 模拟 'useTransition' 钩子，以便我们能控制其内部状态
// 这允许我们手动触发 'isPending' 状态的改变
const mockStartTransition = jest.fn((callback) => {
  callback(); // 立即执行回调，模拟异步操作
});
const mockUseTransition = jest.fn(() => [false, mockStartTransition]);

// 模拟 'lucide-react' 模块，以解决 Jest 的解析错误
// 这样 Jest 就不会尝试解析 ES Module，而是直接使用一个模拟组件
jest.mock('lucide-react', () => ({
  LogOutIcon: () => <svg data-testid='logout-icon' />,
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'), // 保留 React 的原始行为
  useTransition: () => mockUseTransition(),
}));

describe('SignOutButton', () => {
  // 将 mockSignOut 和 jest.mock 放在这里，以确保在 jest.mock 被调用时变量已初始化
  const mockSignOut = jest.fn();
  jest.mock('@/app/actions/auth', () => ({
    signOut: mockSignOut,
  }));

  beforeEach(() => {
    // 每次测试前重置 mock，确保测试环境是干净的
    mockUseTransition.mockReturnValue([false, mockStartTransition]);
    mockSignOut.mockReset();
  });

  // 测试用例 1: 初始状态下组件是否正确渲染
  test('should render the sign out button correctly', () => {
    render(<SignOutButton />);

    // 检查按钮文本是否为 'Sign Out'
    const button = screen.getByRole('button', { name: 'Sign Out' });
    expect(button).toBeInTheDocument();

    // 检查按钮在初始状态下是否未禁用
    expect(button).not.toBeDisabled();

    // 检查 LogOutIcon 是否被正确渲染
    expect(screen.getByTestId('logout-icon')).toBeInTheDocument();
  });

  // 测试用例 2: 点击后是否进入 pending 状态并禁用按钮
  test('should show pending state and disable the button after click', async () => {
    // 模拟 useTransition 返回 pending 状态
    mockUseTransition.mockReturnValue([true, mockStartTransition]);

    render(<SignOutButton />);

    const button = screen.getByRole('button');

    // 检查按钮文本是否变为 'Signing out...'
    expect(button).toHaveTextContent('Signing out...');

    // 检查按钮是否被禁用
    expect(button).toBeDisabled();
  });

  // 测试用例 3: 点击后是否调用 signOut action
  test('should call the signOut action when the button is clicked', async () => {
    render(<SignOutButton />);

    const button = screen.getByRole('button', { name: 'Sign Out' });

    // 模拟用户点击按钮
    fireEvent.click(button);

    // useTransition 是一个异步操作，需要使用 waitFor 等待其完成
    await waitFor(() => {
      // 检查 signOut 函数是否被调用了一次
      expect(mockSignOut).toHaveBeenCalledTimes(1);
    });
  });

  // 测试用例 4: 登出操作完成后，按钮状态是否恢复
  test('should revert to initial state after sign out completes', async () => {
    render(<SignOutButton />);

    const button = screen.getByRole('button', { name: 'Sign Out' });

    // 模拟用户点击按钮
    fireEvent.click(button);

    // useTransition 的回调执行完毕，mock 会重置为非 pending 状态
    await waitFor(() => {
      // 检查按钮文本是否恢复为 'Sign Out'
      expect(button).toHaveTextContent('Sign Out');
      // 检查按钮是否不再被禁用
      expect(button).not.toBeDisabled();
    });
  });
});
