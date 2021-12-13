import StellarSdk from 'stellar-sdk';
// import fetch from "node-fetch";

export const createAccount = () => {
  const keyPair = StellarSdk.Keypair.random();
  const publicKey = keyPair.publicKey();
  const secretKey = keyPair.secret();
  console.log(publicKey);
  return {publicKey, secretKey};
}

export const activateAccount = async publicKey => {
  const response = await fetch(
    `https://friendbot.stellar.org?addr=${encodeURIComponent(publicKey)}`
  )
  const responseJSON = await response.json()
  console.log(response);
  console.log(responseJSON);
  return responseJSON;
}