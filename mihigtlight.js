/*
* a convenience layer of MiLexer
* to build syntax highlighters.
*/

var utils = require('./utils');

function MiHighlighter(state){
	this.state = state;

	this.tabSpaces = 4;
}


var highlighterProto =  MiHighlighter.prototype;


highlighterProto.stop = function(match, rest, state){
	return null;
}

/*
* tab spaces
*/
highlighterProto.tabSpace = function(){
	return utils.tabSpace(this.tabSpaces);
}

/*
* harden white spaces
*/
highlighterProto.hardenWhitespace = function(match, rest, state){
	this.append(utils.whiteSpaceHarden(match[0]));
	return state.next(rest);
}

/*
* source code highlighter
*/
highlighterProto.highlight = function(code){
	var buffer = '';
	if(!code) return buffer;

	/*
	* generate highlight code
	*/
	this.append = function(html){
		buffer += html;
	};
	this.state.lex(code);
	return buffer;
}




