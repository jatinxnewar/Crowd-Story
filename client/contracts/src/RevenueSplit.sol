// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/finance/PaymentSplitter.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title RevenueSplit
 * @dev Handles revenue distribution among story contributors
 */
contract RevenueSplit is PaymentSplitter, Ownable, ReentrancyGuard {
    mapping(address => uint256) private _totalReleased;
    mapping(address => mapping(address => uint256)) private _erc20Released;
    
    event RevenueRecorded(uint256 amount, address token, string source);
    event PaymentReleased(address to, uint256 amount);
    event ERC20PaymentReleased(address indexed token, address to, uint256 amount);
    
    constructor(
        address[] memory payees,
        uint256[] memory shares_
    ) PaymentSplitter(payees, shares_) Ownable(msg.sender) {}
    
    /**
     * @dev Records revenue from external sources
     */
    function recordRevenue(uint256 amount, address token, string calldata source) 
        external 
        payable 
        onlyOwner 
    {
        emit RevenueRecorded(amount, token, source);
    }
    
    /**
     * @dev Release owed amount of native token to a payee
     */
    function release(address payable account) public override nonReentrant {
        super.release(account);
        emit PaymentReleased(account, address(this).balance);
    }
    
    /**
     * @dev Release owed amount of ERC20 token to a payee
     */
    function release(IERC20 token, address account) public override nonReentrant {
        uint256 payment = releasable(token, account);
        super.release(token, account);
        emit ERC20PaymentReleased(address(token), account, payment);
    }
    
    /**
     * @dev Batch release payments to all payees
     */
    function releaseAll() external {
        for (uint256 i = 0; i < payeeCount(); i++) {
            address payee = payee(i);
            if (releasable(payee) > 0) {
                release(payable(payee));
            }
        }
    }
    
    /**
     * @dev Batch release ERC20 payments to all payees
     */
    function releaseAllERC20(IERC20 token) external {
        for (uint256 i = 0; i < payeeCount(); i++) {
            address payee = payee(i);
            if (releasable(token, payee) > 0) {
                release(token, payee);
            }
        }
    }
    
    /**
     * @dev Returns total amount released to a payee
     */
    function totalReleased(address account) public view returns (uint256) {
        return _totalReleased[account];
    }
    
    /**
     * @dev Returns total ERC20 amount released to a payee
     */
    function totalReleased(IERC20 token, address account) public view returns (uint256) {
        return _erc20Released[address(token)][account];
    }
    
    /**
     * @dev Receive function to accept direct payments
     */
    receive() external payable {
        emit RevenueRecorded(msg.value, address(0), "direct");
    }
}
