"use client";

import DeleteConfirmationDialog from "@/components/admin/DeleteConfirmationDialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const DropdownAction = ({
  param,
  link,
}: {
  param: { id: string };
  link: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  let type: string;
  switch (link) {
    case "/admin/category":
      type = "Category";
      break;
    case "/admin/menu":
      type = "Menu";
      break;
    default:
      type = "";
      break;
  }

  return (
    <div className="mr-3 flex items-center justify-end">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="text-muted-foreground data-[state=open]:bg-muted flex size-8 focus-visible:ring-0"
              size="icon"
            >
              <span className="sr-only">Open menu</span>
              <MoreVerticalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => navigator.clipboard.writeText(param.id)}
            >
              Copy ID
            </DropdownMenuItem>
            <Link href={`${link}/${param.id}`}>
              <DropdownMenuItem className="cursor-pointer">
                View
              </DropdownMenuItem>
            </Link>
            <Link href={`${link}/${param.id}/edit`}>
              <DropdownMenuItem className="cursor-pointer">
                Edit
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />

            <DialogTrigger asChild>
              <DropdownMenuItem
                variant="destructive"
                className="cursor-pointer"
              >
                Delete
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>

        <DeleteConfirmationDialog
          type={type}
          id={param.id}
          setIsOpen={setIsOpen}
        />
      </Dialog>
    </div>
  );
};

export default DropdownAction;
