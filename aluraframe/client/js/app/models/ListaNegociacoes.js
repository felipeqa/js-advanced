class ListaNegociacoes {

    constructor(armadilha){
        this._negociocoes = [];
        this._armadilha = armadilha;
    }

    adiciona(negociacao){
        this._negociocoes.push(negociacao);
        this._armadilha(this);
    }

    get negociacoes(){
        return [].concat(this._negociocoes);
    }

    esvazia() {
        this._negociocoes = [];
        this._armadilha(this);
    }
}