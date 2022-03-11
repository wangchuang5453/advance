const Koa = require('koa');
const router = require('koa-router')();
const fs = require('fs');

const app = new Koa();

router.get('/', ctx => {
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream('./index.html');
})

router.get('/login', ctx => {
  ctx.cookies.set('user', 'jay', { maxAge: 2000000, httpOnly: true });
  ctx.type = 'json';
  ctx.body = { code: 0, message: 'login success' };
})

router.get('/user', ctx => {
  const cookie = ctx.request.headers.cookie;
  const cookies = {};
  cookie && cookie.split(';').forEach(cookie => {
    let parts = cookie.split('=');
    cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
  });
  ctx.body = { code: 0, user: cookies.user };
})

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8000);



