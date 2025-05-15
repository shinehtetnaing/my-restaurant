import { ChevronLeft, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

type ActionBarProps = {
  detailPage?: boolean;
  type: "Category" | "Menu" | "User";
  link: string;
  id?: string;
};

const ActionBar = ({ detailPage, type, link, id }: ActionBarProps) => {
  return (
    <div className="flex items-center justify-between">
      <Button variant="ghost" size="sm" className="-ml-2 gap-1" asChild>
        <Link href={link}>
          <ChevronLeft className="size-4" />
          <span className="hidden md:inline">Back to {type}</span>
          <span className="md:hidden">Back</span>
        </Link>
      </Button>
      {detailPage && id && (
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href={`${link}/${id}/edit`}>
              <Pencil className="size-4" />
              <span className="hidden md:inline">Edit {type}</span>
              <span className="md:hidden">Edit</span>
            </Link>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" className="cursor-pointer">
                <Trash2 className="size-4" />
                <span className="hidden md:inline">Delete {type}</span>
                <span className="md:hidden">Delete</span>
              </Button>
            </DialogTrigger>
            <DeleteConfirmationDialog type={type} id={id} />
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default ActionBar;
