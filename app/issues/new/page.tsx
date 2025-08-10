export const dynamic = 'force-dynamic';

import { getCurrentUser } from '@/lib/dal';
import NewIssuePage from './NewIssuePage';

export default async function NewIssuePageWrapper() {
  const user = await getCurrentUser();

  if (!user) return <div>Please log in.</div>;

  return <NewIssuePage userId={user.id} />;
}
