import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

// 描述一个测试套件，用于 Button 组件
describe('Button', () => {
  // 测试按钮是否能正确渲染其子节点
  it('should render the children correctly', () => {
    // 渲染 Button 组件，并传入一个子节点
    render(<Button>Click Me</Button>);
    // 断言：检查文档中是否包含 'Click Me' 的文本
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  // 测试默认状态：variant="primary", size="md"
  it('should render with default variant and size', () => {
    render(<Button>Default</Button>);
    const buttonElement = screen.getByRole('button', { name: /default/i });

    // 断言：检查它是否具有默认的 primary variant 样式
    expect(buttonElement).toHaveClass('bg-theme-coffee');
    expect(buttonElement).toHaveClass('text-white');

    // 断言：检查它是否具有默认的 md size 样式
    expect(buttonElement).toHaveClass('h-10');
    expect(buttonElement).toHaveClass('px-4');
  });

  // 测试不同的 variant 样式
  it('should render with the correct variant styles', () => {
    // 测试 primary variant
    const { rerender } = render(<Button variant='primary'>Primary</Button>);
    let buttonElement = screen.getByRole('button', { name: /primary/i });
    expect(buttonElement).toHaveClass('bg-theme-coffee');
    expect(buttonElement).not.toHaveClass('border'); // 确保不包含 outline 的样式

    // 测试 outline variant
    rerender(<Button variant='outline'>Outline</Button>);
    buttonElement = screen.getByRole('button', { name: /outline/i });
    expect(buttonElement).toHaveClass('border');
    expect(buttonElement).not.toHaveClass('bg-theme-coffee'); // 确保不包含 primary 的样式
  });

  // 测试不同的 size 样式
  it('should render with the correct size styles', () => {
    const { rerender } = render(<Button size='sm'>Small</Button>);
    let buttonElement = screen.getByRole('button', { name: /small/i });
    expect(buttonElement).toHaveClass('h-8');

    rerender(<Button size='lg'>Large</Button>);
    buttonElement = screen.getByRole('button', { name: /large/i });
    expect(buttonElement).toHaveClass('h-12');
  });

  // 测试加载状态
  it('should render loading state when isLoading is true', () => {
    const { rerender } = render(<Button isLoading>Submit</Button>);

    // 断言：文本内容应该是 'Loading...'
    const loadingText = screen.getByText('Loading...');
    expect(loadingText).toBeInTheDocument();

    // 断言：原始的子节点不应该存在
    expect(screen.queryByText('Submit')).not.toBeInTheDocument();

    // 断言：按钮应该被禁用
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveAttribute('disabled');

    // 断言：应用了正确的加载样式
    expect(buttonElement).toHaveClass('opacity-70');
    expect(buttonElement).toHaveClass('cursor-not-allowed');

    // 确保当 isLoading 为 false 时，这些状态都恢复正常
    rerender(<Button isLoading={false}>Submit</Button>);
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(buttonElement).not.toHaveAttribute('disabled');
  });

  // 测试禁用状态
  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    const buttonElement = screen.getByRole('button', { name: /disabled/i });

    // 断言：按钮应该被禁用
    expect(buttonElement).toHaveAttribute('disabled');

    // 断言：按钮不应该显示加载状态
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  // 测试 `className` 合并
  it('should merge additional className correctly', () => {
    render(<Button className='custom-class'>Custom</Button>);
    const buttonElement = screen.getByRole('button', { name: /custom/i });

    // 断言：按钮应包含自定义类和默认类
    expect(buttonElement).toHaveClass('custom-class');
    expect(buttonElement).toHaveClass('bg-theme-coffee');
  });

  // 测试事件处理：当按钮被禁用或加载时，不应触发 onClick 事件
  it('should not call onClick when disabled or loading', () => {
    const handleClick = jest.fn();

    // 禁用状态下
    const { rerender } = render(
      <Button onClick={handleClick} disabled>
        Test
      </Button>
    );
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    expect(handleClick).not.toHaveBeenCalled();

    // 加载状态下
    rerender(
      <Button onClick={handleClick} isLoading>
        Test
      </Button>
    );
    fireEvent.click(buttonElement);
    expect(handleClick).not.toHaveBeenCalled();

    // 启用状态下
    rerender(<Button onClick={handleClick}>Test</Button>);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
