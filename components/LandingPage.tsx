import { useHasHydrated } from "@/hooks/useHasHydrated";
import CreateNewMnemonicsDialog from "./CreateMnemonicsDialog";
import { Button } from "./ui/button";
import { useKeyStore } from "@/store/keyStore";
import ImportMnemonicsDialog from "./ImportMnemonicsDialog";

function LandingPage() {
  return (
    <div className="p-4 flex flex-col gap-4 mt-16">
      <div className="text-6xl font-bold">Base Wallet multiple blockchains</div>
      <div className="text-2xl">Import a Phrase or create a new one.</div>
      <div className="flex gap-4">
        <ImportMnemonicsDialog />
        <CreateNewMnemonicsDialog />
      </div>
    </div>
  );
}
export default LandingPage;
