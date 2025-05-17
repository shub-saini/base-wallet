'use client';

import { Button } from './ui/button';
import ClearWalletDialog from './ClearWalletDialog';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import KeyToClipboard from './KeyToClipboard';
import DeleteAccountDialog from './DeleteAccountDialog';
import { useKeyStore } from '@/store/keyStore';
import { deriveHdWallet } from '@/lib/deriveHdWallet';
import { toast } from 'sonner';
import { useEffect, useRef } from 'react';

function Accounts() {
  const mnemonicPhrase = useKeyStore((state) => state.mnemonics);
  const accounts = useKeyStore((state) => state.accounts);
  const addAccount = useKeyStore((state) => state.addAccount);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [accounts.length]);

  return (
    <div className='p-4'>
      <div className='flex items-center justify-between mb-8'>
        <div className='text-4xl font-bold'>Accounts</div>
        <div className='flex gap-2'>
          <Button
            onClick={() => {
              let walletindex = 0;
              if (accounts.length === 0) {
                walletindex = 0;
              } else {
                for (let i = 0; i <= accounts.length; i++) {
                  const exists = accounts.some(
                    (element) => element.derivedAccountNumber === i
                  );

                  if (!exists) {
                    walletindex = i;
                  }
                }
              }
              const keys = deriveHdWallet(mnemonicPhrase!, walletindex);
              addAccount({
                eth: {
                  publicAddress: keys.ethereum.publicAddress,
                  privateKey: keys.ethereum.privateKey,
                },
                sol: {
                  publicAddress: keys.solana.publicAddress,
                  privateKey: keys.solana.privateKey,
                },
                btc: {
                  publicAddress: keys.bitcoin.publicAddress,
                  privateKey: keys.bitcoin.privateKey,
                },
                derivedAccountNumber: walletindex,
              });

              toast('Wallet Account Added!');
            }}
          >
            Add Account
          </Button>
          <ClearWalletDialog />
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        {accounts.map((ele, index) => (
          <div className='border rounded-xl' key={index}>
            <div className='flex justify-between items-center p-6'>
              <div className='text-3xl'>Account {index + 1}</div>
              <div className='p-2 rounded-xl cursor-pointer'>
                <DeleteAccountDialog
                  derviedAccountNumber={ele.derivedAccountNumber}
                />
              </div>
            </div>

            <Tabs defaultValue='public-keys'>
              <TabsList className=''>
                <TabsTrigger value='public-keys' className=''>
                  Public Keys
                </TabsTrigger>
                <TabsTrigger value='private-keys' className=''>
                  Private Keys
                </TabsTrigger>
                {/* <TabsTrigger value="eth-balance" className="text-xl">
                  Eth Balance
                </TabsTrigger> */}
              </TabsList>
              <TabsContent value='public-keys'>
                <Card className='w-full'>
                  <CardContent>
                    <div className='flex flex-col gap-4'>
                      <div>
                        <div className='text-xl font-semibold'>Bitcoin</div>
                        <KeyToClipboard
                          keyToCopy={ele.btc.publicAddress}
                          privacy='public'
                        />
                      </div>
                      <div>
                        <div className='text-xl font-semibold'>Ethereum</div>
                        <KeyToClipboard
                          keyToCopy={ele.eth.publicAddress}
                          privacy='public'
                        />
                      </div>
                      <div>
                        <div className='text-xl font-semibold'>Solana</div>
                        <KeyToClipboard
                          keyToCopy={ele.sol.publicAddress}
                          privacy='public'
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value='private-keys'>
                <Card className='w-full'>
                  <CardContent className='break-words'>
                    <div className='flex flex-col gap-4'>
                      <div>
                        <div className='text-xl font-semibold'>Bitcoin</div>
                        <KeyToClipboard
                          keyToCopy={ele.btc.privateKey}
                          privacy='private'
                        />
                      </div>
                      <div>
                        <div className='text-xl font-semibold'>Ethereum</div>
                        <KeyToClipboard
                          keyToCopy={ele.eth.privateKey}
                          privacy='private'
                        />
                      </div>
                      <div>
                        <div className='text-xl font-semibold'>Solana</div>
                        <KeyToClipboard
                          keyToCopy={ele.sol.privateKey}
                          privacy='private'
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              {/* <TabsContent value="eth-balance">
                <Card>
                  <CardContent></CardContent>
                </Card>
              </TabsContent> */}
            </Tabs>
          </div>
        ))}
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
export default Accounts;
