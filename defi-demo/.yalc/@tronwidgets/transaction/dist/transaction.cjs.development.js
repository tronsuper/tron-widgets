'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function (method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

var Contract = function Contract() {
  var _this = this;
  this.feeLimitCommon = 150000000;
  this.errorMessage = function (msg) {
    var error = {
      success: false,
      msg: msg
    };
    return error;
  };
  this.getTronWeb = function (userTronweb) {
    if (userTronweb === void 0) {
      userTronweb = {};
    }
    return Object.keys(userTronweb).length > 0 ? userTronweb : window.tronWeb;
  };
  this.trigger = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(address, functionSelector, parameters, options, _temp) {
      var _ref2, _ref2$tronweb, tronweb, tronWeb, transaction;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (parameters === void 0) {
              parameters = [];
            }
            if (options === void 0) {
              options = {};
            }
            _ref2 = _temp === void 0 ? {} : _temp, _ref2$tronweb = _ref2.tronweb, tronweb = _ref2$tronweb === void 0 ? {} : _ref2$tronweb;
            _context.prev = 3;
            tronWeb = _this.getTronWeb(tronweb);
            if (tronWeb.defaultAddress) {
              _context.next = 7;
              break;
            }
            return _context.abrupt("return");
          case 7:
            _context.next = 9;
            return tronWeb.transactionBuilder.triggerSmartContract(address, functionSelector, Object.assign({
              feeLimit: _this.feeLimitCommon
            }, options), parameters);
          case 9:
            transaction = _context.sent;
            if (!(!transaction.result || !transaction.result.result)) {
              _context.next = 12;
              break;
            }
            throw new Error('Unknown trigger error: ' + JSON.stringify(transaction.transaction));
          case 12:
            return _context.abrupt("return", transaction);
          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](3);
            return _context.abrupt("return", _this.errorMessage("error: " + _context.t0));
          case 18:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[3, 15]]);
    }));
    return function (_x, _x2, _x3, _x4, _x5) {
      return _ref.apply(this, arguments);
    };
  }();
  this.sign = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(transaction, _temp2) {
      var _ref4, _ref4$tronweb, tronweb, tronWeb, signedTransaction;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _ref4 = _temp2 === void 0 ? {} : _temp2, _ref4$tronweb = _ref4.tronweb, tronweb = _ref4$tronweb === void 0 ? {} : _ref4$tronweb;
            _context2.prev = 1;
            tronWeb = _this.getTronWeb(tronweb);
            if (tronWeb.defaultAddress) {
              _context2.next = 5;
              break;
            }
            return _context2.abrupt("return");
          case 5:
            _context2.next = 7;
            return tronWeb.trx.sign(transaction);
          case 7:
            signedTransaction = _context2.sent;
            return _context2.abrupt("return", signedTransaction);
          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](1);
            return _context2.abrupt("return", _this.errorMessage("error: " + _context2.t0));
          case 14:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[1, 11]]);
    }));
    return function (_x6, _x7) {
      return _ref3.apply(this, arguments);
    };
  }();
  this.broadcast = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(signedTransaction, _temp3) {
      var _ref6, _ref6$tronweb, tronweb, tronWeb, result;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _ref6 = _temp3 === void 0 ? {} : _temp3, _ref6$tronweb = _ref6.tronweb, tronweb = _ref6$tronweb === void 0 ? {} : _ref6$tronweb;
            _context3.prev = 1;
            tronWeb = _this.getTronWeb(tronweb);
            if (tronWeb.defaultAddress) {
              _context3.next = 5;
              break;
            }
            return _context3.abrupt("return");
          case 5:
            _context3.next = 7;
            return tronWeb.trx.sendRawTransaction(signedTransaction);
          case 7:
            result = _context3.sent;
            return _context3.abrupt("return", result);
          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](1);
            return _context3.abrupt("return", _this.errorMessage("error: " + _context3.t0));
          case 14:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[1, 11]]);
    }));
    return function (_x8, _x9) {
      return _ref5.apply(this, arguments);
    };
  }();
  this.send = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(address, functionSelector, parameters, options, _temp4) {
      var _ref8, _ref8$callbacks, callbacks, _ref8$tronweb, tronweb, transaction, signedTransaction, result;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            if (parameters === void 0) {
              parameters = [];
            }
            if (options === void 0) {
              options = {};
            }
            _ref8 = _temp4 === void 0 ? {} : _temp4, _ref8$callbacks = _ref8.callbacks, callbacks = _ref8$callbacks === void 0 ? function () {} : _ref8$callbacks, _ref8$tronweb = _ref8.tronweb, tronweb = _ref8$tronweb === void 0 ? {} : _ref8$tronweb;
            _context4.prev = 3;
            _context4.next = 6;
            return _this.trigger(address, functionSelector, parameters, options, {
              tronweb: tronweb
            });
          case 6:
            transaction = _context4.sent;
            _context4.next = 9;
            return _this.sign(transaction == null ? void 0 : transaction.transaction, {
              tronweb: tronweb
            });
          case 9:
            signedTransaction = _context4.sent;
            _context4.next = 12;
            return _this.broadcast(signedTransaction, tronweb);
          case 12:
            result = _context4.sent;
            if (result != null && result.result) callbacks && callbacks();
            return _context4.abrupt("return", result);
          case 17:
            _context4.prev = 17;
            _context4.t0 = _context4["catch"](3);
            return _context4.abrupt("return", _this.errorMessage("error: " + _context4.t0));
          case 20:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[3, 17]]);
    }));
    return function (_x10, _x11, _x12, _x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }();
  this.call = /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(address, _functionSelector, _temp5) {
      var _ref10, _ref10$tronweb, tronweb, _ref10$abi, abi, tronWeb, contractInstance, result;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _ref10 = _temp5 === void 0 ? {} : _temp5, _ref10$tronweb = _ref10.tronweb, tronweb = _ref10$tronweb === void 0 ? {} : _ref10$tronweb, _ref10$abi = _ref10.abi, abi = _ref10$abi === void 0 ? [] : _ref10$abi;
            _context5.prev = 1;
            tronWeb = _this.getTronWeb(tronweb);
            if (tronWeb.defaultAddress) {
              _context5.next = 5;
              break;
            }
            return _context5.abrupt("return");
          case 5:
            if (!(abi.length > 0)) {
              _context5.next = 11;
              break;
            }
            _context5.next = 8;
            return tronWeb.contract(abi, address);
          case 8:
            contractInstance = _context5.sent;
            _context5.next = 14;
            break;
          case 11:
            _context5.next = 13;
            return tronWeb.contract().at(address);
          case 13:
            contractInstance = _context5.sent;
          case 14:
            _context5.next = 16;
            return contractInstance[_functionSelector].call().call();
          case 16:
            result = _context5.sent;
            return _context5.abrupt("return", {
              result: result
            });
          case 20:
            _context5.prev = 20;
            _context5.t0 = _context5["catch"](1);
            return _context5.abrupt("return", _this.errorMessage("error: " + _context5.t0));
          case 23:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[1, 20]]);
    }));
    return function (_x15, _x16, _x17) {
      return _ref9.apply(this, arguments);
    };
  }();
  this.view = /*#__PURE__*/function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(address, _functionSelector, parameters, _temp6) {
      var _ref12, _ref12$tronweb, tronweb, tronWeb, result;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            if (parameters === void 0) {
              parameters = [];
            }
            _ref12 = _temp6 === void 0 ? {} : _temp6, _ref12$tronweb = _ref12.tronweb, tronweb = _ref12$tronweb === void 0 ? {} : _ref12$tronweb;
            _context6.prev = 2;
            tronWeb = _this.getTronWeb(tronweb);
            if (tronWeb.defaultAddress) {
              _context6.next = 6;
              break;
            }
            return _context6.abrupt("return");
          case 6:
            _context6.next = 8;
            return tronWeb.transactionBuilder.triggerSmartContract(address, _functionSelector, {
              _isConstant: true
            }, parameters);
          case 8:
            result = _context6.sent;
            return _context6.abrupt("return", result && result.result ? result.constant_result : []);
          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6["catch"](2);
            _this.errorMessage("error: " + _context6.t0);
            return _context6.abrupt("return", []);
          case 16:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[2, 12]]);
    }));
    return function (_x18, _x19, _x20, _x21) {
      return _ref11.apply(this, arguments);
    };
  }();
  this.deploy = /*#__PURE__*/function () {
    var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(options, address, _temp7) {
      var _ref14, _ref14$callbacks, callbacks, _ref14$tronweb, tronweb, tronWeb, transaction, signedTransaction, result;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _ref14 = _temp7 === void 0 ? {} : _temp7, _ref14$callbacks = _ref14.callbacks, callbacks = _ref14$callbacks === void 0 ? function () {} : _ref14$callbacks, _ref14$tronweb = _ref14.tronweb, tronweb = _ref14$tronweb === void 0 ? {} : _ref14$tronweb;
            _context7.prev = 1;
            tronWeb = _this.getTronWeb(tronweb);
            if (tronWeb.defaultAddress) {
              _context7.next = 5;
              break;
            }
            return _context7.abrupt("return");
          case 5:
            _context7.next = 7;
            return tronWeb.transactionBuilder.createSmartContract(options, address);
          case 7:
            transaction = _context7.sent;
            _context7.next = 10;
            return _this.sign(transaction, tronWeb);
          case 10:
            signedTransaction = _context7.sent;
            _context7.next = 13;
            return _this.broadcast(signedTransaction, tronWeb);
          case 13:
            result = _context7.sent;
            if (result != null && result.result) callbacks && callbacks();
            return _context7.abrupt("return", result);
          case 18:
            _context7.prev = 18;
            _context7.t0 = _context7["catch"](1);
            return _context7.abrupt("return", _this.errorMessage("error: " + _context7.t0));
          case 21:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[1, 18]]);
    }));
    return function (_x22, _x23, _x24) {
      return _ref13.apply(this, arguments);
    };
  }();
  this.sendTrx = /*#__PURE__*/function () {
    var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(toAddress, amount, fromAddress, options, _temp8) {
      var _ref16, _ref16$callbacks, callbacks, _ref16$tronweb, tronweb, tronWeb, tradeObj, signedTransaction, result;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _ref16 = _temp8 === void 0 ? {} : _temp8, _ref16$callbacks = _ref16.callbacks, callbacks = _ref16$callbacks === void 0 ? function () {} : _ref16$callbacks, _ref16$tronweb = _ref16.tronweb, tronweb = _ref16$tronweb === void 0 ? {} : _ref16$tronweb;
            _context8.prev = 1;
            tronWeb = _this.getTronWeb(tronweb);
            if (tronWeb.defaultAddress) {
              _context8.next = 5;
              break;
            }
            return _context8.abrupt("return");
          case 5:
            _context8.next = 7;
            return tronWeb.transactionBuilder.sendTrx(toAddress, amount, fromAddress, options);
          case 7:
            tradeObj = _context8.sent;
            _context8.next = 10;
            return _this.sign(tradeObj, tronWeb);
          case 10:
            signedTransaction = _context8.sent;
            _context8.next = 13;
            return _this.broadcast(signedTransaction, tronWeb);
          case 13:
            result = _context8.sent;
            if (result != null && result.result) callbacks && callbacks();
            return _context8.abrupt("return", result);
          case 18:
            _context8.prev = 18;
            _context8.t0 = _context8["catch"](1);
            return _context8.abrupt("return", _this.errorMessage("error: " + _context8.t0));
          case 21:
          case "end":
            return _context8.stop();
        }
      }, _callee8, null, [[1, 18]]);
    }));
    return function (_x25, _x26, _x27, _x28, _x29) {
      return _ref15.apply(this, arguments);
    };
  }();
  this.sendToken = /*#__PURE__*/function () {
    var _ref17 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(address, amount, tokenID, privateKey, _temp9) {
      var _ref18, _ref18$callbacks, callbacks, _ref18$tronweb, tronweb, tronWeb, tradeObj, signedTransaction, result;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _ref18 = _temp9 === void 0 ? {} : _temp9, _ref18$callbacks = _ref18.callbacks, callbacks = _ref18$callbacks === void 0 ? function () {} : _ref18$callbacks, _ref18$tronweb = _ref18.tronweb, tronweb = _ref18$tronweb === void 0 ? {} : _ref18$tronweb;
            _context9.prev = 1;
            tronWeb = _this.getTronWeb(tronweb);
            if (tronWeb.defaultAddress) {
              _context9.next = 5;
              break;
            }
            return _context9.abrupt("return");
          case 5:
            _context9.next = 7;
            return tronWeb.transactionBuilder.sendToken(address, amount, tokenID, privateKey);
          case 7:
            tradeObj = _context9.sent;
            _context9.next = 10;
            return _this.sign(tradeObj != null && tradeObj.transaction ? tradeObj.transaction : tradeObj, tronWeb);
          case 10:
            signedTransaction = _context9.sent;
            _context9.next = 13;
            return _this.broadcast(signedTransaction, tronWeb);
          case 13:
            result = _context9.sent;
            if (result != null && result.result) callbacks && callbacks();
            return _context9.abrupt("return", result);
          case 18:
            _context9.prev = 18;
            _context9.t0 = _context9["catch"](1);
            return _context9.abrupt("return", _this.errorMessage("error: " + _context9.t0));
          case 21:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[1, 18]]);
    }));
    return function (_x30, _x31, _x32, _x33, _x34) {
      return _ref17.apply(this, arguments);
    };
  }();
};
var ContractInteract = /*#__PURE__*/new Contract();

exports.Contract = Contract;
exports.ContractInteract = ContractInteract;
//# sourceMappingURL=transaction.cjs.development.js.map
