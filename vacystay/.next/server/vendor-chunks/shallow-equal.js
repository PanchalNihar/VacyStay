"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/shallow-equal";
exports.ids = ["vendor-chunks/shallow-equal"];
exports.modules = {

/***/ "(ssr)/./node_modules/shallow-equal/dist/index.esm.js":
/*!******************************************************!*\
  !*** ./node_modules/shallow-equal/dist/index.esm.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   shallowEqualArrays: () => (/* binding */ shallowEqualArrays),\n/* harmony export */   shallowEqualObjects: () => (/* binding */ shallowEqualObjects)\n/* harmony export */ });\nfunction shallowEqualObjects(objA, objB) {\n  if (objA === objB) {\n    return true;\n  }\n\n  if (!objA || !objB) {\n    return false;\n  }\n\n  var aKeys = Object.keys(objA);\n  var bKeys = Object.keys(objB);\n  var len = aKeys.length;\n\n  if (bKeys.length !== len) {\n    return false;\n  }\n\n  for (var i = 0; i < len; i++) {\n    var key = aKeys[i];\n\n    if (objA[key] !== objB[key] || !Object.prototype.hasOwnProperty.call(objB, key)) {\n      return false;\n    }\n  }\n\n  return true;\n}\n\nfunction shallowEqualArrays(arrA, arrB) {\n  if (arrA === arrB) {\n    return true;\n  }\n\n  if (!arrA || !arrB) {\n    return false;\n  }\n\n  var len = arrA.length;\n\n  if (arrB.length !== len) {\n    return false;\n  }\n\n  for (var i = 0; i < len; i++) {\n    if (arrA[i] !== arrB[i]) {\n      return false;\n    }\n  }\n\n  return true;\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc2hhbGxvdy1lcXVhbC9kaXN0L2luZGV4LmVzbS5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixTQUFTO0FBQzNCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsU0FBUztBQUMzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVtRCIsInNvdXJjZXMiOlsid2VicGFjazovL2FpcmJuYi8uL25vZGVfbW9kdWxlcy9zaGFsbG93LWVxdWFsL2Rpc3QvaW5kZXguZXNtLmpzPzYwN2QiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gc2hhbGxvd0VxdWFsT2JqZWN0cyhvYmpBLCBvYmpCKSB7XG4gIGlmIChvYmpBID09PSBvYmpCKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAoIW9iakEgfHwgIW9iakIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgYUtleXMgPSBPYmplY3Qua2V5cyhvYmpBKTtcbiAgdmFyIGJLZXlzID0gT2JqZWN0LmtleXMob2JqQik7XG4gIHZhciBsZW4gPSBhS2V5cy5sZW5ndGg7XG5cbiAgaWYgKGJLZXlzLmxlbmd0aCAhPT0gbGVuKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIHZhciBrZXkgPSBhS2V5c1tpXTtcblxuICAgIGlmIChvYmpBW2tleV0gIT09IG9iakJba2V5XSB8fCAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iakIsIGtleSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gc2hhbGxvd0VxdWFsQXJyYXlzKGFyckEsIGFyckIpIHtcbiAgaWYgKGFyckEgPT09IGFyckIpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlmICghYXJyQSB8fCAhYXJyQikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBsZW4gPSBhcnJBLmxlbmd0aDtcblxuICBpZiAoYXJyQi5sZW5ndGggIT09IGxlbikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoYXJyQVtpXSAhPT0gYXJyQltpXSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgeyBzaGFsbG93RXF1YWxBcnJheXMsIHNoYWxsb3dFcXVhbE9iamVjdHMgfTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/shallow-equal/dist/index.esm.js\n");

/***/ })

};
;