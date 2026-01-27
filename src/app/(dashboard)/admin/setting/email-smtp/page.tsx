
import { redirect } from "next/navigation";
import { Route } from "next";
export default async function EmailSmtpPage() {
  redirect('/admin/setting/email-smtp/smtp' as Route);
}