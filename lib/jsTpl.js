"use strict";
/*
 * @Author: wellen zhong
 * @Date: 2022-02-09 14:02:29
 * @LastEditors: wellen zhong
 * @LastEditTime: 2022-02-09 14:28:34
 * @Description: file content
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (params) => {
    return `
    ;(function(window) {
      var svgSprite = \`${params.svgStr}\`
    var script = (function () {
      var scripts = document.getElementsByTagName("script");
      return scripts[scripts.length - 1];
    })();
    var shouldInjectCss = script.getAttribute("data-injectcss");
    var ready = function (fn) {
      if (document.addEventListener) {
        if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
          setTimeout(fn, 0);
        } else {
          var loadFn = function () {
            document.removeEventListener("DOMContentLoaded", loadFn, false);
            fn();
          };
          document.addEventListener("DOMContentLoaded", loadFn, false);
        }
      } else if (document.attachEvent) {
        IEContentLoaded(window, fn);
      }
      function IEContentLoaded(w, fn) {
        var d = w.document,
          done = false,
          init = function () {
            if (!done) {
              done = true;
              fn();
            }
          };
        var polling = function () {
          try {
            d.documentElement.doScroll("left");
          } catch (e) {
            setTimeout(polling, 50);
            return;
          }
          init();
        };
        polling();
        d.onreadystatechange = function () {
          if (d.readyState == "complete") {
            d.onreadystatechange = null;
            init();
          }
        };
      }
    };
    var before = function (el, target) {
      target.parentNode.insertBefore(el, target);
    };
    var prepend = function (el, target) {
      if (target.firstChild) {
        before(el, target.firstChild);
      } else {
        target.appendChild(el);
      }
    };
    function appendSvg() {
      var div, svg;
      div = document.createElement("div");
      div.innerHTML = svgSprite;
      svgSprite = null;
      svg = div.getElementsByTagName("svg")[0];
      if (svg) {
        svg.setAttribute("aria-hidden", "true");
        svg.style.position = "absolute";
        svg.style.width = 0;
        svg.style.height = 0;
        svg.style.overflow = "hidden";
        prepend(svg, document.body);
      }
    }
    if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
      window.__iconfont__svg__cssinject__ = true;
      try {
        document.write(
          "<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>"
        );
      } catch (e) {
        console && console.log(e);
      }
    }
    ready(appendSvg);
  })(window);  
    `;
};
