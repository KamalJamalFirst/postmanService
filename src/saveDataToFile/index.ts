import { writeFile, open } from 'fs/promises';

const { filePathToUsed, fullFileForUsed } = require('../variables/index');

export async function writeToUsedFile(): Promise<void> {
    console.log("flushing from fullFileForUsed to used.json")
    await writeFile(filePathToUsed, JSON.stringify(fullFileForUsed, null, 2), 'utf8')
        .then(async data => {
            console.log(JSON.parse(data as any));
            const fileHandle = await open(filePathToUsed, 'w')
            await fileHandle.sync();
            await fileHandle.close();
        })
        .catch(err => new Error('actual state flushing was crushed. Please match actuality of the run-time state and on the server'));
};