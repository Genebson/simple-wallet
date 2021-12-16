import * as StellarSdk from 'stellar-sdk';

const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

export const sendPayment = async (secret, destinationId, amount) => {
  try {
    const sourceKeys = StellarSdk.Keypair.fromSecret(secret);
    await server.loadAccount(destinationId)

    const sourceAccount = await server.loadAccount(sourceKeys.publicKey());

    const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: StellarSdk.Networks.TESTNET
    })
      .addOperation(
        StellarSdk.Operation.payment({
          destination: destinationId,
          asset: StellarSdk.Asset.native(),
          amount
        })
      )
      .setTimeout(180)
      .build();
      transaction.sign(sourceKeys)
      console.log(transaction.toXDR())
      const result = await server.submitTransaction(transaction);
      return result;
  } catch (error) {
    console.log('Oops, something went wrong!', error)
  }
}