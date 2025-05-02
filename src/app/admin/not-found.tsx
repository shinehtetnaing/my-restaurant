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

export default function AdminNotFound() {
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
              Page Not Found
            </CardTitle>
            <CardDescription className="text-center">
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2 text-center">
            <p className="text-muted-foreground">
              Please check the URL and try again, or navigate to another
              section.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center pt-2">
            <Button asChild>
              <Link href="/admin/dashboard">Back to Dashboard</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
