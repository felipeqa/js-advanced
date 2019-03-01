class NegociacaoController {

    constructor(){
        const $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        let self = this;

        this._listaNegociacoes = new Proxy(new ListaNegociacoes(),{
            get(target, property, receiver){
                if(['adiciona', 'esvazia'].includes(property) && typeof(target[property]) == typeof(Function)){
                    return function(){

                        console.log(`interceptado ${property}`);
                        
                        Reflect.apply(target[property], target, arguments);
                        self._negociacoesView.update(target);
                    }
                }
                return Reflect.get(target, property, receiver);
            }
        });

        // this._listaNegociacoes = new ListaNegociacoes(model => {
        //     this._negociacoesView.update(model);
        // }); 
        // Código antigo! Com armadilha
        
        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagemView.update(this._mensagem);
    }

    adiciona(event){
        event.preventDefault();

        this._listaNegociacoes.adiciona(this._criaNegociacao());

        this._mensagem.texto = 'Negociação adicianada com sucesso';
        this._mensagemView.update(this._mensagem)

        this._limpaFormulario();
    }

    apaga() {
        this._listaNegociacoes.esvazia();

        this._mensagem.texto = 'Negociações apagadas com sucesso';
        this._mensagemView.update(this._mensagem);
    }

    _criaNegociacao(){
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }
}
