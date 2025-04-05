// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TaipeiConnect is ERC20, Ownable {
    struct UserProfile {
        string name;
        uint256 reputation;
        uint256 joinDate;
    }

    mapping(address => UserProfile) public userProfiles;
    mapping(address => bool) public isRegistered;
    address[] public registeredUsers;

    event UserRegistered(address indexed user, string name);
    event ReputationUpdated(address indexed user, uint256 newReputation);
    event TokensRewarded(address indexed user, uint256 amount);

    constructor() ERC20("TaipeiConnect Token", "TPC") Ownable(msg.sender) {
        // Initial supply of 1,000,000 tokens
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function registerUser(string memory name) public {
        require(!isRegistered[msg.sender], "User already registered");
        require(bytes(name).length > 0, "Name cannot be empty");

        userProfiles[msg.sender] = UserProfile({
            name: name,
            reputation: 0,
            joinDate: block.timestamp
        });

        isRegistered[msg.sender] = true;
        registeredUsers.push(msg.sender);

        emit UserRegistered(msg.sender, name);
    }

    function updateReputation(address user, uint256 amount) public onlyOwner {
        require(isRegistered[user], "User not registered");
        userProfiles[user].reputation += amount;
        emit ReputationUpdated(user, userProfiles[user].reputation);
    }

    function rewardUser(address user, uint256 amount) public onlyOwner {
        require(isRegistered[user], "User not registered");
        _transfer(owner(), user, amount);
        emit TokensRewarded(user, amount);
    }

    function getUserProfile(address user) public view returns (UserProfile memory) {
        require(isRegistered[user], "User not registered");
        return userProfiles[user];
    }

    function getRegisteredUsersCount() public view returns (uint256) {
        return registeredUsers.length;
    }
} 