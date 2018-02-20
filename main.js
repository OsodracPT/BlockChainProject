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

            if (previousBlock.index + 1 !== newBlock.index) {
                console.log('invalid index');
                return false;
            } else if (previousBlock.hash !== newBlock.previousHash) {
                console.log('invalid previoushash');
                return false;
            } else if (calculateHashForBlock(newBlock) !== newBlock.hash) {
                console.log('invalid hash: ' + calculateHashForBlock(newBlock) + ' ' + newBlock.hash);
                return false;
            }
        }
        return true;
    }
    
}

let osodracCoin = new Blockchain();
osodracCoin.addBlock(new Block(1,"30/01/2018", {amount:4}));
osodracCoin.addBlock(new Block(2,"25/04/2018", {amount:10}));

console.log('Is the BlockChain Valid?'+ osodracCoin.isChainValid());

osodracCoin.chain[1].data = { amount: 100 };
osodracCoin.chain[1].hash = osodracCoin.chain[1].calculateHash();
console.log('Is the BlockChain Valid?'+ osodracCoin.isChainValid());
