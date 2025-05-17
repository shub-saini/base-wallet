import { create } from "zustand";
import { persist } from "zustand/middleware";

type KeyType = {
  privateKey: string;
  publicAddress: string;
};

type KeyState = {
  mnemonics: string | null;
  accounts:
    | {
        eth: KeyType;
        sol: KeyType;
        btc: KeyType;
        derivedAccountNumber: number;
      }[];
  setMnemonics: (mnemonics: string) => void;
  addAccount: ({
    eth,
    sol,
    btc,
    derivedAccountNumber,
  }: {
    eth: KeyType;
    sol: KeyType;
    btc: KeyType;
    derivedAccountNumber: number;
  }) => void;
  deleteAccount: (derivedAccountNumber: number) => void;
  clearWallet: () => void;
};

const _useKeyStore = create(
  persist<KeyState>(
    (set) => ({
      mnemonics: null,
      accounts: [],
      setMnemonics: (mnemonics) => set({ mnemonics }),
      addAccount: ({ eth, sol, btc, derivedAccountNumber }) =>
        set((state) => ({
          accounts: [
            ...state.accounts,
            { eth, sol, btc, derivedAccountNumber },
          ],
        })),
      deleteAccount: (derivedAccountNumber) => {
        return set((state) => ({
          accounts: state.accounts.filter(
            (ele) => ele.derivedAccountNumber !== derivedAccountNumber
          ),
        }));
      },
      clearWallet: () => set({ mnemonics: null, accounts: [] }),
    }),
    {
      name: "wallet-keystore",
    }
  )
);

export const useKeyStore = _useKeyStore;
