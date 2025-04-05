import React from 'react';
import { useWeb3 } from '../contexts/Web3Context';

const Header: React.FC = () => {
  const { account, connectWallet, disconnectWallet, isConnected } = useWeb3();

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">CivicDAO</h1>
        </div>
        <div>
          {isConnected ? (
            <div className="flex items-center gap-4">
              <span className="text-sm">
                {account?.slice(0, 6)}...{account?.slice(-4)}
              </span>
              <button
                onClick={disconnectWallet}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 