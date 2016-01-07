/*
* some helper functions
*/

var utils = module.exports = {};



/*
* tabSpace
*/

utils.tabSpace = function(num){
	var tabSpace = "",
		tabSpaceNum = num || 4;
  	for (var i = 0; i < tabSpaceNum; ++i){
    	tabSpace += "&nbsp;" ; 
  	}
  	return tabSpace ;
}

/*
* whiteSpace processing
*/
utils.whiteSpaceHarden = function(code){
	var str = '';
	str = code.replace(/ /g, "&nbsp;")
		.replace(/\n/g, "<br />")
		.replace(/\t/g, utils.tabSpace());
	return str;
}


/*
* escape html
*/
utils.escapeHtml = function(code){
	var s = code;
	s = s.replace(/&/g, "&amp")
		.replace(/</g, "&lt")
		.replace(/>/g, "&gt");
	return s;
}

/*
* escape and harden code
*/
utils.escapeAndHarden = function(code){
	code = this.escapeHtml(code);
	return this.whiteSpaceHarden(code);
}

