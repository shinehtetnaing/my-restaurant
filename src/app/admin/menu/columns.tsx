"use client";

import DataTableColumnHeader from "@/components/admin/DataTableColumnHeader";
import DropdownAction from "@/components/admin/DropdownAction";
import { Category, Menu } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type MenuWithCategory = Menu & {
  category: Category;
};

export const columns: ColumnDef<MenuWithCategory>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price (THB)" />
    ),
  },
  {
    accessorKey: "Image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => {
      return (
        <Image
          src={row.original.imageUrl}
          alt="Menu Image"
          width={100}
          height={100}
          className="rounded-md object-cover"
        />
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "available",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Available" />
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      return row.original.category?.name ?? "—";
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownAction param={row.original} link="/admin/menu" />
    ),
    enableHiding: false,
  },
];
