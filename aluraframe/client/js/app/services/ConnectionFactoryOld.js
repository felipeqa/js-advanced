'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, ConnectionFactory;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            ConnectionFactory = function () {

                var stores = ['negociacoes'];
                var version = 4;
                var dbName = 'aluraframe';

                var connection = null;
                var close = null;
                return function () {
                    function ConnectionFactory() {
                        _classCallCheck(this, ConnectionFactory);

                        throw new Error('Não é possível criar instãncias de ConnectionFactory');
                    }

                    _createClass(ConnectionFactory, null, [{
                        key: 'getConnectionFactory',
                        value: function getConnectionFactory() {
                            return new Promise(function (resolve, reject) {

                                var openRequest = window.indexedDB.open(dbName, version);

                                openRequest.onupgradeneeded = function (e) {

                                    ConnectionFactory._createStores(e.target.result);
                                };

                                openRequest.onsuccess = function (e) {

                                    if (!connection) {
                                        connection = e.target.result;
                                        close = connection.close.bind(connection);
                                        //Monkey Patch
                                        connection.close = function () {
                                            throw new Error('Voce não pode fechar a conexão diretamente!');
                                        };
                                    };
                                    resolve(connection);
                                };

                                openRequest.onerror = function (e) {
                                    console.log(e.target.error);

                                    reject(e.target.error.name);
                                };
                            });
                        }
                    }, {
                        key: '_createStores',
                        value: function _createStores(connection) {
                            stores.forEach(function (store) {
                                if (connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);

                                connection.createObjectStore(store, { autoIncrement: true });
                            });
                        }
                    }, {
                        key: 'closeConnection',
                        value: function closeConnection() {
                            close();
                            connection = null;
                        }
                    }]);

                    return ConnectionFactory;
                }();
            }();
        }
    };
});
//# sourceMappingURL=ConnectionFactoryOld.js.map