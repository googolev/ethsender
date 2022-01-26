type NetworkName = 'mainnet' | 'ropsten' | 'rinkeby' | 'kovan';

export interface Network {
    id: number;
    name?: NetworkName;
}

export interface CurrentNetwork extends Network {
    isCorrectNetwork: boolean;
    gasPrice?: string;
    humanizedGasPrice?: string;
}

export interface Transaction {
    from: string | undefined;
    to: string | undefined;
    value: string | undefined;
    hash?: string;
    txProcessing?: boolean;
}

export type Unit = 'noether' | 'wei' | 'kwei' | 'Kwei' | 'babbage' | 'femtoether' |'mwei' | 'Mwei' | 'lovelace' | 'picoether' | 'gwei' | 'Gwei' | 'ether';
