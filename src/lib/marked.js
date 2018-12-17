import marked from 'marked';

marked.setOptions({
	headerIds: true,
	headerPrefix: '_article-'
	// highlight(code, lang, cb) {}
});

export default marked;