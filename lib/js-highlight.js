/*
* A syntax-highlighter for javascript
*/

var MiLexer = require('./milexer'),
	MiHighlighter = require('./mihighlight'),
	utils = require('./utils');

var JAVASCRIPT = new MiLexer(),
	JAVASCRIPT_1STRING = new MiLexer(),
	JAVASCRIPT_2STRING = new MiLexer(),
	JAVASCRIPT_COMMENT = new MiLexer(),
	JSHighlighter = new MiHighlighter(JAVASCRIPT);

/*
* Standard JavaScript lexing
*/
JAVASCRIPT(/function|return|var|if|for|in|do|while|break/, JSHighlighter.classify("js-keyword"));
JAVASCRIPT(/continue|switch|case|ture|false|null|prototype/, JSHighlighter.classify("js-keyword"));

/*punctuation*/
JAVASCRIPT(/[-+*\/=<>&|?{}()\[\]:;,.!%]/, JSHighlighter.rewriteAndClassify(utils.escapeHtml, 'js-punctuation'));

/*js string, for example.'str'*/
JAVASCRIPT(/\'/, JSHighlighter.classify('js-string', JAVASCRIPT.next(JAVASCRIPT_1STRING)));
JAVASCRIPT(/\"/, JSHighlighter.classify('js-string', JAVASCRIPT.next(JAVASCRIPT_2STRING)));

/*js comment*/
JAVASCRIPT(/\/[*]/, JSHighlighter.rewriteAndClassify(utils.whiteSpaceHarden, 'js-comment', JAVASCRIPT.next(JAVASCRIPT_COMMENT)));
JAVASCRIPT(/\/\/[^\r\n]*/, JSHighlighter.classify('js-comment'));
JAVASCRIPT (/\/[*]([^*]|[*][^\/])*[*]\//, JSHighlighter.rewriteAndClassify(utils.escapeAndHarden, "js-comment"));

/*js regex*/
JAVASCRIPT (/\/(\\\/|[^\/\n])*\/[gim]*/, JSHighlighter.classify("js-regexp"));

/*space, new line*/
JAVASCRIPT (/[\n\r \t]+/, JSHighlighter.rewrite(utils.whiteSpaceHarden));

/*js num*/
JAVASCRIPT(/\d+([.]\d+)?/, JSHighlighter.classify('js-number'));

/*function name*/
JAVASCRIPT(/(\w|\d|_)+(?=(\s*[(]))/, JSHighlighter.classify('js-function'));
JAVASCRIPT(/(\w|\d|_)+(?=(\s*=\s*function))/, JSHighlighter.classify('js-function'));

/*params*/
JAVASCRIPT(/(\w|\d|_)+(?=(\s*\)))/, JSHighlighter.classify('js-params'));
JAVASCRIPT(/(\w|\d|_)+/, JSHighlighter.classify('js-identifier'));

/*lexer end*/
JAVASCRIPT(/$/, JSHighlighter.stop);

/* Comments state */
JAVASCRIPT_COMMENT(/\s+/, JSHighlighter.rewrite(utils.whiteSpaceHarden));
JAVASCRIPT_COMMENT(/[*]\//, JSHighlighter.classify('js-comment', JAVASCRIPT_COMMENT.next(JAVASCRIPT)));
JAVASCRIPT_COMMENT(/./, JSHighlighter.classify('js-comment'));

/* Single-quoted strings. */
JAVASCRIPT_1STRING (/\\\'/, JSHighlighter.classify("js-string")) ;
JAVASCRIPT_1STRING (/\'/, JSHighlighter.classify("js-string", JAVASCRIPT_1STRING.next(JAVASCRIPT))) ;
JAVASCRIPT_1STRING (/[^\']*/, JSHighlighter.classify("js-string")) ;


/* Doubly-quoted strings. */
JAVASCRIPT_2STRING (/\\\"/, JSHighlighter.classify("js-string")) ;
JAVASCRIPT_2STRING (/\"/, JSHighlighter.classify("js-string", JAVASCRIPT_2STRING.next(JAVASCRIPT))) ;
JAVASCRIPT_2STRING (/[^\""]*/, JSHighlighter.classify("js-string")) ;



module.exports = JSHighlighter;










