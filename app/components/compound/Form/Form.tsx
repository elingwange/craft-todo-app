import { cn } from '@/lib/utils';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}
export function Form({ children, className, ...props }: FormProps) {
  return (
    <form className={cn('space-y-6 w-full', className)} {...props}>
      {children}
    </form>
  );
}
