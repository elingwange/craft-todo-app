import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Badge from './Badge';

// 描述一个测试套件
describe('Badge', () => {
  // 1. 测试默认渲染
  it('renders with default variant when no props are provided', () => {
    // 渲染 Badge 组件，并传入一个子节点
    render(<Badge>Default</Badge>);
    const badgeElement = screen.getByText('Default');

    // 断言：检查它是否包含默认的样式类
    expect(badgeElement).toHaveClass('bg-purple-100');
    expect(badgeElement).toHaveClass('text-purple-800');
  });

  // 2. 测试不同的 variant 样式
  it('renders with the correct variant style', () => {
    render(<Badge variant='success'>Success</Badge>);
    const badgeElement = screen.getByText('Success');
    expect(badgeElement).toHaveClass('bg-green-100');
    expect(badgeElement).toHaveClass('text-green-800');
  });

  // 3. 测试 status 样式
  it('renders with the correct status style', () => {
    render(<Badge status='in_progress'>In Progress</Badge>);
    const badgeElement = screen.getByText('In Progress');
    expect(badgeElement).toHaveClass('bg-yellow-100');
    expect(badgeElement).toHaveClass('text-yellow-800');
  });

  // 4. 测试 priority 样式
  it('renders with the correct priority style', () => {
    render(<Badge priority='high'>High Priority</Badge>);
    const badgeElement = screen.getByText('High Priority');
    expect(badgeElement).toHaveClass('bg-red-100');
    expect(badgeElement).toHaveClass('text-red-800');
  });

  // 5. 测试优先级规则：status 优先于 priority
  it('status prop takes precedence over priority prop', () => {
    // 同时传入 status 和 priority
    render(
      <Badge status='done' priority='high'>
        Done
      </Badge>
    );
    const badgeElement = screen.getByText('Done');

    // 断言：检查它是否具有 status="done" 的样式，而不是 priority="high" 的样式
    expect(badgeElement).toHaveClass('bg-green-100');
    expect(badgeElement).not.toHaveClass('bg-red-100');
  });

  // 6. 测试 className prop
  it('applies additional className correctly', () => {
    render(<Badge className='custom-class'>Custom</Badge>);
    const badgeElement = screen.getByText('Custom');
    expect(badgeElement).toHaveClass('custom-class');
  });

  // 7. 测试 children prop
  it('renders children correctly', () => {
    render(<Badge>Hello World</Badge>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
