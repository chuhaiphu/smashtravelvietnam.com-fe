import { Loader } from '@mantine/core';
import { Suspense } from 'react';
import { getAllBookingsActionPrivate } from '@/actions/booking-action';
import { getAllCustomTourRequestsActionPrivate } from '@/actions/custom-tour-request-action';
import { getAllCustomerContactsActionPrivate } from '@/actions/customer-contact-action';
import AdminPageContent from '@/components/mains/admin-page-content/admin-page-content';

export default function AdminPage() {
  const bookingsResultPromise = getAllBookingsActionPrivate().then((res) => res.data || []);
  const customTourRequestsResultPromise = getAllCustomTourRequestsActionPrivate().then((res) => res.data || []);
  const customerContactsResultPromise = getAllCustomerContactsActionPrivate().then((res) => res.data || []);

  return (
    <Suspense fallback={<Loader size={48} />}>
      <AdminPageContent
        bookingsPromise={bookingsResultPromise}
        customTourRequestsPromise={customTourRequestsResultPromise}
        customerContactsPromise={customerContactsResultPromise}
      />
    </Suspense>
  );
}