import http from 'utils/http';

export default {
    // 用户区
    getUser(params) {
        return http.get('/getUser', params)
    },

    // 基础数据区
    getData(params) {
        return http.get('/getData', params)
    },

    addData(data) {
        return http.post('/addData', data)
    },
}