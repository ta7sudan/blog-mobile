# blog-mobile

因为使用了 modern 模式, 所以生成的包都是以 module 形式加载的, module 加载的 script 需要开启 CORS, 如果跨域的话. 但是使用 CDN 是肯定跨域的, 所以记得在 CDN 配置 CORS