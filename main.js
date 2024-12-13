const crypto = require("crypto");

//const hash = crypto.createHash("sha256");

class Block {
  constructor(index, timeStamp, data, previousHash = " ") {
    this.index = index;
    this.timeStamp = timeStamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }
  calculateHash() {
    return crypto
      .createHash("sha256")
      .update(
        this.index +
          this.timeStamp +
          this.previousHash +
          JSON.stringify(this.data)
      )
      .digest("hex");
  }
}

class BlockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, "01/01/2024", "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
}

let newCoin = new BlockChain();
newCoin.addBlock(new Block(1, "02/01/2024", { amount: 4 }));
newCoin.addBlock(new Block(2, "03/01/2024", { amount: 8 }));

console.log(JSON.stringify(newCoin, null, 4));
