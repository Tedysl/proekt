"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.login = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = void 0;
var UserModel_1 = require("../models/UserModel");
var getUsers = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, new UserModel_1.UserModel().getUsers()];
            case 1:
                users = _a.sent();
                response.send(users);
                return [2 /*return*/];
        }
    });
}); };
exports.getUsers = getUsers;
var createUser = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var userData, userModel;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userData = request.body;
                if (!userData.username) {
                    return [2 /*return*/, response.send({
                            status: 400,
                            message: "Username has not been provided"
                        })];
                }
                if (!userData.password) {
                    return [2 /*return*/, response.send({
                            status: 400,
                            message: "Password has not been provided"
                        })];
                }
                userModel = new UserModel_1.UserModel();
                return [4 /*yield*/, userModel.createUser(userData)];
            case 1:
                _a.sent();
                response.send({
                    status: 200,
                    message: "User created successfully"
                });
                return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
var updateUser = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, updateUserData, userModel;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = Number(request.params.id);
                updateUserData = request.body;
                userModel = new UserModel_1.UserModel();
                return [4 /*yield*/, userModel.updateUser(id, updateUserData)];
            case 1:
                _a.sent();
                response.send({
                    status: 200,
                    message: "User with id ".concat(id, " was updated successfully ")
                });
                return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
var deleteUser = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, userModel;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = Number(request.params.id);
                userModel = new UserModel_1.UserModel();
                return [4 /*yield*/, userModel.deleteUser(id)];
            case 1:
                _a.sent();
                response.send({
                    status: 200,
                    message: "User with id ".concat(id, " was deleted successfully")
                });
                return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
var login = function (request, response) {
    var loginData = request.query;
    if (!loginData.username || !loginData.password) {
        return response.send({
            status: 400,
            message: "Username or Password not provided"
        });
    }
    response.send({
        status: 200,
        message: "Logged in successfully"
    });
};
exports.login = login;
