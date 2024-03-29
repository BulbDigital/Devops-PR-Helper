"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var vm = __importStar(require("azure-devops-node-api"));
require("dotenv").config();
function getEnv(name) {
    var val = process.env[name];
    if (!val) {
        console.error(name + " env var not set");
        process.exit(1);
        return "";
    }
    return val;
}
function getWebApi() {
    return __awaiter(this, void 0, void 0, function () {
        var serverUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    serverUrl = getEnv("API_URL");
                    return [4 /*yield*/, getApi(serverUrl)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getWebApi = getWebApi;
function getApi(serverUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var token, authHandler, option, vsts, connData, err_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                token = getEnv("API_TOKEN");
                                authHandler = vm.getPersonalAccessTokenHandler(token);
                                option = undefined;
                                vsts = new vm.WebApi(serverUrl, authHandler, option);
                                return [4 /*yield*/, vsts.connect()];
                            case 1:
                                connData = _a.sent();
                                if (connData.authenticatedUser != undefined) {
                                    console.log("Hello " + connData.authenticatedUser.providerDisplayName);
                                }
                                resolve(vsts);
                                return [3 /*break*/, 3];
                            case 2:
                                err_1 = _a.sent();
                                reject(err_1);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
exports.getApi = getApi;
function getProject() {
    return getEnv("API_PROJECT");
}
exports.getProject = getProject;
function banner(title) {
    console.log("=======================================");
    console.log("\t" + title);
    console.log("=======================================");
}
exports.banner = banner;
function heading(title) {
    console.log();
    console.log("> " + title);
}
exports.heading = heading;
banner("PR Helper");
getWebApi().then(function (res) {
    res.getGitApi().then(function (git) {
        // let criteria = new GitPullRequestSearchCriteria;
        git.getPullRequestsByProject("OSD", {}).then(function (prs) {
            console.log(prs);
            if (prs.length) {
                prs.forEach(function (pr) {
                    if (pr.reviewers && pr.reviewers.length) {
                        pr.reviewers.forEach(function (r) {
                            console.log(r);
                        });
                    }
                });
            }
        });
    });
});
