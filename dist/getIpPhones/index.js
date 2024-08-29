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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIp = getIp;
exports.getPhone = getPhone;
const libphonenumber_js_1 = require("libphonenumber-js");
const index_1 = require("../generateAggregated/index");
const examples_1 = __importDefault(require("libphonenumber-js/mobile/examples"));
const index_2 = require("../setIpsPhones/index");
const { fullFile, sentIpsToPostman } = require('../variables/index');
function getIp(country) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, index_1.createAggregatedFile)();
        const newIp = fullFile[country]['ip'].find((item) => {
            if (sentIpsToPostman.has(item)) {
                console.log("new IP wasn't found");
            }
            else {
                return item;
            }
            ;
        });
        console.log(newIp);
        if (newIp) {
            (0, index_2.setIp)(newIp, country);
            return newIp.slice(0, newIp.indexOf('\/'));
        }
        else {
            console.log("fullFile wasn't aggregated. Some error occured");
        }
        ;
    });
}
;
function getPhone(country) {
    var _a;
    const geo = country.toUpperCase();
    let phoneNumber = (_a = (0, libphonenumber_js_1.getExampleNumber)(geo, examples_1.default)) === null || _a === void 0 ? void 0 : _a.number;
    if (!phoneNumber) {
        console.log('No example number available for this country.');
        return;
    }
    ;
    phoneNumber = phoneNumber.slice(0, phoneNumber.length - 4) + fourDigitGenerator();
    if (!(0, libphonenumber_js_1.isValidPhoneNumber)(phoneNumber, geo)) {
        console.log(`After execution fourDigitGenerator() the number became invalid`);
        return;
    }
    ;
    (0, index_2.setPhone)(phoneNumber, country);
    return phoneNumber;
}
;
function fourDigitGenerator() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}
;
//# sourceMappingURL=index.js.map