"use client";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteCategory } from "@/lib/actions/category";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useTransition } from "react";
import { toast } from "sonner";

const DeleteConfirmationDialog = ({
  type,
  id,
  setIsOpen,
}: {
  type: string;
  id: string;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  let deleteAction: (id: string) => Promise<{
    success: boolean;
    message: string;
    data?: unknown;
  }>;
  switch (type) {
    case "Category":
      deleteAction = deleteCategory;
      break;
    default:
      break;
  }

  const handleDelete = async () => {
    startTransition(async () => {
      const result = await deleteAction(id);

      if (result.success) {
        toast.success(result.message);

        // control the dialog state for dropdown action
        if (setIsOpen) {
          setIsOpen(false);
        }

        // redirect to the category page if the dialog is not from dropdown action
        if (!setIsOpen) {
          router.push("/admin/category");
        }
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete {type}</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this {type}? This action cannot be
          undone.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button
            variant="outline"
            disabled={isPending}
            className="focus-visible:ring-0"
          >
            Cancel
          </Button>
        </DialogClose>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={isPending}
        >
          {isPending ? "Deleting..." : "Yes, I'm sure"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default DeleteConfirmationDialog;
