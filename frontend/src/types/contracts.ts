import { Contract, ContractTransactionResponse, BigNumberish } from 'ethers';

export interface UserProfile {
  name: string;
  reputation: BigNumberish;
  joinDate: BigNumberish;
}

export interface CivicDAO extends Contract {
  registerUser(name: string): Promise<ContractTransactionResponse>;
  updateReputation(user: string, amount: BigNumberish): Promise<ContractTransactionResponse>;
  rewardUser(user: string, amount: BigNumberish): Promise<ContractTransactionResponse>;
  getUserProfile(user: string): Promise<UserProfile>;
  getRegisteredUsersCount(): Promise<BigNumberish>;
} 