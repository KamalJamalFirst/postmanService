"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setIp = setIp;
exports.setPhone = setPhone;
const { fullFileForUsed, sentIpsToPostman, sentPhonesToPostman } = require('../variables/index');
function setIp(ip, country) {
    sentIpsToPostman.add(ip);
    console.log('set of sent IPs', sentIpsToPostman);
    fullFileForUsed[country]['ip'].push(ip);
}
;
function setPhone(phone, country) {
    sentPhonesToPostman.add(phone);
    console.log('set of sent Phones', sentPhonesToPostman);
    fullFileForUsed[country]['phoneNumber'].push(phone);
}
;
//# sourceMappingURL=index.js.map