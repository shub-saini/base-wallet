"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { isValidMnemonics } from "@/lib/mnemonics";
import { toast } from "sonner";
import { useKeyStore } from "@/store/keyStore";
import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function ImportMnemonicsDialog() {
  const [mnemonics, setMnemonics] = useState("");
  const setMnemonicsPhrase = useKeyStore((state) => state.setMnemonics);
  const [isPending, setIsPending] = useState(false);

  const handleMnemonics = () => {
    setIsPending(true);

    const isValid = isValidMnemonics(mnemonics);
    if (!isValid) {
      toast.error("Invalid Mnemonic Phrase");
    } else {
      setMnemonicsPhrase(mnemonics);
    }

    setIsPending(false);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button size={"lg"} className="p-6 text-xl font-normal">
            Import Wallet from Phrase
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Paste or write your secret phrase</DialogTitle>
            <Textarea
              placeholder="Write 12 or 24 word phrase or Leave empty to generate a new phrase"
              className={cn(
                "resize-none h-[100px] mb-2",
                !isValidMnemonics(mnemonics) && mnemonics.trim() !== ""
                  ? "border-red-500"
                  : ""
              )}
              value={mnemonics}
              onChange={(e) => setMnemonics(e.target.value)}
            />
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={handleMnemonics}
              disabled={isPending || !mnemonics.trim()}
            >
              {isPending ? "Creating Wallet..." : "Importing from old Phrase"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ImportMnemonicsDialog;
