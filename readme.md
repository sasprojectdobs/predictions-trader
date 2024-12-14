⚠️ ALPHA ⚠️

# Trading Bot for prediction markets.

Use the existing arbitrage strategy or create your own. Currently supports Drift and PolyMarket. If you would like to add another connector, please open an issue or message me on X at

## ⚠️ This bot currently does not deal with managing/closing positions or selling ERC1155 tokens. Only supports opening positions through USDC.

## Known Issues
- Drift order creations always return true because reading the tx is not yet implemented.
- Drift FoK order is not working currently so we create a limit order with a 30s expiry time for now
- Polymarket order size/quantity needs to be a whole number because Polymarket API throws an error with incorrect precision otherwise

## Improvements
- Enable bulk order creation to save gas costs
- Implement configruing how many wallet balance to use in a strat

## Disclaimer

The bot in BETA and will most probably contain bugs. Use at your own discrection. YOU MAY LOSE FUNDS. Roadmap

- [✅] Drift & Polymarket connectors
- [✅] arb strat
- [✅] test script
- [] cross exchange MM

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Ethereum wallet with some MATIC for gas fees
- Solana wallet with some SOL for gas fees
- USDC balance on both Polygon and Solana networks

## Repository Structure

- `src/connectors/`: Contains BaseConnector, PolymarketConnector and DriftConnector
- `src/strategies/`: Includes BaseStrategy, ArbStrategy for arbitrage logic
- `config/`: Contains prod.ts which you can modify
- `src/utils/`: Utilities like ConfigService and Logger
- `src/index.ts`: Main execution file

## Getting started

1. Copy the .env.example and create a new .env file at the root of the project

2. Fill in the required environment variables in the .env file. Your environment variables never leave your device. Double check the source code to ensure this is the case. (Don't trust, verify.)

3. Ensure you have sufficient USDC balance on both Polygon and Solana networks for Polymarket and Drift.

4. Install dependencies:
- run npm install to install the required dependencies

5. Adjusting the strategy:
- Open `config/prod.ts`
- Modify the `params` object in the strategy configuration:
- `market_id`: Set the market ID for the market you want to trade. It is the slug of the market you want to trade. You can get the slug from the URL of Polymarket/Drift

- `polymarket market_id example`
In the case of PolyMarket,

Slug would be will-biden-announce-resignation-by-august-31

- `drift market_id example`
In the case of Drift, let's say the URL is ,
the slug would be TRUMP-WIN-2024-BET

- `balance_perc`: Adjust the percentage of your balance to use for trades

- `min_spread`: Set the minimum price difference required for the bot to execute a trade
- Save the config file

6. Run the bot
- npm start

7. Monitor the bot's activity:
- Watch the console output for real-time information on market conditions, arbitrage opportunities, and executed trades.
- The bot will log important events, including initialization status, balance updates, and trade executions.



