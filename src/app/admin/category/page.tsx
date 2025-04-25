import { DataTable } from "@/components/ui/data-table";
import { getCategories } from "@/lib/actions/category";
import { columns } from "./columns";

export default async function AdminCategoryPage() {
  const result = await getCategories();

  return (
    <section>
      <DataTable
        columns={columns}
        data={result.data}
        link="/admin/category/create"
      />
    </section>
  );
}
