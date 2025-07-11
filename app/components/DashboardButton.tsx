import { getCurrentUser } from '@/lib/dal';
import Button from './ui/Button';
import Link from 'next/link';
import { mockDelay } from '@/lib/utils';

const DashboardButton = async () => {
  const user = await getCurrentUser();

  mockDelay(3000);

  return (
    <>
      {user ? (
        <Link href='/dashboard'>
          <Button>Go to Dashboard</Button>
        </Link>
      ) : (
        <div className='flex items-center space-x-4'>
          <Link href='/signin'>
            <Button variant='outline'>Sign in</Button>
          </Link>
          <Link href='/signup'>
            <Button>Sign up</Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default DashboardButton;
