const AuthorizationToken='Basic X3N5c3RlbTpTWVM='
export const $http = {
    URL: 'http://114.116.64.37:52773',
    UrlEncode: (obj) => {
        if (!obj || Object.prototype.toString.call(obj) !== '[object Object]') {
            return '';
        }
        let params = [];
        for (let key in obj) {
            params.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
        return params.join('&');
    },
    get: (Nothis, Objson) => {
        let Alldata = '';
        if (Objson.data) {
            Alldata = '?' + $http.UrlEncode(Objson.data);
        }
        fetch(`${$http.URL}${Objson.url}${Alldata}`, {
            method: 'get',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": AuthorizationToken
            },
        }).then((res) => {
            // 如果http状态码正常，则直接返回数据
            if (res.status !== 200) {
                throw res.status
            } else {
                let Data;
                Data = res.json();
                return Data
            }
        }).then((res) => {
            Objson.success.call(Nothis, res)
        }).catch((error) => {
            if (Objson.error) {
                Objson.error.call(Nothis, error)
            }
        });
    },

    post: (Nothis, Objson) => {
        let formData = Objson.data;
        fetch(`${$http.URL}${Objson.url}`, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": AuthorizationToken
            },
            body: JSON.stringify(formData)
        }).then((res) => {
            if (res.status !== 200) {
                throw res.status
            } else {
                let Data;
                Data = res.json()
                return Data
            }
        }).then((res) => {
            Objson.success.call(Nothis, res)
        }).catch((error) => {
            if (Objson.error) {
                Objson.error.call(Nothis, error)
            }
        });
    }
}