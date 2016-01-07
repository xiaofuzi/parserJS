var MiniState = require('./milexer');

/*state change*/
function MiniNext(state) {
    return function(match, rest, state) {
        return state.run(rest);
    }
}

function strLexer(input) {
    var Lexer = new MiniState();

    var Tokens = [];

    /* Token classes. */
    function NUM(string) {
        this.string = string;
        this.toString = function() {
            return "NUM(" + string + ")";
        };
    }

    function ID(string) {
        this.string = string;
        this.toString = function() {
            return "ID(" + string + ")";
        };
    }

    Lexer(/[A-Za-z_]+/, function(match, rest, state) {
        Tokens.push(new ID(match[0]).toString());
        return state.next(rest);
    })
    Lexer(/[0-9]+/, function(match, rest, state) {
        console.log('rest num', rest);
        Tokens.push(new NUM(match[0]).toString());
        return state.next(rest);
    })
    Lexer(/\s+/, function(match, rest, state){
        return state.next(rest);
    });
    Lexer(/$/, function(match, rest, state) {
        return null;
    });

    Lexer.lex(input);

    return Tokens;
}

console.log(strLexer('aa111qsss foo nra 343 name'));





