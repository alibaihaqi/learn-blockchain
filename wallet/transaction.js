const ChainUtil = require('../chain-util');

class Transaction {
  constructor () {
    this.id = ChainUtil.id();
    this.input = null;
    this.outputs = [];
  }

  toString () {
    return `Transaction -
      ID      : ${this.id},
      Input   : ${this.input},
      Outputs : ${this.outputs.toString()},
    `
  }

  update(senderWallet, recipient, amount) {
    const senderOutput = this.outputs.find((output) => output.address === senderWallet.publicKey);

    if (amount > senderOutput.amount) {
      console.log(`Amount: ${amount} exceeds balance.`);
      return;
    }

    senderOutput.amount = senderOutput.amount - amount;
    this.outputs.push ({
      amount,
      address: recipient,
    });
    Transaction.signTransaction(this, senderWallet);

    return this;
  }

  static newTransaction (senderWallet, recipient, amount) {
    const transaction = new this();

    if (amount > senderWallet.balance) {
      console.log(`Amount: ${amount} exceeds balance.`);
      return;
    }

    transaction.outputs.push(...[
      {
        address: senderWallet.publicKey,
        amount: senderWallet.balance - amount,
      },
      {
        address: recipient,
        amount: amount,
      },
    ]);
    Transaction.signTransaction(transaction, senderWallet);

    return transaction;
  }

  static signTransaction (transaction, senderWallet) {
    transaction.input = {
      timestamp: Date.now(),
      amount: senderWallet.balance,
      address: senderWallet.publicKey,
      signature: senderWallet.sign(ChainUtil.hash(transaction.outputs))
    }
  }

  static verifyTransaction (transaction) {
    return ChainUtil.verifySignature(
      transaction.input.address,
      transaction.input.signature,
      ChainUtil.hash(transaction.outputs)
    )
  }
}

module.exports = Transaction;