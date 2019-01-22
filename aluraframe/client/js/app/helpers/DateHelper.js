class DateHelper {

    constructor(){
        throw new Error('Essa classe não pode ser instanciada');
    }

    static dataParaTexto(data) {
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    }

    static textoParaData(texto) {
        if(!/\d{4}-\d{2}-\d{2}/.test(texto)) {
            throw new Error('Deve estar no formato aaaa-mm-dd');
        }
        //spread operator (...)
        return new Date(...texto.split('-').map((item, index) => {
            return item - index % 2;
        })
        );
    }
}