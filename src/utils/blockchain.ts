import { BlockchainBlock } from '../types';

export class BlockchainSimulator {
  private chain: BlockchainBlock[] = [];
  private difficulty = 4;

  constructor() {
    this.createGenesisBlock();
  }

  private createGenesisBlock(): void {
    const genesisBlock: BlockchainBlock = {
      index: 0,
      timestamp: Date.now(),
      data: 'Genesis Block - BlockchainEdu System Initialized',
      previousHash: '0',
      hash: '',
      nonce: 0
    };
    genesisBlock.hash = this.calculateHash(genesisBlock);
    this.chain.push(genesisBlock);
  }

  private calculateHash(block: BlockchainBlock): string {
    // Browser-compatible hash calculation using Web Crypto API
    const data = block.index +
                 block.previousHash +
                 block.timestamp +
                 JSON.stringify(block.data) +
                 block.nonce;
    
    // Simple hash function for demo (in production, use Web Crypto API)
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16).padStart(16, '0');
  }

  private mineBlock(block: BlockchainBlock): void {
    const target = Array(this.difficulty + 1).join('0');
    
    while (!block.hash.startsWith(target)) {
      block.nonce++;
      block.hash = this.calculateHash(block);
    }
    
    console.log(`Block mined: ${block.hash}`);
  }

  public addBlock(data: any): BlockchainBlock {
    const previousBlock = this.getLatestBlock();
    const newBlock: BlockchainBlock = {
      index: previousBlock.index + 1,
      timestamp: Date.now(),
      data,
      previousHash: previousBlock.hash,
      hash: '',
      nonce: 0
    };

    this.mineBlock(newBlock);
    this.chain.push(newBlock);
    return newBlock;
  }

  public getLatestBlock(): BlockchainBlock {
    return this.chain[this.chain.length - 1];
  }

  public getChain(): BlockchainBlock[] {
    return [...this.chain];
  }

  public isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== this.calculateHash(currentBlock)) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }

  public verifyRecord(blockHash: string): boolean {
    return this.chain.some(block => block.hash === blockHash);
  }

  public getBlockByHash(hash: string): BlockchainBlock | null {
    return this.chain.find(block => block.hash === hash) || null;
  }
}

export const blockchain = new BlockchainSimulator();