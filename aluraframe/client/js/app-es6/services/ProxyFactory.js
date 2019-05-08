class ProxyFactory {
    static create(objeto, props, acao){

        return new Proxy(objeto, {
            get(target, property, receiver){
                if(props.includes(property) && ProxyFactory._ehFuncao(target[property])){
                    return function(){

                        console.log(`interceptado ${property}`);
                        
                        Reflect.apply(target[property], target, arguments);
                        return acao(target);
                    }
                }
                return Reflect.get(target, property, receiver);
            },

            set(target, property, value, receiver){

                console.log(`interceptado ${property}`);
                if(props.includes(property)){
                    target[property] = value;
                    acao(target);
                }
                return Reflect.set(target, property, value, receiver);
            }
        });
    };

    static _ehFuncao(func){
        return typeof(func) == typeof(Function);
    };
}