import dotenv from 'dotenv';
import { getAccountBalance, getRoflMarketProvider } from './api/oasis';
import { sendBalanceReport } from './slackClient.js';
import { TokenBalance } from './types';

dotenv.config();

const fallbackBalanceAlertThreshold = BigInt('100000000000000000000'); // 100 ROSE

const alertThreshold = process.env.SLACK_TRIGGER_MESSAGE_THRESHOLD
  ? BigInt(process.env.SLACK_TRIGGER_MESSAGE_THRESHOLD)
  : fallbackBalanceAlertThreshold;

async function checkNetwork(network: 'mainnet' | 'testnet') {
  try {
    const provider = await getRoflMarketProvider(network);
    const addresses = provider.nodes;
    const ticker = network === 'mainnet' ? 'ROSE' : 'TEST';

    for (const address of addresses) {
      try {
        const balances = await getAccountBalance(address, network);
        const balance = balances.find(
          (token: TokenBalance) => token.ticker === ticker
        );

        if (balance?.balance && BigInt(balance.balance) < alertThreshold) {
          await sendBalanceReport(address, network, balance, provider.name);
        }
      } catch (error) {
        console.error(
          `Error fetching balance for ${address} on ${network}:`,
          error
        );
      }
    }
  } catch (error) {
    console.error(`Error checking ${network}:`, error);
  }
}

async function main() {
  await Promise.allSettled([checkNetwork('mainnet'), checkNetwork('testnet')]);
}

main();
