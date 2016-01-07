var debug = require('debug')('milexer:app');
/*
A lexical state is a collection of rules.
lex(input)
run(input)
continuation(input)
*/

function MiState(){
	var rules = [];
	var state = function(regex, action){
		return rules.push(new MiRule(regex, action));
	};	
	state.rules = rules;

	state.lex = function(input){
		var nextCont = state.run(input);
		while(typeof nextCont == 'function'){
			nextCont = nextCont();
		}
		return nextCont;
	}

	state.run = MiRunMethod;

	state.next = function(input){
		if(typeof input == 'function'){
   			return function(rest){
   				return input.run(rest);
   			}
  		}else{
			return function(){
				if(input.length == 20){
					debug('input:\n', input);
				}
				return state.run(input);
			}
		}
	}
	
	return state;
}


function MiRule(regex, action){
	this.regex = new RegExp("^(" + regex.source + ")");
	this.action = action;
}

MiRule.prototype.matches = function(str){
	var m = str.match(this.regex);
	if(m) m.shift();
	return m;
}

function MiRunMethod(input){
	var longestMatchedRule = null,
		longestMatch = null,
		longestMatchedLength = -1,
		rules = this.rules;
	rules.forEach(function(r){
		var m = r.matches(input);
		if(m && (m[0].length > longestMatchedLength)){
			longestMatchedRule = r;
			longestMatch = m;
			longestMatchedLength = m[0].length;
		}
	})
	if(longestMatchedRule){
		var restStr = input.substring(longestMatchedLength);
		return longestMatchedRule.action(longestMatch[0], restStr, this);
	}else{
		throw ("Lexing error; no match found for: '" + input + "'");
	}
}

module.exports = MiState;