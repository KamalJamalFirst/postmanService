const { fullFileForUsed, sentIpsToPostman, sentPhonesToPostman} = require('../variables/index');


export function setIp(ip: string, country: string): void {
    sentIpsToPostman.add(ip);
    console.log('set of sent IPs', sentIpsToPostman)
    fullFileForUsed[country]['ip'].push(ip);
};



  export function setPhone(phone: string, country: string): void {
    sentPhonesToPostman.add(phone);
    console.log('set of sent Phones', sentPhonesToPostman)
    fullFileForUsed[country]['phoneNumber'].push(phone);
};