const SHA256 = require('crypto-js/sha256')

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp=timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash='';
    }

    calculateHash(){
return SHA256(this.index +this.previousHash+this.timestamp+ JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2018","GenesisBlock", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.lenght; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

let osodracCoin = new Blockchain();
osodracCoin.addBlock(new Block(1,"30/01/2018", {amount:4}));
osodracCoin.addBlock(new Block(1,"25/04/2018", {amount:10}));

console.log('Is the BlockChain Valid?'+ osodracCoin.isChainValid());