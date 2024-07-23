export interface AddressDetails {
    balance: number;
    network: 'ethereum' | 'polygon' | 'unknown';
}

export interface BaseTransaction {
    hash: string;
    timeStamp: string;
    value: string;
    from: string;
    to: string;
    network: 'ethereum' | 'polygon';
}

export interface Transaction extends BaseTransaction {}

export interface TransactionDetails extends BaseTransaction {
    blockHash: string;
    blockNumber: string;
    gas: string;
    gasPrice: string;
    input: string;
    nonce: string;
    transactionIndex: string;
    status: string;
    gasUsed: string;
}

export interface Theme {
    colors: {
        primary: string;
        secondary: string;
        background: string;
        text: string;
    };
    fontSizes: {
        small: string;
        medium: string;
        large: string;
    };
}
