import { cn } from '@/lib/utils';

// Form Error
interface FormErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}
export function FormError({ className, children, ...props }: FormErrorProps) {
  return (
    <p className={cn('text-xs font-medium text-red-500', className)} {...props}>
      {children}
    </p>
  );
}
