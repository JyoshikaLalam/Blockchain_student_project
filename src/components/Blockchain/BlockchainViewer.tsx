import React, { useState, useEffect } from 'react';
import { Shield, Hash, Clock, Database, ChevronDown, ChevronRight } from 'lucide-react';
import { blockchain } from '../../utils/blockchain';
import { BlockchainBlock } from '../../types';

const BlockchainViewer: React.FC = () => {
  const [blocks, setBlocks] = useState<BlockchainBlock[]>([]);
  const [expandedBlocks, setExpandedBlocks] = useState<Set<number>>(new Set());

  useEffect(() => {
    setBlocks(blockchain.getChain());
  }, []);

  const toggleBlockExpansion = (index: number) => {
    const newExpanded = new Set(expandedBlocks);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedBlocks(newExpanded);
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatHash = (hash: string, length: number = 16) => {
    return hash.length > length ? `${hash.substring(0, length)}...` : hash;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Blockchain Explorer</h1>
        <p className="text-gray-600">View the complete blockchain with all student records</p>
      </div>

      {/* Blockchain Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <Database className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900">Total Blocks</h3>
          <p className="text-2xl font-bold text-blue-600">{blocks.length}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900">Chain Status</h3>
          <p className={`text-2xl font-bold ${blockchain.isChainValid() ? 'text-green-600' : 'text-red-600'}`}>
            {blockchain.isChainValid() ? 'Valid' : 'Invalid'}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900">Last Block</h3>
          <p className="text-sm text-gray-600">
            {blocks.length > 0 ? formatTimestamp(blocks[blocks.length - 1].timestamp) : 'N/A'}
          </p>
        </div>
      </div>

      {/* Blockchain Visualization */}
      <div className="space-y-4">
        {blocks.map((block, index) => (
          <div key={block.index} className="relative">
            {/* Connection Line */}
            {index > 0 && (
              <div className="absolute left-8 -top-4 w-0.5 h-4 bg-blue-300"></div>
            )}
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border-l-4 border-blue-500">
              <div 
                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleBlockExpansion(block.index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="font-bold text-blue-600">#{block.index}</span>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {block.index === 0 ? 'Genesis Block' : `Block ${block.index}`}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {formatTimestamp(block.timestamp)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Hash className="w-4 h-4" />
                        <span>{formatHash(block.hash)}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Nonce: {block.nonce}
                      </div>
                    </div>
                    
                    {expandedBlocks.has(block.index) ? (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>
              
              {/* Expanded Block Details */}
              {expandedBlocks.has(block.index) && (
                <div className="border-t border-gray-100 p-4 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Block Information</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Index:</span>
                          <span className="font-mono">{block.index}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Timestamp:</span>
                          <span className="font-mono">{block.timestamp}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Nonce:</span>
                          <span className="font-mono">{block.nonce}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Hash Information</h4>
                      <div className="space-y-1 text-sm">
                        <div>
                          <span className="text-gray-600">Hash:</span>
                          <p className="font-mono text-xs break-all mt-1 bg-white p-2 rounded">
                            {block.hash}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">Previous Hash:</span>
                          <p className="font-mono text-xs break-all mt-1 bg-white p-2 rounded">
                            {block.previousHash}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-700 mb-2">Block Data</h4>
                    <div className="bg-white p-3 rounded-lg border">
                      <pre className="text-xs overflow-x-auto">
                        {typeof block.data === 'string' 
                          ? block.data 
                          : JSON.stringify(block.data, null, 2)
                        }
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Chain Validation */}
      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Chain Integrity</h3>
            <p className="text-sm text-gray-600">
              The blockchain is continuously validated to ensure data integrity
            </p>
          </div>
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
            blockchain.isChainValid() 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            <Shield className="w-4 h-4" />
            <span className="font-medium">
              {blockchain.isChainValid() ? 'Chain Valid' : 'Chain Invalid'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainViewer;