import { notFound } from "next/navigation";

export default function AdminCatchAllPage() {
  notFound(); // This will trigger your src/app/admin/not-found.tsx
}
