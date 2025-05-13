import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useKeyStore } from '@/store/keyStore';

function DisplayMnemonics() {
  const mnemonicPhrase = useKeyStore((state) => state.mnemonics)?.split(' ');

  return (
    <Card className='bg-background'>
      <CardContent>
        <Accordion type='single' collapsible>
          <AccordionItem value='item-1'>
            <AccordionTrigger className='text-3xl font-bold hover:no-underline cursor-pointer'>
              Your Secret Phrase
            </AccordionTrigger>
            <AccordionContent>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
                {mnemonicPhrase?.map((word) => (
                  <WordBlock word={word} key={word} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}

function WordBlock({ word }: { word: string }) {
  return (
    <div className='text-lg bg-gray-100 dark:bg-card p-4 rounded-sm'>
      {word}
    </div>
  );
}
export default DisplayMnemonics;
