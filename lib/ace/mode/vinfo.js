/**
 * Vinfo syntax highlighter mode for Ace editor
 * Extends the markdown highlighter rules with some extra rules
 * to mark the extra syntax element for the vinfo text inheritance
 * behaviour
 *
 * @author Jan van Casteren
 *
 * */
define(function (require, exports, module) {
  "use strict";

  var oop = require("../lib/oop");
// defines the parent mode
  var MarkdownMode = require("./markdown").Mode;

// defines the language specific highlighters and folding rules
  var VinfoHighlightRules = require("./vinfo_highlight_rules").VinfoHighlightRules;

  var Mode = function () {
    this.HighlightRules = VinfoHighlightRules;
  };
  oop.inherits(Mode, MarkdownMode);

  (function () {
    this.$id = "ace/mode/vinfo";
  }).call(Mode.prototype);

  exports.Mode = Mode;
});