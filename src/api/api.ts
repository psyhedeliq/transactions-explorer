import axios from 'axios';
import { AddressDetails, TransactionDetails } from '../types/types';

const ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
const POLYGONSCAN_API_KEY = process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY;

const ETHERSCAN_API_URL = 'https://api.etherscan.io/api';
const POLYGONSCAN_API_URL = 'https://api.polygonscan.com/api';

export const getAddressDetails = async (
    address: string
): Promise<AddressDetails> => {
    const networks = ['ethereum', 'polygon'] as const;

    for (const network of networks) {
        const apiUrl =
            network === 'ethereum' ? ETHERSCAN_API_URL : POLYGONSCAN_API_URL;
        const apiKey =
            network === 'ethereum' ? ETHERSCAN_API_KEY : POLYGONSCAN_API_KEY;

        try {
            const response = await axios.get(apiUrl, {
                params: {
                    module: 'account',
                    action: 'balance',
                    address,
                    tag: 'latest',
                    apikey: apiKey,
                },
            });

            if (response.data.status === '1' && response.data.result !== '0') {
                return {
                    balance: Number(response.data.result) / 1e18,
                    network: network,
                };
            }
        } catch (error) {
            console.error(`Error fetching balance for ${network}:`, error);
        }
    }

    throw new Error('Unable to fetch balance from either network');
};

export const getTransactions = async (
    address: string
): Promise<TransactionDetails[]> => {
    const networks = ['ethereum', 'polygon'];
    let transactions: TransactionDetails[] = [];

    for (const network of networks) {
        const apiUrl =
            network === 'ethereum' ? ETHERSCAN_API_URL : POLYGONSCAN_API_URL;
        const apiKey =
            network === 'ethereum' ? ETHERSCAN_API_KEY : POLYGONSCAN_API_KEY;

        try {
            const response = await axios.get(apiUrl, {
                params: {
                    module: 'account',
                    action: 'txlist',
                    address: address,
                    startblock: 0,
                    endblock: 99999999,
                    page: 1,
                    offset: 100,
                    sort: 'desc',
                    apikey: apiKey,
                },
            });

            if (response.data.status === '1') {
                const networkTransactions = response.data.result.map(
                    (tx: any) => ({
                        hash: tx.hash,
                        from: tx.from,
                        to: tx.to,
                        value: (parseInt(tx.value) / 1e18).toString(),
                        timeStamp:
                            network === 'ethereum'
                                ? tx.timeStamp
                                : (parseInt(tx.timeStamp) * 1000).toString(),
                        network: network,
                    })
                );
                transactions = [...transactions, ...networkTransactions];
            }
        } catch (error) {
            console.error(`Error fetching transactions for ${network}:`, error);
        }
    }

    return transactions
        .sort((a, b) => parseInt(b.timeStamp) - parseInt(a.timeStamp))
        .slice(0, 100);
};

export const getTransactionDetails = async (
    txHash: string,
    network: 'ethereum' | 'polygon'
): Promise<TransactionDetails> => {
    const apiUrl =
        network === 'ethereum' ? ETHERSCAN_API_URL : POLYGONSCAN_API_URL;
    const apiKey =
        network === 'ethereum' ? ETHERSCAN_API_KEY : POLYGONSCAN_API_KEY;

    console.log('Fetching transaction details for:', txHash);
    console.log('API URL:', apiUrl);
    console.log('Network:', network);

    try {
        let txData;
        let receiptData;

        if (network === 'ethereum') {
            const response = await axios.get(apiUrl, {
                params: {
                    module: 'proxy',
                    action: 'eth_getTransactionByHash',
                    txhash: txHash,
                    apikey: apiKey,
                },
            });
            txData = response.data.result;

            if (txData && txData.blockNumber) {
                const receiptResponse = await axios.get(apiUrl, {
                    params: {
                        module: 'proxy',
                        action: 'eth_getTransactionReceipt',
                        txhash: txHash,
                        apikey: apiKey,
                    },
                });
                receiptData = receiptResponse.data.result;
            }
        } else {
            const response = await axios.get(apiUrl, {
                params: {
                    module: 'proxy',
                    action: 'eth_getTransactionByHash',
                    txhash: txHash,
                    apikey: apiKey,
                },
            });
            txData = response.data.result;

            if (txData && txData.blockNumber) {
                const receiptResponse = await axios.get(apiUrl, {
                    params: {
                        module: 'proxy',
                        action: 'eth_getTransactionReceipt',
                        txhash: txHash,
                        apikey: apiKey,
                    },
                });
                receiptData = receiptResponse.data.result;
            }
        }

        console.log('API Response:', txData);

        if (!txData) {
            throw new Error('Transaction not found');
        }

        let blockTimestamp = '0';
        if (txData.blockNumber) {
            blockTimestamp = await getBlockTimestamp(
                txData.blockNumber,
                apiUrl,
                apiKey!
            );
        }

        console.log('Block Timestamp:', blockTimestamp);

        return {
            hash: txData.hash,
            blockHash: txData.blockHash || '',
            blockNumber: txData.blockNumber
                ? parseInt(txData.blockNumber, 16).toString()
                : 'Pending',
            from: txData.from,
            to: txData.to,
            value: txData.value || '0',
            gasPrice: txData.gasPrice,
            gas: txData.gas,
            input: txData.input,
            nonce: parseInt(txData.nonce, 16).toString(),
            transactionIndex: txData.transactionIndex
                ? parseInt(txData.transactionIndex, 16).toString()
                : 'Pending',
            status: receiptData
                ? receiptData.status === '0x1'
                    ? 'Success'
                    : 'Failed'
                : 'Pending',
            timeStamp: blockTimestamp,
            gasUsed: receiptData
                ? parseInt(receiptData.gasUsed, 16).toString()
                : '0',
            network: network,
        };
    } catch (error) {
        console.error('Error fetching transaction details:', error);
        throw error;
    }
};

// Function to fetch the block timestamp
const getBlockTimestamp = async (
    blockNumber: string,
    apiUrl: string,
    apiKey: string
): Promise<string> => {
    const response = await axios.get(apiUrl, {
        params: {
            module: 'proxy',
            action: 'eth_getBlockByNumber',
            tag: blockNumber,
            boolean: 'false',
            apikey: apiKey,
        },
    });

    const blockData = response.data.result;
    return blockData ? parseInt(blockData.timestamp, 16).toString() : '0';
};
