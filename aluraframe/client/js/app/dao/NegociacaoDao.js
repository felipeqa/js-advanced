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
    };

    listaTodos() {
        return new Promise((resolve, reject) => {
            const cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();

            let negociacoes = [];

            cursor.onsuccess = e => {
                const atual = e.target.result;

                if (atual) {
                    let dado = atual.value;

                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));

                    atual.continue();

                } else {
                    resolve(negociacoes);

                };
            };

            cursor.onerror = e => {
                console.log(e.target.error.name);
                reject("Não foi possível obter todas as negociações");
            }

        });
    };
}