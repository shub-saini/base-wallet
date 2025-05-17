import { Wallet } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

function Appbar() {
  return (
    <div className="flex justify-between items-center p-4 mb-6">
      <div className="flex gap-2 items-center">
        <Wallet size={35} />
        <div className="font-extrabold text-3xl">Base Wallet</div>
      </div>
      <ThemeToggle />
    </div>
  );
}

export default Appbar;
