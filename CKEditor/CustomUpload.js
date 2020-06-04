"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomUpload = void 0;

var _Adapter2 = _interopRequireDefault(require("./Adapter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var CustomUpload = /*#__PURE__*/function (_Adapter) {
  _inherits(CustomUpload, _Adapter);

  var _super = _createSuper(CustomUpload);

  /**
   * Create a Cloudinary unsigned image upload adapter
   * @param  {string} url The upload url
   * @param  {any} loader Object used in loading the image
   * @param  {any} requestHeader Any headers you may wish to include in the request
   */
  function CustomUpload(url, loader) {
    var _this;

    var requestHeader = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, CustomUpload);

    _this = _super.call(this, url, loader);
    _this.headers = requestHeader;
    return _this;
  }

  _createClass(CustomUpload, [{
    key: "_setHeader",
    value: function _setHeader() {
      var _this2 = this;

      var keys = Object.keys(this.headers);
      keys.forEach(function (key) {
        _this2.xhr.setRequestHeader(key, _this2.headers[key]);
      });
    }
  }, {
    key: "upload",
    value: function upload() {
      var _this3 = this;

      return this.loader.file.then(function (file) {
        return new Promise(function (resolve, reject) {
          var fd = new FormData();

          _this3.xhr.open('POST', _this3.url, true);

          _this3._setHeader(); // Hookup an event listener to update the upload progress bar


          _this3.xhr.upload.addEventListener('progress', function (e) {
            _this3.loader.uploadTotal = 100;
            _this3.loader.uploaded = Math.round(e.loaded * 100 / e.total);
          }); // Hookup a listener to listen for when the request state changes


          _this3.xhr.onreadystatechange = function () {
            if (_this3.xhr.readyState === 4 && _this3.xhr.status === 201) {
              // Successful upload, resolve the promise with the new image
              var response = JSON.parse(_this3.xhr.responseText);
              var images = {
                "default": response.image_url
              };
              resolve(images);
            } else if (_this3.xhr.status !== 201) {
              // Unsuccessful request, reject the promise
              reject('Upload failed');
            }
          }; // Setup the form data to be sent in the request


          fd.append('image', file);

          _this3.xhr.send(fd);
        });
      });
    }
  }]);

  return CustomUpload;
}(_Adapter2["default"]);

exports.CustomUpload = CustomUpload;