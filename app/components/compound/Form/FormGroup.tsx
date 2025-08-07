import { cn } from '@/lib/utils';

// Form Group
interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
export function FormGroup({ className, children, ...props }: FormGroupProps) {
  return (
    <div className={cn('space-y-2', className)} {...props}>
      {children}
    </div>
  );
}
