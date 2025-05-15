"use client";

import { categorySchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createCategory, updateCategory } from "@/lib/actions/category";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type CategoryWithCount = Prisma.CategoryGetPayload<{
  include: {
    _count: {
      select: { menus: true };
    };
  };
}>;

const CategoryForm = ({ data }: { data?: CategoryWithCount }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: data?.name ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof categorySchema>) {
    const result = data
      ? await updateCategory(data.id, values)
      : await createCategory(values);

    if (result.success) {
      toast.success(result.message);

      router.push("/admin/category");
    } else {
      toast.error(result.message);
    }
  }

  return (
    <div className="py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter category name"
                    {...field}
                    className="input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-3">
            <Link onNavigate={() => router.back()} href="">
              <Button size="lg" variant="secondary" className="cursor-pointer">
                Cancel
              </Button>
            </Link>
            <Button
              size="lg"
              type="submit"
              disabled={form.formState.isSubmitting}
              className="cursor-pointer"
            >
              {data
                ? form.formState.isSubmitting
                  ? "Updating"
                  : "Update"
                : form.formState.isSubmitting
                  ? "Submitting"
                  : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CategoryForm;
