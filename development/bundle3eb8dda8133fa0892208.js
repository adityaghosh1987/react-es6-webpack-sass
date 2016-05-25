webpackJsonp([0,1,2],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _component = __webpack_require__(2);

	var _component2 = _interopRequireDefault(_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	document.body.appendChild((0, _component2.default)());

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = component;
	function component() {
	  var header = document.createElement('h1');
	  header.innerHTML = 'Hello World';
	  return header;
	}

/***/ }
]);