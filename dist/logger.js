/**
 * @license Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
 * Available via the MIT, GPL or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
var logger = {
	TRACE: 0,
	INFO: 1,
	WARN: 2,
	ERROR: 3,
	level: 0,
	logPrefix: "",

	trace: function(message){
		if(this.level <= this.TRACE){
			this._print(message);
		}
	},

	info: function(message){
		if(this.level <= this.INFO){
			this._print(message);
		}
	},

	warn: function(message){
		if(this.level <= this.WARN){
			this._print(message);
		}
	},

	error: function(message){
		if(this.level <= this.ERROR){
			this._print(message);
		}
	},

	_print: function(message){
		print((this.logPrefix ? (this.logPrefix + " ") : "") + message);
	}
}
