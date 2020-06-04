"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Adapter = /*#__PURE__*/function () {
  function Adapter(url, loader) {
    _classCallCheck(this, Adapter);

    this._validateParams(url, loader);

    this.url = url;
    this.xhr = new XMLHttpRequest();
    this.uploadUrl = url;
    this.loader = loader;
  }
  /**
   * Aborts the post request
   */


  _createClass(Adapter, [{
    key: "abort",
    value: function abort() {
      if (this.xhr) {
        this.xhr.abort();
      }
    }
  }, {
    key: "_validateParams",
    value: function _validateParams(url, loader) {
      if (!loader) {
        throw new Error('Loader cannot be undefined.');
      }

      if (!url || !url.trim()) {
        throw new Error('No upload url.');
      }
    }
  }]);

  return Adapter;
}();

exports["default"] = Adapter;