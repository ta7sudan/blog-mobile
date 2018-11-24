import Vue from 'vue';
import Router from 'vue-router';
import { loadAllArr } from './lib/util';

Vue.use(Router);

const routes = loadAllArr(require.context('./routes', true, /\.js$/));

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});
