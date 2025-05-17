import { mnemonicToSeedSync, validateMnemonic } from "bip39";
import { ethers } from "ethers";
import * as bip32 from "bip32";
import { derivePath as deriveSolanaPath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import * as bitcoin from "bitcoinjs-lib";

export function deriveHdWallet(mnemonic: string, derivedNumber: number) {
  if (!validateMnemonic(mnemonic)) {
    throw new Error("Invalid Mnemonic!");
  }

  const seed = mnemonicToSeedSync(mnemonic); // convert to buffer
  const root = bip32.fromSeed(seed); // btc and eth -> secp256k1 eliptical curve

  // solana
  const solanaPath = `m/44'/501'/${derivedNumber}'/0'`;
  const derivedSolanaSeed = deriveSolanaPath(solanaPath, seed.toString("hex")); // ed25519 eliptical curve
  const solKeyPair = Keypair.fromSeed(derivedSolanaSeed.key);

  const solanaPublicAddress = solKeyPair.publicKey.toBase58();
  const solanaPrivateKey = bs58.encode(solKeyPair.secretKey);

  // ethereum
  const ethPath = `m/44'/60'/0'/0/${derivedNumber}`;
  const derivedEthSeed = root.derivePath(ethPath);
  const ethWallet = new ethers.Wallet(
    derivedEthSeed.privateKey?.toString("hex")!
  );

  const ethPublicAddress = ethWallet.address;
  const ethPrivateKey = ethWallet.privateKey;

  //bitcoin
  const btcPath = `m/84'/0'/0'/0/${derivedNumber}`;
  const derivedBtcSeed = root.derivePath(btcPath);

  const { address } = bitcoin.payments.p2wpkh({
    pubkey: derivedBtcSeed.publicKey,
    network: bitcoin.networks.bitcoin,
  });

  // const btcPublicKey = derivedBtcSeed.publicKey.toString("hex");
  const btcPublicAddress = address!;
  const btcPrivateKey = derivedBtcSeed.toWIF();

  return {
    solana: {
      publicAddress: solanaPublicAddress,
      privateKey: solanaPrivateKey,
    },
    ethereum: {
      publicAddress: ethPublicAddress,
      privateKey: ethPrivateKey,
    },
    bitcoin: {
      publicAddress: btcPublicAddress,
      privateKey: btcPrivateKey,
    },
  };
}
