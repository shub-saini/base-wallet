import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useKeyStore } from "@/store/keyStore";
import { DialogClose } from "@radix-ui/react-dialog";

function ClearWalletDialog() {
  const clearWallet = useKeyStore((state) => state.clearWallet);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"destructive"}>Clear Wallet</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete all wallets?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            wallets and keys from local storage.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex gap-2">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button variant={"destructive"} onClick={clearWallet}>
              Clear Wallet
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default ClearWalletDialog;
