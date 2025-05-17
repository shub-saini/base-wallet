"use client";
import Accounts from "@/components/Accounts";
import Appbar from "@/components/Appbar";
import LandingPage from "@/components/LandingPage";
import { useHasHydrated } from "@/hooks/useHasHydrated";
import { useKeyStore } from "@/store/keyStore";
import DisplayMnemonics from "@/components/DisplayMnemonics";
import Footer from "@/components/Footer";

export default function Home() {
  const hasHydrate = useHasHydrated();
  const mnemonicPhrase = useKeyStore((state) => state.mnemonics);

  if (!hasHydrate) return null;

  return (
    <div className=" flex justify-center min-h-screen">
      <div className="max-w-6xl w-full flex flex-col">
        <Appbar />
        <div className="flex-grow">
          {mnemonicPhrase ? (
            <>
              <DisplayMnemonics />
              <Accounts />
            </>
          ) : (
            <LandingPage />
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
