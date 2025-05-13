'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { isValidMnemonics } from '@/lib/mnemonics';
import { toast } from 'sonner';
import { useKeyStore } from '@/store/keyStore';
import CreateNewMnemonicsDialog from './CreateMnemonicsDialog';
import DisplayMnemonics from './DisplayMnemonics';
import { cn } from '@/lib/utils';
import { useHasHydrated } from '@/hooks/useHasHydrated';

function Mnemonics() {
  const [mnemonics, setMnemonics] = useState('');
  const setMnemonicsPhrase = useKeyStore((state) => state.setMnemonics);
  const [isPending, setIsPending] = useState(false);
  const mnemonicPhrase = useKeyStore((state) => state.mnemonics);
  const hasHydrated = useHasHydrated();

  const handleMnemonics = () => {
    setIsPending(true);

    const isValid = isValidMnemonics(mnemonics);
    if (!isValid) {
      toast.error('Invalid Mnemonic Phrase');
    } else {
      setMnemonicsPhrase(mnemonics);
    }

    setIsPending(false);
  };

  if (!hasHydrated) return null;

  if (mnemonicPhrase) return <DisplayMnemonics />;

  return (
    <div className='p-4'>
      <Textarea
        placeholder='Write 12 or 24 word phrase or Leave empty to generate a new phrase'
        className={cn(
          'resize-none h-[100px] mb-2',
          !isValidMnemonics(mnemonics) && mnemonics.trim() !== ''
            ? 'border-red-500'
            : ''
        )}
        value={mnemonics}
        onChange={(e) => setMnemonics(e.target.value)}
      />
      <div className='flex justify-between'>
        <Button
          onClick={handleMnemonics}
          disabled={isPending || !mnemonics.trim()}
        >
          {isPending ? 'Creating Wallet...' : 'Create from old Phrase'}
        </Button>
        <CreateNewMnemonicsDialog />
      </div>
    </div>
  );
}

export default Mnemonics;
