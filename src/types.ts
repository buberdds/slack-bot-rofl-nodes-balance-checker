export type TextBigInt = string;

export interface RuntimeSdkBalance {
  balance: TextBigInt;
  token_symbol: string;
  token_decimals: number;
}

export interface RuntimeAccount {
  address: string;
  balances: RuntimeSdkBalance[];
}

export type RoflMarketProviderPaymentAddress = {
  [key: string]: any;
};

export type RoflMarketProviderMetadata = {
  [key: string]: any;
};

export interface RoflMarketProvider {
  address: string;
  nodes: string[];
  scheduler: string;
  payment_address: RoflMarketProviderPaymentAddress;
  metadata: RoflMarketProviderMetadata;
  stake: TextBigInt;
  offers_next_id: string;
  offers_count: number;
  instances_next_id: string;
  instances_count: number;
  created_at: string;
  updated_at: string;
  removed: boolean;
}

export interface RoflMarketProvidersResponse {
  providers: RoflMarketProvider[];
}

export interface TokenBalance {
  balance: TextBigInt;
  formattedBalance: string;
  ticker: string;
}
