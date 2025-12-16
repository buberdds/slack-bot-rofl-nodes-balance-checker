import { WebClient } from '@slack/web-api';
import dotenv from 'dotenv';
import { RoseBalance } from './types';

dotenv.config();

const slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);
const channelId = process.env.SLACK_CHANNEL_ID;

const giphy = [
  'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHVwYnNodTBoZzBiZ2U0ZW0xZW9zcXV6cWV1MXNkNGJzYmp0bW10eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/mXakDXUF63bK8/giphy.gif',
  'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExamk5MXZhbm1ibHBmOTZqbjlpanhoc241MDJtMTd6bHF5aXFpNDk4YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/t1QH3xvhEUhe9Tjf5j/giphy.gif',
  'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGptbjI4d3Rjc3RzeGx0YjZ0MGRsd212NXczbDdoejM3bWJsbjh5YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUNd9NhSi2YDdc5QuQ/giphy.gif',
  'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTJqMDR2cnduYnI5ZmxiamlxZTJzYXQyYjJmOGZqNmRvcTU0MGdneCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qsCayJ9SXqWi2rJhNC/giphy.gif',
  'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjVlOHVteWNpaW9qYmJmNmR2M2h0d3p0Yng2YTNjdzBkMndtNnBlciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l4KhOnDl9ObQxL1BK/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGtkZzBheGl2M2h1MDlkeTJjMDI1cjJiY2JidWM2cHFsZnowMzFmcSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o6ZsZ78LqiaSNJrd6/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3dm15YmoxbGJnNjc2b2wzcTZ5MmZkYndnNHNqY3duMHlqMm5tZjJwcSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/YLUmyoCHNLQBgnFUZg/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3dm15YmoxbGJnNjc2b2wzcTZ5MmZkYndnNHNqY3duMHlqMm5tZjJwcSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/LL0Ynac2qcXUzEgOtA/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3a2lhdWp6b2hydXcxbWl0eWNzZnZwMzljZnQxeGcyc3Awd2NzeGFoMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/vLAT14LwIP9ojz7dQ7/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3OTJvcW83eHB2MXN4ODZsNnNvd2JtY3QwbW1mNmV2YTBqMnN0MWkzYyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/A5O7DHr9aXYt7d6O4F/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3OTJvcW83eHB2MXN4ODZsNnNvd2JtY3QwbW1mNmV2YTBqMnN0MWkzYyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/bbSyWKFILFqZK4jfQp/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3OTE1dWNsbGdoMmswaHNkYTN0aXNzbXF0cmN4Y2JkN3VyMXk4dGFuYiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/qP11AGVP8ANQm5lDK9/giphy.gif',
];

function getRandomBeggarGif(): string {
  return giphy[Math.floor(Math.random() * giphy.length)];
}

export async function sendSlackMessage(text: string) {
  try {
    if (!process.env.SLACK_BOT_TOKEN) {
      throw new Error('SLACK_BOT_TOKEN is not set in environment variables');
    }

    if (!channelId) {
      throw new Error('SLACK_CHANNEL_ID is not set in environment variables');
    }

    const result = await slackClient.chat.postMessage({
      channel: channelId,
      text: text,
    });

    return result;
  } catch (error) {
    throw error;
  }
}

export async function sendBalanceReport(
  address: string,
  network: string,
  roseBalance: RoseBalance,
  providerName?: string
) {
  let message = `⚠️ ROFL provider *${providerName}* funds are low on ${network} \n\n`;
  message += `Node address: \`${address}\`\n`;

  if (!roseBalance) {
    message += `No balances found for this address.\n\n`;
  } else {
    message += `Balance: ${roseBalance.formattedBalance} ROSE\n`;
  }

  try {
    if (!process.env.SLACK_BOT_TOKEN) {
      throw new Error('SLACK_BOT_TOKEN is not set in environment variables');
    }

    if (!channelId) {
      throw new Error('SLACK_CHANNEL_ID is not set in environment variables');
    }

    const result = await slackClient.chat.postMessage({
      channel: channelId,
      text: message,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: message,
          },
        },
        {
          type: 'image',
          image_url: getRandomBeggarGif(),
          alt_text: 'Please send funds',
        },
      ],
    });

    return result;
  } catch (error) {
    console.error('Error sending balance report to Slack:', error);
    throw error;
  }
}
