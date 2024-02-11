// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE
/* eslint-disable */ 

(function(mod) {
    if (typeof exports == "object" && typeof module == "object") // CommonJS
      mod(require("codemirror/lib/codemirror"));
    else if (typeof define == "function" && define.amd) // AMD
      define(["codemirror/lib/codemirror"], mod);
    else // Plain browser env
      mod(CodeMirror);
  })(function(CodeMirror) {
    var Pos = CodeMirror.Pos;
  
    function forEach(arr, f) {
      for (var i = 0, e = arr.length; i < e; ++i) f(arr[i]);
    }
  
    function arrayContains(arr, item) {
      if (!Array.prototype.indexOf) {
        var i = arr.length;
        while (i--) {
          if (arr[i] === item) {
            return true;
          }
        }
        return false;
      }
      return arr.indexOf(item) != -1;
    }
  
    function scriptHint(editor, keywords, getToken, options) {
      // Find the token at the cursor
      var cur = editor.getCursor(), token = getToken(editor, cur);
      if (/\b(?:string|comment)\b/.test(token.type)) return;
      var innerMode = CodeMirror.innerMode(editor.getMode(), token.state);
      if (innerMode.mode.helperType === "json") return;
      token.state = innerMode.state;
  
      // If it's not a 'word-style' token, ignore the token.
      if (!/^[\w$_]*$/.test(token.string)) {
        token = {start: cur.ch, end: cur.ch, string: "", state: token.state,
                 type: token.string == "." ? "property" : null};
      } else if (token.end > cur.ch) {
        token.end = cur.ch;
        token.string = token.string.slice(0, cur.ch - token.start);
      }
  
      var tprop = token;
      // If it is a property, find out what it is a property of.
      while (tprop.type == "property") {
        tprop = getToken(editor, Pos(cur.line, tprop.start));
        if (tprop.string != ".") return;
        tprop = getToken(editor, Pos(cur.line, tprop.start));
        if (!context) var context = [];
        context.push(tprop);
      }
      return {list: getCompletions(token, context, keywords, options),
              from: Pos(cur.line, token.start),
              to: Pos(cur.line, token.end)};
    }
  
    function javascriptHint(editor, options) {
      //console.log('here hints')
      return scriptHint(editor, poplangKeywords,
                        function (e, cur) {return e.getTokenAt(cur);},
                        options);
    };
    CodeMirror.registerHelper("hint", "javascript", javascriptHint);
  
    function getCoffeeScriptToken(editor, cur) {
    // This getToken, it is for coffeescript, imitates the behavior of
    // getTokenAt method in javascript.js, that is, returning "property"
    // type and treat "." as indepenent token.
      var token = editor.getTokenAt(cur);
      if (cur.ch == token.start + 1 && token.string.charAt(0) == '.') {
        token.end = token.start;
        token.string = '.';
        token.type = "property";
      }
      else if (/^\.[\w$_]*$/.test(token.string)) {
        token.type = "property";
        token.start++;
        token.string = token.string.replace(/\./, '');
      }
      return token;
    }
  
    function coffeescriptHint(editor, options) {
      return scriptHint(editor, coffeescriptKeywords, getCoffeeScriptToken, options);
    }
    CodeMirror.registerHelper("hint", "coffeescript", coffeescriptHint);
  
    var stringProps = ("charAt charCodeAt indexOf lastIndexOf substring substr slice trim trimLeft trimRight " +
                       "toUpperCase toLowerCase split concat match replace search").split(" ");
    var arrayProps = ("length concat join splice push pop shift unshift slice reverse sort indexOf " +
                      "lastIndexOf every some filter forEach map reduce reduceRight ").split(" ");
    // var funcProps = "prototype apply call bind".split(" ");
    // var javascriptKeywords = ("break case catch class const continue debugger default delete do else export extends false finally for function " +
    //                 "if in import instanceof new null return super switch this throw true try typeof var void while with yield").split(" ");
    // var coffeescriptKeywords = ("and break catch class continue delete do else extends false finally for " +
    //                 "if in instanceof isnt new no not null of off on or return switch then throw true try typeof until void while with yes").split(" ");
    var funcProps = ("pop.func pop.func.define func return").split(" ");
    
    const protocol = {
      "fsm_config":{
          "FSM_CONTRACT_KEY":"FSM_CONTRACT_KEY",
          "OP_ROOT":"root",
          "OP_FORK":"fork",
          "OP_RELATE":"relate",
          "OP_SEND":"send",
          "OP_SETKEY":"setkey",
          "OP_CHKEY":"chkey",
          "OP_JOIN":"join",
          "OP_HOLD":"hold",
          "OP_FSM":"fsm",
          "OP_PHONE":"phone",
          "OP_CONFIG":"config",
          "OP_ASSERT":"assert",
          "OP_NOTICE":"notice",
          "OP_SMS":"sms",
          "OP_PAY":"pay",
          "OP_MAIL":"mail",
          "OP_WSLISTEN":"wslisten",
          "OP_RELA":"rela",
          "OP_RELB":"relb",
          "OP_RELC":"relc",
          "OP_RELD":"reld",
          "OP_RELE":"rele",
          "OP_RELF":"relf",
          "OP_RELG":"relg",
          "OP_RELH":"relh",
          "OP_RELI":"reli",
          "OP_RELJ":"relj",
          "OP_RELK":"relk",
          "OP_RELL":"rell",
          "OP_RELM":"relm",
          "OP_RELN":"reln",
          "OP_RELO":"relo",
          "OP_RELP":"relp",
          "OP_RELQ":"relq",
          "OP_RELR":"relr",
          "OP_RELS":"rels",
          "OP_RELT":"relt",
          "OP_RELU":"relu",
          "OP_RELV":"relv",
          "OP_RELW":"relw",
          "OP_RELX":"relx",
          "OP_RELY":"rely",
          "OP_RELZ":"relz",
          "OP_MAP":"map",
          "OP_FILE":"file",
          "OP_FILE_UP":"file.upload",
          "OP_FILE_DOWN":"file.download",
          "OP_FILE_LOG":"file.download.log",
          "OP_WEBSOCKET":"websocket",
          "OP_WEBSOCKET_TOKEN":"websocket.token",
          "OP_WEBSOCKET_TOKEN_WRITE":"websocket.token.write",
          "OP_ACCESS":"access",
          "OP_ACCESS_SUPER":"access.super",
          "OP_ACCESS_CHAIN":"access.chain",
          "OP_ACCESS_CHAIN_OPEN":"access.chain.open",
          "OP_ACCESS_ALL":"access.all",
          "OP_ACCESS_BAN":"access.ban",
          "OP_ACCESS_ONCE":"access.once",
          "OP_TOKEN":"token",
          "OP_TOKEN_ACCESS":"token.key",
          "OP_TOKEN_BAN":"token.key.ban",
          "OP_WEB3":"web3",
          "OP_WEB3_KEY":"web3.key",
          "OP_WEB3_TOKEN_OPEN":"web3.token.open",
          "OP_WEB3_META":"web3.meta",
          "OP_WEB3_META_SET":"web3.meta.set",
          "OP_WEB3_META_CALL":"web3.meta.call",
          "OP_WEB3_PUBLIC":"web3.meta.public",
          "OP_WEB3_RESULT":"web3.meta.result",
          "OP_WEB3_COPY":"web3.meta.copy",
          "OP_WEB3_POP":"web3.pop",
          "OP_WEB3_POP_CALL":"web3.pop.call",
          "OP_WEB3_POP_ONCE":"web3.pop.once",
          "OP_WEB3_POP_SCRIPT":"web3.pop.script"
      },
      "root_config":{
          "route_module_path":"",
          "TOKEN_ROOT":"rmb_0000000000000000",
          "TOKEN_ROOT_NUM":1,
          "TOKEN_FSM":"dnalink.fsm",
          "TOKEN_VAL_TYPE":"TEXT",
          "TOKEN_BURN_FLAG":false,
          "TOKEN_NAME":"rmb",
          "TOKEN_NAME_PREFIX":"lauo_",
          "TNS_NAMESPACE":"lauo_",
          "TOKEN_ID_LENGTH":16,
          "COIN_TOP_VAL":0,
          "COIN_PRECISION_MAX":8,
          "TOKEN_ROOT_HOST":"127.0.0.1:88",
          "DOMAIN_PORT":80,
          "DOMAIN_DNALINK":"dnalink.pop",
          "TOKEN_GROUP":"dnalink.pop",
          "appids":[
              10001
          ],
          "secret_keys":[
          ]
      }
    }
    window.poplangKeywords =  ("alias set get object.assign object.set object.get . .. pwd == === = pop.func func pop.func.define pop.func.end pop.ifelse pop.while pop.do.until pop.sleep pop.do.while func.ifelse func.while // # ## func.call new del clear local.file.download local.file.upload require script pop.exit this.get this.assign return $. $$. typeof ?= ! + - * / > < >= <= && & || | fork send web3.key websocket object.get object.set").split(" ");
    for(var key in protocol.fsm_config) poplangKeywords.push(protocol.fsm_config[key])
    var coffeescriptKeywords =[]// ("and break catch class continue delete do else extends false finally for " +
                   // "if in instanceof isnt new no not null of off on or return switch then throw true try typeof until void while with yes").split(" ");
  
    function forAllProps(obj, callback) {
      if (!Object.getOwnPropertyNames || !Object.getPrototypeOf) {
        for (var name in obj) callback(name)
      } else {
        for (var o = obj; o; o = Object.getPrototypeOf(o))
          Object.getOwnPropertyNames(o).forEach(callback)
      }
    }
  
    function getCompletions(token, context, keywords, options) {
      var found = [], start = token.string, global = options && options.globalScope || window;
      function maybeAdd(str) {
        if (str.lastIndexOf(start, 0) == 0 && !arrayContains(found, str)) found.push(str);
      }
      function gatherCompletions(obj) {
        if (typeof obj == "string") forEach(stringProps, maybeAdd);
        else if (obj instanceof Array) forEach(arrayProps, maybeAdd);
        else if (obj instanceof Function) forEach(funcProps, maybeAdd);
        forAllProps(obj, maybeAdd)
      }
  
      if (context && context.length) {
        // If this is a property, see if it belongs to some object we can
        // find in the current environment.
        var obj = context.pop(), base;
        if (obj.type && obj.type.indexOf("variable") === 0) {
          if (options && options.additionalContext)
            base = options.additionalContext[obj.string];
          if (!options || options.useGlobalScope !== false)
            base = base || global[obj.string];
        } else if (obj.type == "string") {
          base = "";
        } else if (obj.type == "atom") {
          base = 1;
        } else if (obj.type == "function") {
          if (global.jQuery != null && (obj.string == '$' || obj.string == 'jQuery') &&
              (typeof global.jQuery == 'function'))
            base = global.jQuery();
          else if (global._ != null && (obj.string == '_') && (typeof global._ == 'function'))
            base = global._();
        }
        while (base != null && context.length)
          base = base[context.pop().string];
        if (base != null) gatherCompletions(base);
      } else {
        // If not, just look in the global object and any local scope
        // (reading into JS mode internals to get at the local and global variables)
        for (var v = token.state.localVars; v; v = v.next) maybeAdd(v.name);
        for (var v = token.state.globalVars; v; v = v.next) maybeAdd(v.name);
        if (!options || options.useGlobalScope !== false)
          gatherCompletions(global);
        forEach(keywords, maybeAdd);
      }
      return found;
    }
  });
  