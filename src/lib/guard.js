import secan from 'secan';
import { report, once } from './util';
/* global DEBUG, DOMAIN */

export default function guard() {
	secan({
		// TODO
		debug: DEBUG || '__nodebugger__',
		debuggerLoop: true,
		breakIframe: true,
		hookFn: true,
		baitURL: `https://${DOMAIN}/test.js`,
		scriptDomain: DOMAIN,
		pageDomain: DOMAIN
	});
	// 目前先简单了解下情况, 暂时收集不到太多有用信息,
	// 考虑到时候优化下secan多提供一些有用的信息
	window.addEventListener('eval', e => {
		report(new Error(`Eval called, args is: ${JSON.stringify(e.detail.args)}`));
	});
	window.addEventListener('alert', e => {
		report(new Error(`alert called, args is: ${JSON.stringify(e.detail.args)}`));
	});
	window.addEventListener('console', e => {
		report(new Error(`console called, args is: ${JSON.stringify(e.detail.args)}`));
	});
	window.addEventListener('invaliddomain', () => {
		report(new Error(`invalid domain, url is: ${location.href}`));
	});
	window.addEventListener('sslbreak', () => {
		report(new Error(`ssl break, url is: ${location.href}`));
	});
	window.addEventListener('sslstrip', () => {
		report(new Error('ssl strip occurred'));
	});
	window.addEventListener('iniframe', () => {
		report(new Error('page is in a iframe'));
	});
	window.addEventListener('headlessbrowser', () => {
		report(new Error('page is in a headless browser'));
	});
	window.addEventListener('invalidscript', once(e => {
		report(new Error(`invalid script, resources is: ${JSON.stringify(e.detail.invalidScript)}`));
	}));
	window.addEventListener('devtoolsopen', once(e => {
		report(new Error('devtools detected'));
	}));
}

