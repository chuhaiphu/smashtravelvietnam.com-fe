import { redirect } from "next/navigation";
import { Route } from "next";

export default function AdminMediaPage() {
  redirect('/admin/media/upload' as Route);
}