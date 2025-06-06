// import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import React, { forwardRef } from 'react';

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

type FormInputProps = React.InputHTMLAttributes<HTMLInputElement>;
export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-border-medium dark:bg-[#222222] dark:text-gray-100 dark:placeholder:text-gray-500',
          className
        )}
        {...props}
      />
    );
  }
);
FormInput.displayName = 'FormInput';
