interface ResultType {
    msg: string;
    success: boolean;
}
export declare class Contract {
    feeLimitCommon: number;
    private errorMessage;
    private getTronWeb;
    trigger: (address: any, functionSelector: any, parameters?: never[], options?: {}, { tronweb }?: {
        tronweb?: {} | undefined;
    }) => Promise<any>;
    sign: (transaction: any, { tronweb }?: {
        tronweb?: {} | undefined;
    }) => Promise<any>;
    broadcast: (signedTransaction: any, { tronweb }?: {
        tronweb?: {} | undefined;
    }) => Promise<any>;
    send: (address: any, functionSelector: any, parameters?: never[], options?: {}, { callbacks, tronweb }?: {
        callbacks?: (() => void) | undefined;
        tronweb?: {} | undefined;
    }) => Promise<any>;
    call: (address: string, _functionSelector: any, { tronweb, abi }?: {
        tronweb?: {} | undefined;
        abi?: never[] | undefined;
    }) => Promise<ResultType | {
        result: any;
    } | undefined>;
    view: (address: string, _functionSelector: any, parameters?: never[], { tronweb }?: {
        tronweb?: {} | undefined;
    }) => Promise<any>;
    deploy: (options: any, address: string, { callbacks, tronweb }?: {
        callbacks?: (() => void) | undefined;
        tronweb?: {} | undefined;
    }) => Promise<any>;
    sendTrx: (toAddress: string, amount: string | number, fromAddress: string, options: any, { callbacks, tronweb }?: {
        callbacks?: (() => void) | undefined;
        tronweb?: {} | undefined;
    }) => Promise<any>;
    sendToken: (address: string, amount: string | number, tokenID: string | number, privateKey: string, { callbacks, tronweb }?: {
        callbacks?: (() => void) | undefined;
        tronweb?: {} | undefined;
    }) => Promise<any>;
}
export declare const ContractInteract: Contract;
export {};
