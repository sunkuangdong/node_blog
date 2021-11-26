"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignIn = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _getDatabaseConnection = require("lib/getDatabaseConnection");

var _md = _interopRequireDefault(require("md5"));

var _User = require("src/entity/User");

var SignIn = /*#__PURE__*/function () {
  function SignIn() {
    (0, _classCallCheck2["default"])(this, SignIn);
    (0, _defineProperty2["default"])(this, "username", void 0);
    (0, _defineProperty2["default"])(this, "password", void 0);
    (0, _defineProperty2["default"])(this, "user", void 0);
    (0, _defineProperty2["default"])(this, "errors", {
      username: [],
      password: []
    });
  }

  (0, _createClass2["default"])(SignIn, [{
    key: "validate",
    value: function () {
      var _validate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var connection, passwordDigest;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.username.trim() === "") {
                  this.errors.username.push("用户名为空");
                }

                if (this.password.trim() === "") {
                  this.errors.password.push("密码为空");
                } // 数据库连接


                _context.next = 4;
                return (0, _getDatabaseConnection.getDatabaseConnection)();

              case 4:
                connection = _context.sent;
                _context.next = 7;
                return connection.manager.findOne(_User.User, {
                  where: {
                    username: this.username
                  }
                });

              case 7:
                this.user = _context.sent;

                if (this.user) {
                  passwordDigest = (0, _md["default"])(this.password) + (0, _md["default"])('salt');

                  if (this.user.passwordDigest !== passwordDigest) {
                    this.errors.password.push("密码错误");
                  }
                } else {
                  this.errors.username.push("用户名不存在");
                }

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function validate() {
        return _validate.apply(this, arguments);
      }

      return validate;
    }()
  }, {
    key: "hasError",
    value: function hasError() {
      return !!Object.values(this.errors).find(function (item) {
        return item.length > 0;
      });
    }
  }]);
  return SignIn;
}();

exports.SignIn = SignIn;