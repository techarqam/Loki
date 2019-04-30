import axios from 'axios'

function request(method, url, data, cacheInfo) {

    let session = JSON.parse(sessionStorage.getItem("session"));
    let headers = {};
    let queryString = "";
    if (session) {
        headers["Authorization"] = `Bearer ${session.user.token}`
    }

    if (cacheInfo && cacheInfo.key && sessionStorage.getItem(cacheInfo.key)) {
        let cached = sessionStorage.getItem(cacheInfo.key)

        if (Date.parse(new Date()) < Date.parse(cached.expiresAt)) {
            return cached.data;
        }
    }

    switch (method) {
        case 'get':
            queryString = data ? Object.keys(data).map(key => key + '=' + data[key]).join('&') : "";
            return axios.get(url + "?" + queryString, { headers: headers }).then((result) => {
                if (cacheInfo)
                    cacheResponse(cacheInfo, result);
                return result;
            });

        case 'post':
            const { query, body } = data;
            queryString = query ? Object.keys(query).map(key => key + '=' + query[key]).join('&') : "";
            return axios.post(url + "?" + queryString, body, { headers: headers }).then((result) => {
                if (cacheInfo)
                    cacheResponse(cacheInfo, result);
                return result;
            });

        case 'put':
            return axios.put(url, data, { headers: headers }).then((result) => {
                if (cacheInfo)
                    cacheResponse(cacheInfo, result);
                return result;
            });

        default:
            return null;
    }
}

export default {
    request: request
}

function cacheResponse(cacheInfo, result) {

    let cached = {
        data: result,
        key: cacheInfo.key,
        expiresAt: Date.now()
    };
    sessionStorage.data = cached;

}
