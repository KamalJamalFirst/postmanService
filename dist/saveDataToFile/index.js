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
exports.writeToUsedFile = writeToUsedFile;
const promises_1 = require("fs/promises");
const { filePathToUsed, fullFileForUsed } = require('../variables/index');
function writeToUsedFile() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("flushing from fullFileForUsed to used.json");
        yield (0, promises_1.writeFile)(filePathToUsed, JSON.stringify(fullFileForUsed, null, 2), 'utf8')
            .then((data) => __awaiter(this, void 0, void 0, function* () {
            console.log(JSON.parse(data));
            const fileHandle = yield (0, promises_1.open)(filePathToUsed, 'w');
            yield fileHandle.sync();
            yield fileHandle.close();
        }))
            .catch(err => new Error('actual state flushing was crushed. Please match actuality of the run-time state and on the server'));
    });
}
;
//# sourceMappingURL=index.js.map