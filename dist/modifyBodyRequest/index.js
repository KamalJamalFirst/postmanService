"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifyBodyRequest = modifyBodyRequest;
function modifyBodyRequest(oldBody, newDataforBody) {
    oldBody.formdata[newDataforBody.phone_index].value = newDataforBody.phone;
    oldBody.formdata[newDataforBody.country_index].value = newDataforBody.ip;
    return oldBody;
}
//# sourceMappingURL=index.js.map