"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";

function CopyTextToClipboard({
  textToCopy,
  displayText,
}: {
  textToCopy: string;
  displayText: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);

    setTimeout(() => setCopied(false), 700);
  };

  return (
    <Button onClick={handleCopy} variant={"link"}>
      {copied ? (
        "Copied"
      ) : (
        <div className="flex items-center gap-2">
          <Copy />
          <div>{displayText}</div>
        </div>
      )}
    </Button>
  );
}
export default CopyTextToClipboard;
