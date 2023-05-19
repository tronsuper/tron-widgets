'use strict';

interface ResultType {
  msg: string;
  success: boolean;
}

export class Contract {
  public feeLimitCommon: number = 150000000;

  private errorMessage = (msg: string) => {
    const error: ResultType = { success: false, msg };
    return error;
  };

  private getTronWeb = (userTronweb = {}) => {
    return Object.keys(userTronweb).length > 0
      ? userTronweb
      : (window as any).tronWeb;
  };

  trigger = async (
    address: any,
    functionSelector: any,
    parameters = [],
    options = {},
    { tronweb = {} } = {}
  ) => {
    try {
      const tronWeb = this.getTronWeb(tronweb);
      if (!tronWeb.defaultAddress) return;
      const transaction = await tronWeb.transactionBuilder.triggerSmartContract(
        address,
        functionSelector,
        Object.assign({ feeLimit: this.feeLimitCommon }, options),
        parameters
      );

      if (!transaction.result || !transaction.result.result) {
        throw new Error(
          'Unknown trigger error: ' + JSON.stringify(transaction.transaction)
        );
      }
      return transaction;
    } catch (error) {
      return this.errorMessage(`error: ${error}`);
    }
  };

  sign = async (transaction: any, { tronweb = {} } = {}) => {
    try {
      const tronWeb = this.getTronWeb(tronweb);
      if (!tronWeb.defaultAddress) return;
      const signedTransaction = await tronWeb.trx.sign(transaction);
      return signedTransaction;
    } catch (error) {
      return this.errorMessage(`error: ${error}`);
    }
  };

  broadcast = async (signedTransaction: any, { tronweb = {} } = {}) => {
    try {
      const tronWeb = this.getTronWeb(tronweb);
      if (!tronWeb.defaultAddress) return;
      const result = await tronWeb.trx.sendRawTransaction(signedTransaction);
      return result;
    } catch (error) {
      return this.errorMessage(`error: ${error}`);
    }
  };

  send = async (
    address: any,
    functionSelector: any,
    parameters = [],
    options = {},
    { callbacks = () => {}, tronweb = {} } = {}
  ) => {
    try {
      const transaction = await this.trigger(address, functionSelector, parameters, options, {
        tronweb,
      });

      const signedTransaction = await this.sign(transaction?.transaction, {
        tronweb,
      });
      const result = await this.broadcast(signedTransaction, tronweb);

      if (result?.result) callbacks && callbacks();

      return result;
    } catch (error) {
      return this.errorMessage(`error: ${error}`);
    }
  };

  call = async (
    address: string,
    _functionSelector: any,
    { tronweb = {}, abi = [] } = {}
  ) => {
    try {
      const tronWeb = this.getTronWeb(tronweb);
      if (!tronWeb.defaultAddress) return;
      let contractInstance;
      if (abi.length > 0) {
        contractInstance = await tronWeb.contract(abi, address);
      } else {
        contractInstance = await tronWeb.contract().at(address);
      }
      const result = await contractInstance[_functionSelector].call().call();

      return { result };
    } catch (error) {
      return this.errorMessage(`error: ${error}`);
    }
  };

  view = async (
    address: string,
    _functionSelector: any,
    parameters = [],
    { tronweb = {} } = {}
  ) => {
    try {
      const tronWeb = this.getTronWeb(tronweb);
      if (!tronWeb.defaultAddress) return;
      const result = await tronWeb.transactionBuilder.triggerSmartContract(
        address,
        _functionSelector,
        { _isConstant: true },
        parameters
      );
      return result && result.result ? result.constant_result : [];
    } catch (error) {
      this.errorMessage(`error: ${error}`);
      return [];
    }
  };

  deploy = async (
    options: any,
    address: string,
    { callbacks = () => {}, tronweb = {} } = {}
  ) => {
    try {
      const tronWeb = this.getTronWeb(tronweb);
      if (!tronWeb.defaultAddress) return;
      const transaction = await tronWeb.transactionBuilder.createSmartContract(
        options,
        address
      );
      const signedTransaction = await this.sign(transaction, tronWeb);
      const result = await this.broadcast(signedTransaction, tronWeb);

      if (result?.result) callbacks && callbacks();
      return result;
    } catch (error) {
      return this.errorMessage(`error: ${error}`);
    }
  };

  sendTrx = async (
    toAddress: string,
    amount: string | number,
    fromAddress: string,
    options: any,
    { callbacks = () => {}, tronweb = {} } = {}
  ) => {
    try {
      const tronWeb = this.getTronWeb(tronweb);
      if (!tronWeb.defaultAddress) return;
      const tradeObj = await tronWeb.transactionBuilder.sendTrx(
        toAddress,
        amount,
        fromAddress,
        options
      );
      const signedTransaction = await this.sign(tradeObj, tronWeb);
      const result = await this.broadcast(signedTransaction, tronWeb);

      if (result?.result) callbacks && callbacks();
      return result;
    } catch (error) {
      return this.errorMessage(`error: ${error}`);
    }
  };

  sendToken = async (
    address: string,
    amount: string | number,
    tokenID: string | number,
    privateKey: string,
    { callbacks = () => {}, tronweb = {} } = {}
  ) => {
    try {
      const tronWeb = this.getTronWeb(tronweb);
      if (!tronWeb.defaultAddress) return;
      const tradeObj = await tronWeb.transactionBuilder.sendToken(
        address,
        amount,
        tokenID,
        privateKey
      );

      const signedTransaction = await this.sign(
        tradeObj?.transaction ? tradeObj.transaction : tradeObj,
        tronWeb
      );
      const result = await this.broadcast(signedTransaction, tronWeb);

      if (result?.result) callbacks && callbacks();
      return result;
    } catch (error) {
      return this.errorMessage(`error: ${error}`);
    }
  };
}

export const ContractInteract = new Contract();
