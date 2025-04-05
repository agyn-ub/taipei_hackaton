import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import { getContract } from '../utils/contract';
import { UserProfile as UserProfileType } from '../types/contracts';
import { formatUnits } from 'ethers';

interface UserProfileProps {
  contractAddress: string;
  contractAbi: any;
}

const UserProfile: React.FC<UserProfileProps> = ({ contractAddress, contractAbi }) => {
  const { account, isConnected } = useWeb3();
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (!account || !isConnected) return;

      try {
        setIsLoading(true);
        setError(null);
        const contract = await getContract(contractAddress, contractAbi);
        const userProfile = await contract.getUserProfile(account);
        setProfile(userProfile);
      } catch (err) {
        setError('Failed to load profile');
        console.error('Error loading profile:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [account, isConnected, contractAddress, contractAbi]);

  if (!isConnected) {
    return (
      <div className="bg-gray-100 p-6 rounded-lg">
        <p className="text-center text-gray-600">Please connect your wallet to view your profile</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-gray-100 p-6 rounded-lg">
        <p className="text-center text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 p-6 rounded-lg">
        <p className="text-center text-red-600">{error}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-yellow-100 p-6 rounded-lg">
        <p className="text-center text-yellow-600">No profile found. Please register first.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="space-y-4">
        <div>
          <label className="text-gray-600">Name</label>
          <p className="text-xl">{profile.name}</p>
        </div>
        <div>
          <label className="text-gray-600">Reputation</label>
          <p className="text-xl">{formatUnits(profile.reputation, 0)}</p>
        </div>
        <div>
          <label className="text-gray-600">Join Date</label>
          <p className="text-xl">
            {new Date(Number(profile.joinDate) * 1000).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 