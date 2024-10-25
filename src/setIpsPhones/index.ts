import { AppDataSource } from "../data-source"
import { Countries } from '../entities/Countries';
import { Phones } from '../entities/Phones';


export async function setIpToUsed(ipAddress: string, geo: string): Promise<void> {
  const updateResult = await AppDataSource
  .getRepository(Countries) // Specify the entity
  .createQueryBuilder('countries') // Create a query builder instance
  .update(Countries) // Specify the table to update
  .set({ used: true }) // Set the new value for the column Used
  .where('countries.ip = :ip', { ip: ipAddress }) // Condition to match the specific IP
  .andWhere('countries.used = :used', { used: false }) // Ensure the current value is false before updating country_code
  .andWhere('countries.country_code = :country_code', { country_code: geo })
  .execute(); // Execute the update operation
};



export async function setUsedPhoneToDb(newPhoneNumber: string, geo: string): Promise<void> {
  const phonesRepository = AppDataSource.getRepository(Phones);

  // Fetch the existing entry with the specified country_code
  const existingRaw = await phonesRepository
    .createQueryBuilder('phones')
    .where('phones.country_code = :countryCode', { countryCode: geo })
    .getOne();

  if (existingRaw) {
    // Add the new phone number to the existing phone array
    const updatedPhones = [...existingRaw.phone, newPhoneNumber];

    // Update the entry with the new phone array
    await phonesRepository
      .createQueryBuilder()
      .update(Phones)
      .set({ phone: updatedPhones })
      .where('country_code = :countryCode', { countryCode: geo })
      .execute();

    console.log(`Phone number ${newPhoneNumber} added successfully to existing country code ${geo}.`);
  } else {
    // If no entry exists, create a new row with the specified country code and phone number
    await phonesRepository
      .createQueryBuilder()
      .insert()
      .into(Phones)
      .values({
        country_code: geo,
        phone: [newPhoneNumber], // New phone number as an array
      })
      .execute();

    console.log(`New row added with country code ${geo} and phone number ${newPhoneNumber}.`);
  }
};

