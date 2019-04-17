class NegociacaoDao {

    constructor(connection) {
        this._connection = connection;
        this._store = 'negociacoes';
    }

    adiciona(negociacao) {
        return new Promise((resolve, reject) => {
            const request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore('negociacoes')
                .add(negociacao);

            request.onsuccess = e => {
                resolve();
            };

            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível adicionar a negocição!')
            };
        }
        )
    }
}