AUI.add("aui-ace-autocomplete-base",function(d){var h=d.Lang,c=d.Array,i=d.Do,e="exec",m="fillMode",n="host",b="insertText",g="processor",a=1,k=0,l=-1,j=0,o="ace-autocomplete-base";var f=function(){};f.prototype={initializer:function(){var p=this;p._editorCommands=[];d.after(this._bindUIACBase,this,"renderUI");var q=p.get(g);if(q&&!q.get(n)){q.set(n,p);}},_addSuggestion:function(r){var p=this;var q=p._getEditor();var s=p.get(g).getSuggestion(p._matchParams.match,r);if(this.get(m)===f.FILL_MODE_OVERWRITE){q.removeWordLeft();}q.insert(s);q.focus();p.fire("addSuggestion",s);return new i.Halt(null);},_bindUIACBase:function(){var p=this;p.publish("cursorChange",{defaultFn:p._defaultCursorChangeFn});var q=p._getEditor();q.on("change",d.bind(p._onEditorChange,p));q.commands.addCommand({name:"showAutoComplete",bindKey:d.merge(p.get("showListKey"),{sender:"editor|cli"}),exec:function(t,s,u){var r=q.getCursorPosition();p._processAutoComplete(r.row,r.column);}});q.getSelection().on("changeCursor",d.bind(p._onEditorChangeCursor,p));p.on("destroy",p._destroyUIACBase,p);},_defaultCursorChangeFn:function(p){var v=this;var s=v._getEditor();var q=s.getCursorPosition();var w=q.row;var r=q.column;var t=v._matchParams;if(w!==t.row||r<t.match.start){v.fire("cursorOut");}else{var x=s.getSession().getLine(w);var u=x.substring(t.match.start,r);if(!v.get(g).getMatch(u)){v.fire("match");}}},_destroyUIACBase:function(){var p=this;p._removeAutoCompleteCommands();},_getEditor:function(){var p=this;return p.get("host").getEditor();},_handleEnter:function(r){var p=this;if(r==="\n"||r==="\t"){var q=p._getSelectedEntry();return p._addSuggestion(q);}},_onEditorChange:function(u){var p=this;var v=u.data;var w=v.action;if(w===b||w==="removeText"){var s=v.range;var t=s.start.column;var r=s.end.row;var q=s.start.row;if(w===b&&q===r){p._processAutoComplete(q,t+1);}p.fire(w,{column:t,dataRange:s,endRow:r,startRow:q});}},_onEditorChangeCursor:function(q){var p=this;p.fire("cursorChange",p._getEditor().getCursorPosition());},_onResultsError:function(q){var p=this;p.fire("resultsError",q);},_onResultsSuccess:function(q){var p=this;p.set("results",q);},_overwriteCommands:function(){var q=this;var r=q._getEditor();var p=r.commands.commands;q._editorCommands.push(i.before(q._handleEnter,r,"onTextInput",this),i.before(q._handleKey,p["golinedown"],e,this,40),i.before(q._handleKey,p["golineup"],e,this,38),i.before(q._handleKey,p["gotoend"],e,this,35),i.before(q._handleKey,p["gotolineend"],e,this,35),i.before(q._handleKey,p["gotolinestart"],e,this,36),i.before(q._handleKey,p["gotopagedown"],e,this,34),i.before(q._handleKey,p["gotopageup"],e,this,33),i.before(q._handleKey,p["gotostart"],e,this,36));},_processAutoComplete:function(w,r){var v=this;var q=r;var t=v._getEditor();var x=t.getSession().getLine(w);x=x.substring(0,r);var p=v.get(g);var s=p.getMatch(x);var u;if(h.isObject(s)){u=t.renderer.textToScreenCoordinates(w,r);v._matchParams={column:r,match:s,row:w};p.getResults(s,d.bind(v._onResultsSuccess,v),d.bind(v._onResultsError,v));}v.fire("match",{column:r,coords:u,line:x,match:s,row:w});},_removeAutoCompleteCommands:function(){var p=this;c.invoke(p._editorCommands,"detach");p._editorCommands.length=0;},_validateFillMode:function(p){return(p===f.FILL_MODE_OVERWRITE||p===f.FILL_MODE_INSERT);}};f.FILL_MODE_INSERT=a;f.FILL_MODE_OVERWRITE=k;f.NAME=o;f.NS=o;f.ATTRS={fillMode:{validator:"_validateFillMode",value:f.FILL_MODE_OVERWRITE},processor:{validator:function(p){return h.isObject(p)||h.isFunction(p);}},showListKey:{validator:h.isObject,value:{mac:"Alt-Space",win:"Ctrl-Space"}}};d.AceEditor.AutoCompleteBase=f;},"@VERSION@",{requires:["aui-ace-editor"]});