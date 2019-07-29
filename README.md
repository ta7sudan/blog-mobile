# blog-mobile

因为使用了 modern 模式, 所以生成的包都是以 module 形式加载的, module 加载的 script 需要开启 CORS, 如果跨域的话. 但是使用 CDN 是肯定跨域的, 所以记得在 CDN 配置 CORS



目前有一个需要手动指定的环境变量 SENTRY_AUTH_TOKEN



* 用accessToken去换token而不是用旧token换新token
* JWT 从哪里来, 存哪里, 怎么发回去, 过期怎么处理, 从第一次进入页面的cookie来, 从授权接口请求的响应任意部分来, 或通过授权成功重定向页面的cookie来, 存cookie或localstorage, 从cookie或header发回去, 过期重定向到token来源页, 这样就不是静默的, 或重新请求授权接口, 这样就是静默的
* 目前暂定jwt从进入页面的cookie来, 存localstorage, jwt里面设置过期时间时间戳, 尽管前端读取JWT可以知道什么时候过期, 但是还是应当以后端响应为准, 一个IP一个jwt







