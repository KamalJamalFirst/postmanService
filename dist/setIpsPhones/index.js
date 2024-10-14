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
exports.setIpToUsed = setIpToUsed;
exports.setUsedPhoneToDb = setUsedPhoneToDb;
const data_source_1 = require("../data-source");
const Countries_1 = require("../entities/Countries");
const Phones_1 = require("../entities/Phones");
//const { fullFileForUsed, sentIpsToPostman, sentPhonesToPostman} = require('../variables/index');
function setIpToUsed(ipAddress, country) {
    return __awaiter(this, void 0, void 0, function* () {
        const updateResult = yield data_source_1.AppDataSource
            .getRepository(Countries_1.Countries) // Specify the entity
            .createQueryBuilder('countries') // Create a query builder instance
            .update(Countries_1.Countries) // Specify the table to update
            .set({ used: true }) // Set the new value for the column Used
            .where('countries.ip = :ip', { ip: ipAddress }) // Condition to match the specific IP
            .andWhere('countries.used = :used', { used: false }) // Ensure the current value is false before updating
            .execute(); // Execute the update operation
        //sentIpsToPostman.add(ip);
        // console.log('set of sent IPs', sentIpsToPostman)
        // fullFileForUsed[country]['ip'].push(ip);
    });
}
;
function setUsedPhoneToDb(newPhoneNumber, geo) {
    return __awaiter(this, void 0, void 0, function* () {
        const phonesRepository = data_source_1.AppDataSource.getRepository(Phones_1.Phones);
        // Fetch the existing entry with the specified country_code
        const existingRaw = yield phonesRepository
            .createQueryBuilder('phones')
            .where('phones.country_code = :countryCode', { countryCode: geo })
            .getOne();
        if (existingRaw) {
            // Add the new phone number to the existing phone array
            const updatedPhones = [...existingRaw.phone, newPhoneNumber];
            // Update the entry with the new phone array
            yield phonesRepository
                .createQueryBuilder()
                .update(Phones_1.Phones)
                .set({ phone: updatedPhones })
                .where('country_code = :countryCode', { countryCode: geo })
                .execute();
            console.log(`Phone number ${newPhoneNumber} added successfully to existing country code ${geo}.`);
        }
        else {
            // If no entry exists, create a new row with the specified country code and phone number
            yield phonesRepository
                .createQueryBuilder()
                .insert()
                .into(Phones_1.Phones)
                .values({
                country_code: geo,
                phone: [newPhoneNumber], // New phone number as an array
            })
                .execute();
            console.log(`New row added with country code ${geo} and phone number ${newPhoneNumber}.`);
        }
    });
}
;
// Call the function to add a new phone number
// sentPhonesToPostman.add(phone);
// console.log('set of sent Phones', sentPhonesToPostman)
// fullFileForUsed[country]['phoneNumber'].push(phone);
//# sourceMappingURL=index.js.map