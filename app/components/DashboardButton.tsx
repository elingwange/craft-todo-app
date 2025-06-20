import { getCurrentUser } from '@/lib/dal';
import Button from './ui/Button';
import Link from 'next/link';

export default async function DashboardButton() {
  const user = await getCurrentUser();
  return (
    <>
      {user ? (
        <Link href='/dashboard'>
          <Button>Go to Dashboard</Button>
        </Link>
      ) : (
        <>Error</>
      )}
    </>
  );
}
