import { ICreateCustomerContact, ICustomerContactResponse } from "@/interfaces/customer-contact-interface";
import { api } from "./_base";

// ==================== PUBLIC ROUTES ====================

export async function createCustomerContactApi(data: ICreateCustomerContact) {
  return api<ICustomerContactResponse>('/contacts', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ==================== ADMIN ROUTES ====================
export async function getAllCustomerContactsAdminApi() {
  return api<ICustomerContactResponse[]>(`/contacts/admin/list`, {
    method: 'GET',
  });
}

export async function getCustomerContactByIdApi(id: string) {
  return api<ICustomerContactResponse>(`/contacts/admin/${id}`, {
    method: 'GET',
  });
}

export async function deleteCustomerContactApi(id: string) {
  return api<void>(`/contacts/admin/${id}`, {
    method: 'DELETE',
  });
}
