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
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseToPostman = void 0;
const index_1 = require("../getIpPhones/index");
const responseToPostman = (req) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req['query'].country_code);
    const data = {
        phone: (0, index_1.getPhone)(req['query'].country_code),
        ip: yield (0, index_1.getIp)(req['query'].country_code)
    };
    return data;
});
exports.responseToPostman = responseToPostman;
//# sourceMappingURL=index.js.map