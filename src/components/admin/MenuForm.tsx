"use client";

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
import { createMenu } from "@/lib/actions/menu";
import { menuSchema } from "@/lib/validations";
import { Category } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import CategorySelectBox from "./CategorySelectBox";

const MenuForm = ({ categories }: { categories: Category[] }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof menuSchema>>({
    resolver: zodResolver(menuSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      image: fileInputRef.current?.files?.[0],
      categoryId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof menuSchema>) {
    const result = await createMenu(values);

    if (result.success) {
      toast.success(result.message);

      router.push("/admin/menu");
    } else {
      toast.error(result.message);
    }
  }
  return (
    <div className="py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex items-start gap-8 max-md:flex-col">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Menu Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter menu name"
                      {...field}
                      className="input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Menu Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter menu price"
                      {...field}
                      className="input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-start gap-8 max-md:flex-col">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Menu Image</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter menu image"
                      type="file"
                      className="input"
                      ref={fileInputRef}
                      onChange={(e) => {
                        const file = e.target.files?.[0] ?? null;
                        field.onChange(file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CategorySelectBox form={form} categories={categories} />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Menu Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter menu description"
                    className="textarea"
                    {...field}
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
              {form.formState.isSubmitting ? "Submitting" : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default MenuForm;
