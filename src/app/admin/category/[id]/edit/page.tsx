import CategoryForm from "@/components/admin/CategoryForm";
import { getCategory } from "@/lib/actions/category";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertTriangle, ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function AdminCategoryEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getCategory(id);
  console.log(result.data);

  // Handle error case
  if (!result.success) {
    return (
      <section className="space-y-6 py-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" className="-ml-2 gap-1" asChild>
            <Link href="/admin/category">
              <ChevronLeft className="size-4" />
              <span className="hidden md:inline">Back to Category</span>
              <span className="md:hidden">Back</span>
            </Link>
          </Button>
        </div>

        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {result.message || "An error occurred while fetching the category."}
          </AlertDescription>
        </Alert>
      </section>
    );
  }

  // Handle not found case
  if (!result.data) {
    notFound();
  }

  return (
    <section>
      <CategoryForm data={result.data} />
    </section>
  );
}
