/**
 * Vinfo highlight rules for Ace editor
 * Extends the markdown highlighter rules with some extra rules
 * to mark the extra syntax element for the vinfo text inheritance
 * behaviour
 *
 * @author Jan van Casteren
 *
 * @see https://ace.c9.io/#nav=higlighter
 *
 * */
define(function (require, exports, module) {
  "use strict";

  var oop = require("../lib/oop");
  var lang = require("../lib/lang");
  var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

  var escaped = function(ch) {
    return "(?:[^" + lang.escapeRegExp(ch) + "\\\\]|\\\\.)*";
  };

  var VinfoHighlightRules = function () {

    this.$rules = {
      "start": [
        { // h1
          token: "markup.heading.1",
          regex: "^=+(?=\\s*$)"
        }, { // h2
          token: "markup.heading.2",
          regex: "^\\-+(?=\\s*$)"
        }, {
          token: function (value) {
            return "markup.heading." + value.length;
          },
          regex: /^#{1,6}(?=\s*[^ #]|\s+#.)/,
          next: "header"
        },
        { // {1= (opening van inheritance block in orginele tekst)
          token: 'vinfo.block-open',
          //regex: "omgevingsvergunning"
          regex: "\\{\\d+="
        },
        { // =}  (sluiten van inheritance block in orginele tekst)
          token: 'vinfo.block-close',
          regex: "=\\}"
        },
        { // {2}  (oproepen van inheritance block in kopie)
          token: 'vinfo.block-insert',
          regex: "\\{=\\d+=\\}"
        },
        { // {2}  (oproepen van inheritance block in kopie)
          token: ['vinfo.variable-open', 'vinfo.variable', 'vinfo.variable-close'],
          regex: "(<=)([a-zA-Z0-9_$]*)(=>)"
        },
        { // reference
          token : ["text", "constant", "text", "url", "string", "text"],
          regex : "^([ ]{0,3}\\[)([^\\]]+)(\\]:\\s*)([^ ]+)(\\s*(?:[\"][^\"]+[\"])?(\\s*))$"
        }, { // link by reference
          token : ["text", "string", "text", "constant", "text"],
          regex : "(\\[)(" + escaped("]") + ")(\\]\s*\\[)("+ escaped("]") + ")(\\])"
        }, { // link by url
          token : ["text", "string", "text", "markup.underline", "string", "text"],
          regex : "(\\[)(" +                                        // [
          escaped("]") +                                    // link text
          ")(\\]\\()"+                                      // ](
          '((?:[^\\)\\s\\\\]|\\\\.|\\s(?=[^"]))*)' +        // href
          '(\\s*"' +  escaped('"') + '"\\s*)?' +            // "title"
          "(\\))"                                           // )
        }, { // strong ** __
          token : "string.strong",
          regex : "([*]{2}|[_]{2}(?=\\S))(.*?\\S[*_]*)(\\1)"
        }, { // emphasis * _
          token : "string.emphasis",
          regex : "([*]|[_](?=\\S))(.*?\\S[*_]*)(\\1)"
        }

      ]
    };

  };

  oop.inherits(VinfoHighlightRules, TextHighlightRules);

  exports.VinfoHighlightRules = VinfoHighlightRules;

});