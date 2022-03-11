const Koa = require('koa');
const router = require('koa-router')();

const app = new Koa();


router.get('/anotherService', ctx => {
  ctx.type = 'json';
  ctx.body = { code: 0, message: '这是8003端口返回的' };
})

app.use(async(ctx, next) => {
	ctx.set('Access-Control-Allow-Origin','http://localhost:8000'); // 这里如果是写* 那么下面Access-Control-Allow-Credentials不生效
	ctx.set('Access-Control-Allow-Methods','PUT, POST, GET, DELETE, OPTIONS');
    // axios withCredentials
	ctx.set('Access-Control-Allow-Credentials','true');
	if(ctx.method == 'OPTIONS'){
		ctx.body = 200;
	} else {
	    await next()
	}
})

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8003);