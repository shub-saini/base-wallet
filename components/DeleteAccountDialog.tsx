import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { useKeyStore } from "@/store/keyStore";

function DeleteAccountDialog({
  derviedAccountNumber,
}: {
  derviedAccountNumber: number;
}) {
  const deleteAccount = useKeyStore((state) => state.deleteAccount);
  return (
    <Dialog>
      <DialogTrigger>
        <Trash className="text-red-500 cursor-pointer" size={20} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Do you really want to delete Account {derviedAccountNumber + 1}?
          </DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <div className="flex gap-2">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button
              variant={"destructive"}
              onClick={() => {
                deleteAccount(derviedAccountNumber);
                return;
              }}
            >
              Delete Account
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default DeleteAccountDialog;
