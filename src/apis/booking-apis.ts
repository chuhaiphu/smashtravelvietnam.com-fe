import { ICreateBooking, IBookingResponse, IUpdateBooking } from "@/interfaces/booking-interface";
import { api } from "./_base";

export interface BookingFilterParams {
  status?: string;
}

function buildQueryString(filter?: BookingFilterParams): string {
  if (!filter) return '';
  const params = new URLSearchParams();
  if (filter.status) params.append('status', filter.status);
  const query = params.toString();
  return query ? `?${query}` : '';
}

// ==================== PUBLIC ROUTES ====================

export async function createBookingApi(data: ICreateBooking) {
  return api<IBookingResponse>('/bookings', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ==================== ADMIN ROUTES ====================

export async function getAllBookingsAdminApi(filter?: BookingFilterParams) {
  const queryString = buildQueryString(filter);
  return api<IBookingResponse[]>(`/bookings/admin/list${queryString}`, {
    method: 'GET',
  });
}

export async function getBookingByIdApi(id: string) {
  return api<IBookingResponse>(`/bookings/admin/${id}`, {
    method: 'GET',
  });
}

export async function updateBookingApi(id: string, data: IUpdateBooking) {
  return api<IBookingResponse>(`/bookings/admin/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteBookingApi(id: string) {
  return api<void>(`/bookings/admin/${id}`, {
    method: 'DELETE',
  });
}
