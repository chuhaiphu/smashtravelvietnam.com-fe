import { getUserByIdAction } from '@/actions/user-action';
import { Paper, Stack, Text } from '@mantine/core';
import classes from './admin-user-detail-page-content.module.scss';
import UserDetailForm from '@/components/forms/user-detail-form/user-detail-form';

interface AdminUserDetailPageContentProps {
  params: Promise<{ id: string }>;
}

export default async function AdminUserDetailPageContent({ params }: AdminUserDetailPageContentProps) {
  const { id } = await params;
  const currentUser = await getUserByIdAction(id);

  if (!currentUser) {
    return <div>User not found</div>;
  }

  return (
    <div className={classes.adminUserDetailPageRoot}>
      <Text size="xl" className={classes.pageHeader}>
        User Details
      </Text>

      <Paper p="lg" className={classes.paperBlock} mb="lg">
        <Stack gap="md">
          <div>
            <Text size="sm" c="dimmed">Email</Text>
            <Text size="md" fw={500}>{currentUser.email}</Text>
          </div>
          <div>
            <Text size="sm" c="dimmed">Name</Text>
            <Text size="md" fw={500}>{currentUser.name || 'N/A'}</Text>
          </div>
        </Stack>
      </Paper>

      <Paper p="lg" className={classes.paperBlock}>
        <Text size="lg" mb="lg">
          Change Password
        </Text>

        <UserDetailForm userId={currentUser.id} />
      </Paper>
    </div>
  );
}
