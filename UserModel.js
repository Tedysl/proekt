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
exports.UserModel = void 0;
var fs_1 = require("fs");
var mysql = require('mysql2');
var UserModel = /** @class */ (function () {
    function UserModel() {
        // create the pool
        var pool = mysql.createPool({ host: 'localhost', user: 'root', database: 'smartphones' });
        // now get a Promise wrapped instance of that pool
        this.conn = pool.promise();
    }
    UserModel.prototype.getNewId = function (users) {
        return users[users.length - 1].id + 1;
    };
    UserModel.prototype.getUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs_1.promises.readFile(__dirname + "/db.json", "utf-8")];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, JSON.parse(data)];
                }
            });
        });
    };
    UserModel.prototype.createUser = function (userDataInput) {
        return __awaiter(this, void 0, void 0, function () {
            var insertDataObject;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        insertDataObject = [
                            userDataInput.username,
                            userDataInput.password,
                            (userDataInput.first_name) ? userDataInput.first_name : null,
                            (userDataInput.last_name) ? userDataInput.last_name : null,
                            (userDataInput.email) ? userDataInput.email : null
                        ];
                        return [4 /*yield*/, this.conn.execute("INSERT INTO 'users'(username,password,first_name,last_name,email)" +
                                "VALUES(?,?,?,?,?),", insertDataObject)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    UserModel.prototype.updateUser = function (id, updateUserData) {
        return __awaiter(this, void 0, void 0, function () {
            var updateUserDataArray, setStatement, preparedStatementData, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updateUserDataArray = Object.entries(updateUserData);
                        setStatement = "";
                        preparedStatementData = [];
                        for (i = 0; i < updateUserDataArray.length; i++) {
                            setStatement += "".concat(updateUserDataArray[i][0], "= ?");
                            setStatement += (i + 1 !== updateUserDataArray.length) ? "," : " ";
                            preparedStatementData.push(updateUserDataArray[i][0]);
                        }
                        preparedStatementData.push(id);
                        return [4 /*yield*/, this.conn.execute("UPDATE \"users\" SET ".concat(setStatement, " WHERE id =? "), preparedStatementData)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    UserModel.prototype.deleteUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.conn.execute("DELETE FROM 'users' WHERE id = ?", [id])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    return UserModel;
}());
exports.UserModel = UserModel;
