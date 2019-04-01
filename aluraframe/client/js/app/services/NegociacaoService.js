class NegociacaoService {

    /*
        Configurações
        
        0: requisão não iniciada
        1: conexão com o servidor estabelecida
        2: requisição recebida
        3: processando requisição
        4: requisição concluida
    */

    constructor() {
        this._http = new HttpService();
    }

    obterNegociacoesDaSemana() {

        return new Promise((resolve, reject) => {
            this._http
            .get('negociacoes/semana')
            .then(negociacoes => {
                resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
            })
            .catch(erro => {
                console.log(erro);
                reject('Não foi possível obter as negociações da semana');
            })
        });

        // VERSÃO ANTIGA
        // return new Promise((resolve, reject) => {
        //     let xhr = new XMLHttpRequest();
        //     xhr.open('GET', 'negociacoes/semana');
        //     xhr.onreadystatechange = () => {

        //         if (xhr.readyState == 4) {

        //             if (xhr.status == 200) {

        //                 resolve(JSON.parse(xhr.responseText)
        //                     .map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)));

        //             } else {
        //                 console.log(xhr.responseText);
        //                 reject('Não foi possível obter negociações da semana');
        //             }
        //         }

        //     };
        //     xhr.send();
        // });
    };

    obterNegociacoesDaSemanaAnterior() {

        return new Promise((resolve, reject) => {
            this._http
            .get('negociacoes/anterior')
            .then(negociacoes => {
                resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
            })
            .catch(erro => {
                console.log(erro);
                reject('Não foi possível obter as negociações da semana');
            })
        });
    };

    obterNegociacoesDaSemanaRetrasada() {

        return new Promise((resolve, reject) => {
            this._http
            .get('negociacoes/retrasada')
            .then(negociacoes => {
                resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
            })
            .catch(erro => {
                console.log(erro);
                reject('Não foi possível obter as negociações da semana');
            })
        });
    };
}