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
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownAction param={row.original} link="/admin/category" />
    ),
    enableHiding: false,
  },
];
