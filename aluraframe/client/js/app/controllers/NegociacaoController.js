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

    }

    adiciona(event) {

        event.preventDefault();

        ConnectionFactory.getConnectionFactory()
            .then(connection => {

                let negociacao = this._criaNegociacao();

                new NegociacaoDao(connection)
                    .adiciona(negociacao)
                    .then(() => {
                        this._listaNegociacoes.adiciona(this._criaNegociacao());
                        this._mensagem.texto = 'Negociação adicianada com sucesso';
                        this._limpaFormulario();
                    });
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    importaNegociacoes() {

        let service = new NegociacaoService();

        Promise.all([
            service.obterNegociacoesDaSemana(),
            service.obterNegociacoesDaSemanaAnterior(),
            service.obterNegociacoesDaSemanaRetrasada()
        ]).then(negociacoes => {
            negociacoes.reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
                .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociaçoes adicionadas com sucesso!';
        }).catch(erro => this._mensagem.texto = erro);

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
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso';
    }

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
