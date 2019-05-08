class HttpService {
    
    _handlerErrors(res){
        if(!res.ok) throw new Error(res.statusError);
        return res;
    };

    get(url){
        return fetch(url)
            .then(res => this._handlerErrors(res))
            .then(res => res.json());
    };
    
    /* Versão usando o http request
    get(url){
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4) {

                    if (xhr.status == 200) {

                        resolve(JSON.parse(xhr.responseText));

                    } else {
                        reject(xhr.responseText);
                    }
                }

            };
            xhr.send();
        });
    };
    */

    post(url, dado){
        fetch(url, {
            headers: {'Content-Type': 'application/json' },
            method: 'post',
            body: JSON.stringify(dado)
        })
        .then(res => this._handlerErrors(res));
    }

    /*
    post(url, dado) {

        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4) {

                    if (xhr.status == 200) {

                        resolve(JSON.parse(xhr.responseText));
                    } else {

                        reject(xhr.responseText);
                    }
                }
            };
            xhr.send(JSON.stringify(dado));
        });

    };
    */
}