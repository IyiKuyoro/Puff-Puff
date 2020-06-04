"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CloudinaryUnsigned = void 0;

var _Adapter2 = _interopRequireDefault(require("./Adapter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var CloudinaryUnsigned = /*#__PURE__*/function (_Adapter) {
  _inherits(CloudinaryUnsigned, _Adapter);

  var _super = _createSuper(CloudinaryUnsigned);

  /**
   * Create a Cloudinary unsigned image upload adapter
   * @param  {any} loader Object used in loading the image
   * @param  {string} cloudName Cloudinary cloud name
   * @param  {string} unsignedUploadPreset Cloudinary unsigned upload preset
   * @param  {number[]} sizes List of pixel sizes
   */
  function CloudinaryUnsigned(loader, cloudName, unsignedUploadPreset) {
    var _this;

    var sizes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

    _classCallCheck(this, CloudinaryUnsigned);

    var url = "https://api.cloudinary.com/v1_1/".concat(cloudName, "/upload");
    _this = _super.call(this, url, loader);

    _this._validateCloudinaryParams(cloudName, unsignedUploadPreset, sizes);

    _this.cloudName = cloudName;
    _this.unsignedUploadPreset = unsignedUploadPreset;

    if (sizes.length > 0) {
      _this.sizes = sizes;
    }

    return _this;
  }

  _createClass(CloudinaryUnsigned, [{
    key: "upload",
    value: function upload() {
      var _this2 = this;

      return this.loader.file.then(function (file) {
        return new Promise(function (resolve, reject) {
          var fd = new FormData();

          _this2.xhr.open('POST', _this2.url, true);

          _this2.xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); // Hookup an event listener to update the upload progress bar


          _this2.xhr.upload.addEventListener('progress', function (e) {
            _this2.loader.uploadTotal = 100;
            _this2.loader.uploaded = Math.round(e.loaded * 100 / e.total);
          }); // Hookup a listener to listen for when the request state changes


          _this2.xhr.onreadystatechange = function () {
            if (_this2.xhr.readyState === 4 && _this2.xhr.status === 200) {
              // Successful upload, resolve the promise with the new image
              var response = JSON.parse(_this2.xhr.responseText);
              var images;

              if (_this2.sizes) {
                images = _objectSpread({
                  "default": response.secure_url
                }, _this2._getImageSizes(response.secure_url));
              } else {
                images = {
                  "default": response.secure_url
                };
              }

              resolve(images);
            } else if (_this2.xhr.status !== 200) {
              // Unsuccessful request, reject the promise
              reject('Upload failed');
            }
          }; // Setup the form data to be sent in the request


          fd.append('upload_preset', _this2.unsignedUploadPreset);
          fd.append('tags', 'browser_upload');
          fd.append('file', file);

          _this2.xhr.send(fd);
        });
      });
    }
  }, {
    key: "_getImageSizes",
    value: function _getImageSizes(defaultImageUrl) {
      var imageObject = {}; // Split url in two

      var splitUrl = this._splitUrl(defaultImageUrl);

      if (this.sizes) {
        var len = this.sizes.length;
        this.sizes.forEach(function (size, index) {
          if (index !== len - 1) {
            imageObject[size.toString()] = "".concat(splitUrl.firstHalf, "w_").concat(size, "%2Cc_scale").concat(splitUrl.secondHalf);
          } else {
            imageObject[size.toString()] = defaultImageUrl;
          }
        });
      }

      return imageObject;
    }
  }, {
    key: "_splitUrl",
    value: function _splitUrl(url) {
      // This function splits the image url in two.
      var firstHalfLength = 41 + this.cloudName.length;
      var firstHalf = url.substr(0, firstHalfLength);
      var secondHalf = url.substr(firstHalfLength - 1, url.length - firstHalfLength + 1);
      return {
        firstHalf: firstHalf,
        secondHalf: secondHalf
      };
    }
  }, {
    key: "_validateCloudinaryParams",
    value: function _validateCloudinaryParams(cloudName, unsignedUploadPreset, size) {
      if (!cloudName || !cloudName.trim()) {
        throw new Error('No cloud name provided');
      }

      if (!unsignedUploadPreset || !unsignedUploadPreset.trim()) {
        throw new Error('No unsigned upload preset provided');
      }

      size.forEach(function (s) {
        if (typeof s !== 'number' || isNaN(+s)) {
          throw new Error('Sizes must be of type numbers');
        }
      });
    }
  }]);

  return CloudinaryUnsigned;
}(_Adapter2["default"]);

exports.CloudinaryUnsigned = CloudinaryUnsigned;