/*
* a convenience layer of MiLexer
* to build syntax highlighters.
*/

var utils = require('./utils'),
	debug = require('debug')('utils:app');

module.exports = MiHighlighter;

function MiHighlighter(state){
	this.state = state;
	this.tabSpaces = 4;
}


var highlighterProto =  MiHighlighter.prototype;


highlighterProto.stop = function(match, rest, state){
	debug('lexing to the end!');
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
	this.append(utils.whiteSpaceHarden(match));
	return state.next(rest);
}

/*
* escape code
*/
highlighterProto.escapeHtml = function(match, rest, state){
	this.append(utils.escapeHtml(match));
	debug('escapeHtml-state:', state);
	return state.next(rest);
}

/*
* add class
* @params1 {className} sytax css class
* @params2 {stateNext} change to another state
*/
highlighterProto.classify = function(className, stateNext){
	var self = this;
	return function(match, rest, state){
		self.append('<span class="' + className + '">' + match + '</span>');
		return stateNext ? stateNext(rest) : state.next(rest);
	}
}

/*
* rewrite match code str
*/
highlighterProto.rewrite = function(fn, stateNext){
	var self = this;
	return function(match, rest, state){
		self.append(fn.call(self, match));
		return stateNext ? stateNext(rest) : state.next(rest);
	}
}

/*
* rewrite and classify
*/
highlighterProto.rewriteAndClassify = function(fn, className, stateNext){
	var self = this;
	return function(match, rest, state){
		self.append('<span class="' + className + '">' + fn.call(self, match) + '</span>');
		return stateNext ? stateNext(rest) : state.next(rest);
	}
}

/*
* escape match code str
*/
highlighterProto.normal = function(match, rest, state){
	this.append(utils.escapeHtml(match));
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




