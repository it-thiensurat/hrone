import axios from 'axios'

const httpServices = {
    get:function (url, callback) {
        // console.log(Connection.BaseURL+url);
        axios.get(url).then(function (response) {
            callback(response.data);
        }).catch(function (error) {
            callback(error);
        });
    },
    post:function (url, data, header, callback) {
        // console.log(url);
        // console.log(data);
        let config = {
            headers: header
        };
        axios.post(url, data, config).then(function (response) {
            callback(response.data);
        }).catch(function (error) {
            callback(error);
        });
    },
    delete:function (url, data, callback) {
        // console.log(url);
        // console.log(data);
        axios.delete(url, data).then(function (response) {
            callback(response.data);
        }).catch(function (error) {
            callback(error);
        });
    },
};

export default httpServices;