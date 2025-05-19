import MenuForm from "@/components/admin/MenuForm";
import prisma from "@/lib/prisma";

export default async function AdminMenuCreatePage() {
  const categories = await prisma.category.findMany();

  return (
    <section>
      <MenuForm categories={categories} />
    </section>
  );
}
