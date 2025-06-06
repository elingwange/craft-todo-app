import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger';
type StatusType = 'backlog' | 'todo' | 'in_progress' | 'done';
type PriorityType = 'low' | 'medium' | 'high';

const statusToVariant: Record<StatusType, BadgeVariant> = {
  backlog: 'secondary',
  todo: 'default',
  in_progress: 'warning',
  done: 'success',
};

const priorityToVariant: Record<PriorityType, BadgeVariant> = {
  low: 'secondary',
  medium: 'default',
  high: 'danger',
};

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: BadgeVariant;
  status?: StatusType;
  priority?: PriorityType;
}

export default function Badge({
  className,
  variant = 'default',
  children,
  status,
  priority,
  ...props
}: BadgeProps) {
  const getBadgeVariant = (): BadgeVariant => {
    if (status && status in statusToVariant) {
      return statusToVariant[status as StatusType];
    }

    if (priority && priority in priorityToVariant) {
      return priorityToVariant[priority as PriorityType];
    }

    return variant;
  };

  const variantStyles = {
    default: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    outline:
      'border border-gray-200 text-gray-800 dark:border-dark-border-medium dark:text-gray-300',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  const badgeVariant = getBadgeVariant();

  return (
    <span
      className={cn(
        'bg-purple-100 rounded-xl w-fit px-2 py-0.5 text-xs text-purple-800',
        variantStyles[badgeVariant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
