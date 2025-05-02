"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Category section error:", error);
  }, [error]);

  return (
    <section className="py-4">
      <div className="container">
        <Card className="border-muted/50">
          <CardHeader className="space-y-1 pb-2">
            <div className="mb-4 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                <AlertTriangle className="h-10 w-10 text-red-600" />
              </div>
            </div>
            <CardTitle className="text-center text-2xl">
              Category Error
            </CardTitle>
            <CardDescription className="text-center">
              We encountered an error while loading the category information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pb-2 text-center">
            <p className="text-muted-foreground">
              Please try again or return to the categories list. If the problem
              persists, contact support.
            </p>

            {/* Only show error details in development */}
            {process.env.NODE_ENV === "development" && (
              <div className="bg-muted/50 max-h-32 overflow-auto rounded-md p-4 text-left font-mono text-xs">
                <p className="font-semibold">
                  Error details (visible in development only):
                </p>
                <p className="text-red-600">{error.message}</p>
                {error.stack && (
                  <pre className="text-muted-foreground mt-2 whitespace-pre-wrap">
                    {error.stack.split("\n").slice(1, 4).join("\n")}
                  </pre>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-wrap justify-center gap-4 pt-2">
            <Button onClick={reset} variant="default">
              Try Again
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/category">Back to Category</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
