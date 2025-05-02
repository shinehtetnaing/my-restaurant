import ActionBar from "@/components/admin/ActionBar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getCategory } from "@/lib/actions/category";
import { format } from "date-fns";
import { CalendarIcon, UtensilsIcon } from "lucide-react";
import { notFound } from "next/navigation";

export default async function AdminCategoryDetailsPage({
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
    <section className="space-y-6 py-4">
      <ActionBar detailPage type="Category" link="/admin/category" id={id} />

      <div className="space-y-1 px-1">
        <h1 className="text-3xl font-bold tracking-tight">
          {result.data?.name}
        </h1>
        <p className="text-muted-foreground">
          Category details and information
        </p>
      </div>

      <Separator />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Category Information</CardTitle>
            <CardDescription>Basic details about this category</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-muted-foreground text-sm font-medium">ID</p>
              <p className="font-mono text-sm">{result.data?.id}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-sm font-medium">Name</p>
              <p>{result.data?.name}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
            <CardDescription>
              Usage statistics for this category
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                <UtensilsIcon className="text-primary h-6 w-6" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Menus
                </p>
                <p className="text-2xl font-bold">
                  {result.data?._count.menus}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <a href={`/categories/${result.data?.id}/menus`}>View Menus</a>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
          <CardDescription>Category history and changes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 flex size-9 items-center justify-center rounded-full">
              <CalendarIcon className="text-primary size-4" />
            </div>
            <div>
              <p className="font-medium">Created</p>
              <p className="text-muted-foreground text-sm">
                {result.data?.createdAt &&
                  format(new Date(result.data.createdAt), "PPP 'at' p")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-primary/10 flex size-9 items-center justify-center rounded-full">
              <CalendarIcon className="text-primary size-4" />
            </div>
            <div>
              <p className="font-medium">Last Updated</p>
              <p className="text-muted-foreground text-sm">
                {result.data?.updatedAt &&
                  format(new Date(result.data.updatedAt), "PPP 'at' p")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
