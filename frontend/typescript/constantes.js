"use strict";
exports.__esModule = true;
exports.LOGOUT_URL = exports.LOGIN_URL = exports.IS_LOGGED_IN_URL = exports.backendAddress = void 0;
exports.backendAddress = 'http://127.0.0.1:8000/';
exports.IS_LOGGED_IN_URL = "".concat(exports.backendAddress, "/auth/estalogado/");
exports.LOGIN_URL = "".concat(exports.backendAddress, "/auth/login/");
exports.LOGOUT_URL = "".concat(exports.backendAddress, "/auth/logout/");
