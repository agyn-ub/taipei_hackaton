# TaipeiConnect

A decentralized community platform built for the Ethereum Global Hackathon in Taipei. TaipeiConnect enables local communities to engage, earn rewards, and build reputation through blockchain technology.

## Features

- User profiles with reputation system
- Community token rewards (TPC - TaipeiConnect Token)
- Decentralized identity and reputation tracking
- Token-based incentives for community participation

## Smart Contracts

The project uses the following smart contracts:
- `TaipeiConnect.sol`: Main contract implementing ERC20 token, user profiles, and reputation system

## Technology Stack

- Solidity
- Hardhat
- OpenZeppelin Contracts
- Ethers.js
- Chai (for testing)

## Getting Started

### Prerequisites

- Node.js >= 14.0.0
- npm >= 6.0.0

### Installation

1. Clone the repository
```bash
git clone [your-repo-url]
cd taipei_hackaton
```

2. Install dependencies
```bash
npm install
```

3. Run tests
```bash
npx hardhat test
```

### Development

To run a local Hardhat network:
```bash
npx hardhat node
```

To deploy contracts:
```bash
npx hardhat run scripts/deploy.js --network localhost
```

## Testing

The project includes comprehensive tests for all smart contract functionality. Run the tests with:

```bash
npx hardhat test
```

## License

MIT

## Authors

[Your Name]
