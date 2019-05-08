class NegociacaoController {

    constructor() {
        this._ordemAtual = '';

        const $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

        this._mensagem = new Bind(
            new Mensagem,
            new MensagemView($('#mensagemView')),
            'texto');

        this._service = new NegociacaoService();
            
        this._init();
    }

    _init() {
       this._service
            .lista()
            .then(negociacoes => negociacoes.forEach((negociacao) => this._listaNegociacoes.adiciona(negociacao)))
            .catch(erro => this._mensagem.texto = erro);

        setInterval(() => {
            this.importaNegociacoes();
        },5000);
    };

    adiciona(event) {

        event.preventDefault();

        const negociacao = this._criaNegociacao();
        
        this._service
            .cadastra(negociacao)
            .then(mensagem => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = mensagem;
                this._limpaFormulario();
            })
            .catch(mensagem => this._mensagem.texto = mensagem);
    }

    importaNegociacoes() {

        this._service
            .importa(this._listaNegociacoes.negociacoes)
            .then(negociacoes => negociacoes.forEach(negociacao => {
                    this._listaNegociacoes.adiciona(negociacao);
                    this._mensagem.texto = 'Negociaçoes do periodo importadas!';
            })).catch(erro => this._mensagem.texto = erro);

        /*

        usando promisse separadas

        service.obterNegociacoesDaSemana()
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociações adicionadas com sucesso';
            }).catch(erro => this._mensagem.texto = erro);

        service.obterNegociacoesDaSemanaAnterior()
             .then(negociacoes => {
                 negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                 this._mensagem.texto = 'Negociações adicionadas com sucesso';
             }).catch(erro => this._mensagem.texto = erro);

             console.log("AQUI");
             

        service.obterNegociacoesDaSemanaRetrasada()
              .then(negociacoes => {
                  negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                  this._mensagem.texto = 'Negociações adicionadas com sucesso';
              }).catch(erro => this._mensagem.texto = erro);
        
        * /

        /*
        codigo anterior callback hell

        service.obterNegociacoesDaSemana((erro, negociacoes) => {
            if(erro){
                this._mensagem.texto = erro;
                return;
            }

            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            
            service.obterNegociacoesDaSemanaAnterior((erro, negociacoes) => {
                if(erro){
                    this._mensagem.texto = erro;
                    return;
                }
    
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                
                service.obterNegociacoesDaSemanaRetrasada((erro, negociacoes) => {
                    if(erro){
                        this._mensagem.texto = erro;
                        return;
                    }
        
                    negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                    this._mensagem.texto = 'Negociações adicionadas com sucesso';
                });
            });
        });
        */
    }

    apaga() {

        this._service
            .apaga()
            .then(mensagem => {
                this._listaNegociacoes.esvazia();
                this._mensagem.texto = mensagem;
            })
            .catch(erro => this._mensagem.texto = erro);
    };

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }

    ordena(coluna) {
        if (this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }
}
