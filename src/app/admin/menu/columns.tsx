"use client";

import DataTableColumnHeader from "@/components/admin/DataTableColumnHeader";
import DropdownAction from "@/components/admin/DropdownAction";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Category = {
  id: string;
  name: string;
  total: number;
};

export const columns: ColumnDef<Category>[] = [
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
  },
  {
    id: "actions",
    cell: ({ row }) => <DropdownAction category={row.original} />,
    enableHiding: false,
  },
];
