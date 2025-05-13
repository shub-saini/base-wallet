'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { newMnemonics } from '@/lib/mnemonics';
import { useKeyStore } from '@/store/keyStore';

function CreateNewMnemonicsDialog() {
  const setMnemonicPhrase = useKeyStore((state) => state.setMnemonics);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create New Phrase</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-center mb-2'>
            Choose Between 12 or 24 word Phrase
          </DialogTitle>
          <div className='flex justify-around'>
            <Button
              onClick={() => {
                const mnemonics = newMnemonics(12);
                setMnemonicPhrase(mnemonics!);
              }}
            >
              12 Work Phrase
            </Button>
            <Button
              onClick={() => {
                const mnemonics = newMnemonics(24);
                setMnemonicPhrase(mnemonics!);
              }}
            >
              24 Work Phrase
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CreateNewMnemonicsDialog;
