import CategoryForm from "@/components/admin/CategoryForm";
import { getCategory } from "@/lib/actions/category";
import { notFound } from "next/navigation";

export default async function AdminCategoryEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getCategory(id);

  if (!result.success) {
    throw new Error(result.message);
  }

  if (result.success && !result.data) {
    notFound();
  }

  return (
    <section>
      <CategoryForm data={result.data} />
    </section>
  );
}
