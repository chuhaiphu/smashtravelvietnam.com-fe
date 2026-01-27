'use server';

import { ICreateCustomerContact, ICustomerContactResponse } from '@/interfaces/customer-contact-interface';
import { ActionResponse } from '@/interfaces/_base-interface';
import { revalidatePath } from 'next/cache';
import { executeApi } from '@/actions/_base';
import {
  getAllCustomerContactsAdminApi,
  createCustomerContactApi,
  deleteCustomerContactApi,
} from '@/apis/customer-contact-apis';

export async function getAllCustomerContactsAction(): Promise<ActionResponse<ICustomerContactResponse[]>> {
  const result = await executeApi(
    async () => getAllCustomerContactsAdminApi()
  );
  return result;
}

export async function submitCustomerContactAction(formData: FormData): Promise<ActionResponse<void>> {
  try {
    // Extract form data
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const notes = formData.get('notes') as string || undefined;
    const captchaToken = formData.get('captchaToken') as string;

    // Validate required fields
    if (!name || !email || !phone) {
      return { success: false, error: 'Name, email, and phone are required' };
    }

    // Validate reCAPTCHA token presence
    if (!captchaToken) {
      return { success: false, error: 'Please complete the reCAPTCHA' };
    }

    // Create customer contact data (backend will verify reCAPTCHA)
    const customerContactData: ICreateCustomerContact = {
      name,
      email,
      phone,
      notes,
      recaptchaToken: captchaToken,
    };

    const result = await executeApi(
      async () => createCustomerContactApi(customerContactData)
    );

    if (!result.success) {
      return result as ActionResponse<void>;
    }

    // Note: Email notifications should be handled by the backend

    revalidatePath('/admin', 'layout');
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to submit contact. Please try again.'
    };
  }
}

export async function deleteCustomerContactAction(id: string): Promise<ActionResponse<void>> {
  const result = await executeApi(
    async () => deleteCustomerContactApi(id)
  );
  revalidatePath('/admin', 'layout');
  return result;
}
