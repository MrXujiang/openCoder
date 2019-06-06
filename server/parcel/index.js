const Koa = require('koa');
const  { resolve } = require('path');
const static = require('koa-static');

const app = new Koa();
app.use(static(resolve(__dirname, './')));

app.listen(3000);
