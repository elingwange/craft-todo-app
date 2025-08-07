import { cn } from '@/lib/utils';

// Form Label
interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}
export function FormLabel({ className, children, ...props }: FormLabelProps) {
  return (
    <label className={cn('text-sm pt-5 mr-auto mb-3', className)} {...props}>
      {children}
    </label>
  );
}
