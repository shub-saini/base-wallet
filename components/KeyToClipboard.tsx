"use client";

import { CheckCircle, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function KeyToClipboard({
  keyToCopy,
  privacy,
}: {
  keyToCopy: string;
  privacy: "public" | "private";
}) {
  const [hide, setHide] = useState(true);

  const handleClick = async () => {
    await navigator.clipboard.writeText(keyToCopy);

    toast(
      <div
        style={{
          fontSize: "1.1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <CheckCircle size={20} color="green" />
        Copied to Clipboard!
      </div>
    );
  };
  if (privacy === "public")
    return (
      <span className="text-xl cursor-pointer break-all" onClick={handleClick}>
        {keyToCopy}
      </span>
    );

  if (privacy === "private")
    return (
      <div className="flex justify-between items-center gap-2 w-full break-words">
        <span
          className="cursor-pointer text-xl break-all max-w-full"
          onClick={handleClick}
        >
          {hide ? (
            <span className="tracking-widest select-none">
              •••••••••••••••••••••••••••••••••••••
            </span>
          ) : (
            <span>{keyToCopy}</span>
          )}
        </span>
        <span
          className="cursor-pointer shrink-0"
          onClick={() => {
            setHide((hide) => !hide);
          }}
        >
          {hide ? <EyeOff size={20} /> : <Eye size={20} />}
        </span>
      </div>
    );
}
export default KeyToClipboard;
