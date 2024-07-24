# Blockchain Explorer

This project is a blockchain explorer that allows users to view transaction details and address information for both Ethereum and Polygon networks.

## Features

- Search for transactions by hash
- View address details and transaction history
- Support for both Ethereum and Polygon networks
- Responsive design for mobile and desktop
- Sorting transactions by time and amount

## Technologies Used

- Next.js 14
- TypeScript
- Styled Components
- Etherscan API
- Polygonscan API

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/psyhedeliq/transactions-explorer.git
   cd blockchain-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your API keys:
   ```env
   ETHERSCAN_API_KEY=your_etherscan_api_key
   POLYGONSCAN_API_KEY=your_polygonscan_api_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.
