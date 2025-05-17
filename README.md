# Base Wallet

A minimal **Next.js** project for generating and managing HD wallets via mnemonic phrases.

---

## 🚀 Features

- Generate new mnemonic phrases (12–24 words)
- Import existing mnemonic (with validation)
- Derive HD wallets (public/private key pairs) for:

  - Bitcoin (BIP84 - Native SegWit)
  - Ethereum (BIP44)
  - Solana (Ed25519)

---

## 🧠 Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **bip39**, **bip32**, **bitcoinjs-lib**
- **ethers.js**, **@solana/web3.js**

---

## 📌 Notes

- Mnemonics are generated using `bip39`.
- Bitcoin path: `m/84'/0'/0'/0/n` (BIP84)
- Ethereum path: `m/44'/60'/0'/0/n`
- Solana path: `m/44'/501'/n'/0'` (standard for Solana)

---

## 🛠️ Development

```bash
git clone https://github.com/your-username/base-wallet.git
cd base-wallet
bun install
bun run dev
```

---

## ⚠️ Disclaimer

This project is for **educational/testing** purposes. Do **not** use it to store real funds.

---
