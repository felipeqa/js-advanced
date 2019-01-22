class ListaNegociacoes {

    constructor(){
        this._negociocoes = [];
    }

    adiciona(negociacao){
        this._negociocoes.push(negociacao);
    }

    get negociacoes(){
        return [].concat(this._negociocoes);
    }
}