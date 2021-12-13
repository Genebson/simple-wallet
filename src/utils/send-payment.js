import * as StellarSdk from 'stellar-sdk';

const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

export const sendPayment = async (secret, destinationId, amount) => {
  try {
    const sourceKeys = StellarSdk.Keypair.fromSecret(secret);
    await server.loadAccount(destinationId)
    .catch((error) => {
      if (error instanceOf StellarSdk.NotFoundError) {
        throw new Error(`Oops, the account doesn't exists`)
      } else {
        return Error
      }
    })
    .then() => {
      const sourceAccount = await server.loadAccount(sourceKeys.publicKey());
      return sourceAccount
    }

    const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: StellarSdk.Networks.TESTNET
    })
      .addOperation(
        StellarSdk.Operation.payment({
          destination: destinationId,
          asset: StellarSdk.Asset.native(),
          amount: "1000",
        })
      )
      .setTimeout(180)
      .build();
      transaction.sign(sourceKeys)

      const result = await server.submitTransaction(transaction);
      return result;
  } catch (error) {
    console.log('Oops, something went wrong!', error)
  }
}