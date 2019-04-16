//MODULE PATTERN => Horrivel isso

const ConnectionFactory = (function () {

    const stores = ['negociacoes'];
    const version = 4;
    const dbName = 'aluraframe'

    let connection = null;
    let close = null;
    return class ConnectionFactory {

        constructor() {
            throw new Error('Não é possível criar instãncias de ConnectionFactory');
        };

        static getConnectionFactory() {
            return new Promise((resolve, reject) => {

                let openRequest = window.indexedDB.open(dbName, version);

                openRequest.onupgradeneeded = e => {

                    ConnectionFactory._createStores(e.target.result);

                };

                openRequest.onsuccess = e => {

                    if(!connection) {
                        connection = e.target.result;
                        close = connection.close.bind(connection);
                        //Monkey Patch
                        connection.close = function() {
                            throw new Error('Voce não pode fechar a conexão diretamente!');
                        };
                    };
                    resolve(connection);
                };

                openRequest.onerror = e => {
                    console.log(e.target.error);

                    reject(e.target.error.name);
                };

            });
        };

        static _createStores(connection) {
            stores.forEach(store => {
                if (connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);

                connection.createObjectStore(store, { autoIncrement: true });
            });
        }

        static closeConnection() {
            close();
            connection = null;
        };

    }
})();