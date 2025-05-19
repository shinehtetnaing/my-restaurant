"use client";

import DataTableColumnHeader from "@/components/admin/DataTableColumnHeader";
import DropdownAction from "@/components/admin/DropdownAction";
import { Category, Menu } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

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
    cell: ({ row }) => <DropdownAction category={row.original} />,
    enableHiding: false,
  },
];
