import DeleteConfirmationDialog from "@/components/admin/DeleteConfirmationDialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { getCategory } from "@/lib/actions/category";
import { format } from "date-fns";
import {
  CalendarIcon,
  ChevronLeft,
  Pencil,
  Trash2,
  UtensilsIcon,
} from "lucide-react";
import Link from "next/link";

export default async function AdminCategoryDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getCategory(id);

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
        <div className="flex items-center gap-2">
          <Button>
            <Pencil className="size-4" />
            <span className="hidden md:inline">Edit Category</span>
            <span className="md:hidden">Edit</span>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="size-4" />
                <span className="hidden md:inline">Delete Category</span>
                <span className="md:hidden">Delete</span>
              </Button>
            </DialogTrigger>
            <DeleteConfirmationDialog type="Category" id={id} />
          </Dialog>
        </div>
      </div>

      <div className="space-y-1 px-1">
        <h1 className="text-3xl font-bold tracking-tight">
          {result.data.name}
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
              <p className="font-mono text-sm">{result.data.id}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-sm font-medium">Name</p>
              <p>{result.data.name}</p>
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
                <p className="text-2xl font-bold">{result.data._count.menus}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <a href={`/categories/${result.data.id}/menus`}>View Menus</a>
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
                {format(new Date(result.data.createdAt), "PPP 'at' p")}
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
                {format(new Date(result.data.updatedAt), "PPP 'at' p")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
