import { getAllBookingsAction } from '@/actions/booking-action';
import { getAllCustomTourRequestsAction } from '@/actions/custom-tour-request-action';
import { getAllCustomerContactsAction } from '@/actions/customer-contact-action';
import AdminPageContent from '../../../components/mains/admin-page-content/admin-page-content';
import { Suspense } from 'react';

export default async function AdminPage() {
  const bookingsResultPromise = getAllBookingsAction().then((res) => res.data || []);
  const customTourRequestsResultPromise = getAllCustomTourRequestsAction().then((res) => res.data || []);
  const customerContactsResultPromise = getAllCustomerContactsAction().then((res) => res.data || []);

  return (
    <Suspense>
      <AdminPageContent
        bookingsPromise={bookingsResultPromise}
        customTourRequestsPromise={customTourRequestsResultPromise}
        customerContactsPromise={customerContactsResultPromise}
      />
    </Suspense>
  );
}