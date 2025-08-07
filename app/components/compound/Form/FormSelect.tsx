import { cn } from '@/lib/utils';

type Option = { label: string; value: string };
interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: Array<Option>;
}
export function FormSelect({ className, children, options, ...props }: FormSelectProps) {
  return (
    <select
      className={cn(
        'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-border-medium dark:bg-[#222222] dark:text-gray-100',
        className
      )}
      {...props}
    >
      {options
        ? options.map((Option) => (
            <option key={Option.value} value={Option.value}>
              {Option.label}
            </option>
          ))
        : children}
    </select>
  );
}
FormSelect.displayName = 'FormSelect';
