import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useKeyStore } from "@/store/keyStore";
import CopyTextToClipboard from "./CopyTextToClipboard";

function DisplayMnemonics() {
  const mnemonicPhrase = useKeyStore((state) => state.mnemonics)?.split(" ");

  return (
    <Card className="bg-background mb-6 mx-4">
      <CardContent>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-3xl font-bold hover:no-underline cursor-pointer">
              Your Secret Phrase
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
                {mnemonicPhrase?.map((word, index) => (
                  <WordBlock word={word} key={index} />
                ))}
              </div>

              <div className="">
                <CopyTextToClipboard
                  textToCopy={mnemonicPhrase?.join(" ")!}
                  displayText="Copy Secret Phrase to Clipboard"
                />
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
    <div className="text-lg bg-gray-100 dark:bg-card p-4 rounded-sm">
      {word}
    </div>
  );
}
export default DisplayMnemonics;
