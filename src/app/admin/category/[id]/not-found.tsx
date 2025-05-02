import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileQuestion } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-4">
      <div className="container">
        <Card className="border-muted/50">
          <CardHeader className="space-y-1 pb-2">
            <div className="mb-4 flex justify-center">
              <div className="bg-muted/50 flex h-20 w-20 items-center justify-center rounded-full">
                <FileQuestion className="text-muted-foreground h-10 w-10" />
              </div>
            </div>
            <CardTitle className="text-center text-2xl">
              Category Not Found
            </CardTitle>
            <CardDescription className="text-center">
              The category you&apos;re looking for doesn&apos;t exist or has
              been removed.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2 text-center">
            <p className="text-muted-foreground">
              Please check the category ID and try again, or return to the
              categories list.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center pt-2">
            <Button asChild>
              <Link href="/admin/category" className="flex items-center gap-2">
                Back to Category
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
