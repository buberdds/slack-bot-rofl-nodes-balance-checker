import BigNumber from 'bignumber.js';
import * as oasis from '@oasisprotocol/client';

export function fromBaseUnits(
  valueInBaseUnits: string,
  decimals: number
): string {
  const value = new BigNumber(valueInBaseUnits).shiftedBy(-decimals); // / 10 ** decimals
  if (value.isNaN()) {
    throw new Error(`Not a number in fromBaseUnits(${valueInBaseUnits})`);
  }
  return value.toFixed();
}

export function getOasisAddressFromBase64PublicKey(key: string) {
  const keyBytes = new Uint8Array(Buffer.from(key, 'base64'));
  return oasis.staking.addressToBech32(
    oasis.staking.addressFromPublicKey(keyBytes)
  );
}
