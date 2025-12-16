# Slack Bot - Oasis ROFL Provider Nodes Balance Checker

A Node.js Slack bot that monitors ROFL provider balances on Oasis networks (mainnet and testnet) and sends alerts when balances fall below a threshold.

## Local Development

```bash
npm install
cp .env.example .env
npm start
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SLACK_BOT_TOKEN` | Your Slack bot token (starts with `xoxb-`) | Yes |
| `SLACK_CHANNEL_ID` | Channel ID where alerts are sent | Yes |
| `SLACK_TRIGGER_MESSAGE_THRESHOLD` | Balance threshold in wei (default: 100 ROSE) | No |
