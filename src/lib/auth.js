import { getCookie } from 'kooky';
import { report, parseJWT } from './util';

// 解出JWT, 放localstorage, 看过期时间, 根据过期时间, 在快过期的时候用旧JWT换新JWT
// 实际业务中不应当允许旧token换新token, 不然这等同于JWT永不过期那就失去意义了
function exchange(jwtStr, refresh) {
	const jwt = parseJWT(jwtStr), expires = JSON.parse(jwt.payload).exp * 1000, currentTime = Date.now();
	localStorage.setItem('JWT', jwtStr);
	// 旧JWT在header中
	setTimeout(() => refresh().then(({ data }) => exchange(data.jwt, refresh)), expires - currentTime - 300000);
}

export default function auth(apis) {
	// 这里不是正确的实践!!!
	// 其实这里合理的方案根本就不用什么localstorage,
	// 也不要去读cookie, 直接cookie httponly+secure,
	// 请求的时候withCredentials, cookie来cookie去,
	// 安全省事, 只不过是这里强行要给自己加戏, 但又
	// 不存在一个授权接口或授权页面, 就只能从页面cookie
	// 来获取JWT了
	const jwtStr = getCookie('JWT');
	if (jwtStr) {
		exchange(jwtStr, apis.exchangeJWT);
	} else {
		report(new Error('No JWT found in cookie.'));
		// 直接alert就好, 我觉得移动端用alert没什么毛病,
		// 反正设计就是我自己... 
		alert('可能遇到了一点点问题~', '__secan__');
	}
}