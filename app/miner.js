class Miner {
  constructor (blockchain, transactionPool, wallet, p2pServer) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    this.p2pServer = p2pServer;
  }

  mine () {
    const validTransactions = this.transactionPool.validTransactions();

    // TODO - include a reward for the miner
    // TODO - create a block consisting of the valid transactions
    // TODO - synchronise the chains in the peer-to-peer server
    // TODO - clear the transaction pool
    // TODO - broadcast to every miner to clear their transaction pools
  }
};

module.exports = Miner;