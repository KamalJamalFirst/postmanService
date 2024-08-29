import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { objWithObj, Aggregated } from '../interfaces/index'
import { variables } from '../variables/index';

const { countries,
    fullFile,
    fullFileForUsed 
} = variables;


export async function createAggregatedFile(): Promise<objWithObj> {
    //const setAggregatedFiles: ObjWithObj = {};
    
    const preAggregated = countries.map(async (elem: string): Promise<Aggregated> => {
        const filePathAggregated: string = resolve(`./country/${elem}/aggregated.json`);
        console.log(filePathAggregated);
        try {
            return readFile(filePathAggregated, 'utf8').then(data => JSON.parse(data));
        } catch (error) {
            console.log('something went wrong');
            throw error;
        };
    });
    const setAggregatedFiles = await Promise.all(preAggregated);
    setAggregatedFiles.forEach(elem => {
        fullFile[elem['country-code']] = {ip: elem.subnets.ipv4, phoneNumber: []};
        fullFileForUsed[elem['country-code']] = {ip: [], phoneNumber: []};
    });
    return fullFile;
};