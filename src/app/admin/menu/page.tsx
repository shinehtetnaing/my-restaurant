import { DataTable } from "@/components/ui/data-table";
import { getMenus } from "@/lib/actions/menu";
import { redirect } from "next/navigation";
import { columns } from "./columns";

export default async function AdminMenuPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const page = Number((await searchParams).page) || 1;
  const pageSize = Number((await searchParams).pageSize) || 10;

  if (page < 1 || pageSize < 1) {
    redirect("/admin/menu?page=1&pageSize=10");
  }

  const result = await getMenus(page, pageSize);

  if (!result.success) {
    throw new Error(result.message);
  }

  return (
    <section>
      <DataTable
        columns={columns}
        data={result.data}
        link="/admin/menu/create"
        page={page}
        pageSize={pageSize}
        pageCount={result.page}
      />
    </section>
  );
}
