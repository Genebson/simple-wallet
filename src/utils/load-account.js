import * as StellarSdk from 'stellar-sdk';

const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

export const loadAccount = async publicKey => {
  const account = await server.loadAccount(publicKey)
  return account;
}