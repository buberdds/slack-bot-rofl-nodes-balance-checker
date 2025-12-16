import {
  RoflMarketProvidersResponse,
  RuntimeAccount,
  TokenBalance,
} from '../types.js';
import {
  fromBaseUnits,
  getOasisAddressFromBase64PublicKey,
} from './../utils.js';

type Network = 'testnet' | 'mainnet';

const apiUrls: { [key in Network]: string } = {
  mainnet: 'https://nexus.oasis.io/v1/sapphire',
  testnet: 'https://testnet.nexus.oasis.io/v1/sapphire',
};

/**
 * For now we want to whitelist only selected OPF providers based on
 * https://github.com/oasisprotocol/cli/blob/master/build/rofl/provider/defaults.go
 */
export const whitelistedProviders = {
  mainnet: 'oasis1qzc8pldvm8vm3duvdrj63wgvkw34y9ucfcxzetqr',
  testnet: 'oasis1qp2ens0hsp7gh23wajxa4hpetkdek3swyyulyrmz',
} as const;

async function apiRequest<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status} at ${url}`);
  }
  return response.json() as T;
}

export async function getRoflMarketProvider(network: Network) {
  try {
    const apiUrl = `${apiUrls[network]}/roflmarket_providers`;
    const data = await apiRequest<RoflMarketProvidersResponse>(apiUrl);
    const provider = data.providers?.find(
      (p) => p.address === whitelistedProviders[network]
    );

    return {
      name: provider?.metadata?.['net.oasis.provider.name'] ?? '',
      nodes: provider?.nodes.map(getOasisAddressFromBase64PublicKey) ?? [],
    };
  } catch (error) {
    console.error('Error fetching ROFL providers:', error);
    throw error;
  }
}

export async function getAccountBalance(
  oasisAddress: string,
  network: Network
) {
  try {
    const apiUrl = `${apiUrls[network]}/accounts/${oasisAddress}`;
    const data = await apiRequest<RuntimeAccount>(apiUrl);

    return (data.balances ?? []).map((item) => ({
      balance: item.balance,
      formattedBalance: fromBaseUnits(item.balance, item.token_decimals),
      ticker: item.token_symbol,
    }));
  } catch (error) {
    console.error('Error fetching account balance:', error);
    throw error;
  }
}
