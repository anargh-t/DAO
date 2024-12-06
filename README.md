# Decentralized Autonomous Organization (DAO) Platform

A modern, full-featured DAO platform built with React and blockchain technologies. This platform enables decentralized governance through proposal creation, voting, and token management.

![DAO Platform](./screenshots/dashboard.png)

## 🌟 Features

### 💫 Proposal Management
- Create and manage governance proposals
- Comprehensive proposal lifecycle:
  - Pending
  - Active
  - Canceled
  - Defeated
  - Succeeded
  - Queued
  - Expired
  - Executed
- Real-time proposal status tracking
- Time remaining countdown for active proposals
- Detailed proposal views with voting statistics

### 🗳️ Voting System
- Token-based voting mechanism
- Support for Yes/No voting with reasoning
- Real-time vote counting and result display
- Vote delegation capabilities
- Voting history tracking
- Visual vote distribution displays

### 💰 Token Management
- Admin token minting functionality
- Token delegation for voting power
- Token balance tracking
- Voting power visualization
- Token transfer capabilities

### 👥 User Management
- Wallet connection via RainbowKit
- Role-based access control
- Admin dashboard for governance
- Member directory
- Activity tracking

### 🎨 Modern UI/UX
- Dark theme with gradient accents
- Responsive design for all devices
- Interactive modals and transitions
- Real-time updates
- Accessibility-focused design

## 🛠️ Technical Stack

### Frontend
- **React (Vite)**: Fast, modern frontend framework
- **Tailwind CSS**: Utility-first CSS framework
- **RainbowKit**: Wallet connection management
- **Wagmi**: React Hooks for Ethereum
- **Heroicons**: Beautiful UI icons

### Blockchain
- **Solidity**: Smart contract development
- **OpenZeppelin**: Secure contract libraries
- **Sepolia**: Ethereum testnet support
- **Ethers.js**: Ethereum interaction library

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MetaMask or another Web3 wallet

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/dao-platform.git
cd dao-platform
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
```bash
cp .env.example .env
```
Edit `.env` with your configuration:
```
VITE_INFURA_ID=your_infura_id
VITE_CONTRACT_ADDRESS=your_contract_address
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

## 🏗️ Project Structure

```
dao-platform/
├── src/
│   ├── components/        # React components
│   ├── contracts/        # Smart contract ABIs
│   ├── hooks/           # Custom React hooks
│   ├── context/         # React context providers
│   ├── utils/           # Utility functions
│   └── App.jsx          # Main application
├── public/              # Static assets
└── contracts/           # Solidity smart contracts
```

## 💻 Usage

### Creating a Proposal
1. Connect your wallet
2. Navigate to the Proposals section
3. Click "Create Proposal"
4. Fill in proposal details
5. Submit and pay gas fees

### Voting on Proposals
1. Browse active proposals
2. Click "Cast Vote" on a proposal
3. Choose Yes/No and optionally add reasoning
4. Confirm transaction

### Delegating Votes
1. Click "Delegate Tokens" in the header
2. Enter delegate address (or leave empty for self-delegation)
3. Confirm delegation transaction

### Minting Tokens (Admin Only)
1. Access admin dashboard
2. Click "Mint Tokens"
3. Enter recipient address and amount
4. Confirm minting transaction

## 🔐 Security

- Smart contract auditing
- Role-based access control
- Secure wallet integration
- OpenZeppelin security standards
- Input validation and sanitization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
```bash
git checkout -b feature/AmazingFeature
```
3. Commit changes
```bash
git commit -m 'Add AmazingFeature'
```
4. Push to branch
```bash
git push origin feature/AmazingFeature
```
5. Open a Pull Request

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

Your Name - [@yourusername](https://twitter.com/yourusername)

Project Link: [https://github.com/yourusername/dao-platform](https://github.com/yourusername/dao-platform)

## 🙏 Acknowledgments

- [OpenZeppelin](https://openzeppelin.com/)
- [RainbowKit](https://www.rainbowkit.com/)
- [Wagmi](https://wagmi.sh/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Heroicons](https://heroicons.com/)
