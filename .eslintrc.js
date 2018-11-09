module.exports = {
	root: true,
	env: {
		es6: true,
		browser: true,
		node: true
	},
	globals: {
		DEBUG: true
	},
	extends: ['plugin:vue/essential'],
	plugins: ['prettier'],
	parserOptions: {
		parser: 'babel-eslint',
		ecmaVersion: 2018,
		sourceType: 'module'
	},
	rules: {
		'no-undef': 'error',
		'no-console': 'off',
		'no-debugger': 'off',
		'no-extra-boolean-cast': 'off',
		indent: [
			'error',
			'tab',
			{
				SwitchCase: 1,
				VariableDeclarator: 1
			}
		],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single', {
			avoidEscape: true
		}],
		semi: ['error', 'always'],
		'semi-spacing': [
			'error',
			{
				before: false,
				after: true
			}
		],
		'no-unused-vars': [
			'error',
			{
				vars: 'local',
				args: 'none'
			}
		],
		camelcase: [
			'error',
			{
				properties: 'always',
				ignoreDestructuring: true
			}
		],
		'brace-style': [
			'warn',
			'1tbs',
			{
				allowSingleLine: true
			}
		],
		'comma-dangle': ['warn', 'never'],
		'comma-style': ['warn', 'last'],
		'comma-spacing': [
			'error',
			{
				before: false,
				after: true
			}
		],
		radix: 'warn',
		strict: ['error', 'global'],
		'space-before-function-paren': [
			'error',
			{
				anonymous: 'always',
				named: 'never',
				asyncArrow: 'always'
			}
		],
		'arrow-parens': ['error', 'as-needed']
	}
};
