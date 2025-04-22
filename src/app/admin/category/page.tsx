import { DataTable } from "@/components/ui/data-table";
import { category } from "@/constants";
import { Category, columns } from "./columns";

async function getData(): Promise<Category[]> {
  // Fetch data from your API here.
  return category;
}

export default async function AdminCategoryPage() {
  const data = await getData();

  return (
    <section>
      <DataTable columns={columns} data={data} link="/admin/category/create" />
    </section>
  );
}
