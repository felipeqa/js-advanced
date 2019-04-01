class NegociacaoService {

    /*
        Configurações
        
        0: requisão não iniciada
        1: conexão com o servidor estabelecida
        2: requisição recebida
        3: processando requisição
        4: requisição concluida
    */

    obterNegociacoesDaSemana(callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'negociacoes/semana');
        xhr.onreadystatechange = () =>{

            if(xhr.readyState == 4) {

                if(xhr.status == 200) {
                    
                    callback(null, JSON.parse(xhr.responseText)
                    .map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)));
        
                } else {
                    console.log(xhr.responseText);
                    callback('Não foi possível obter negociações', null);
                }
        }
            
        };
        xhr.send();
    }
}