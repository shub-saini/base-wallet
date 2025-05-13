import { generateMnemonic, validateMnemonic } from 'bip39';

export function newMnemonics(noOfWords: 12 | 24) {
  if (noOfWords === 12) {
    return generateMnemonic();
  }

  if (noOfWords === 24) {
    return generateMnemonic(256);
  }
}

export function isValidMnemonics(mnemonics: string) {
  return validateMnemonic(mnemonics.trim());
}
