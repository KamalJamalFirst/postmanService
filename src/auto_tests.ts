
import { createAggregatedFile } from './generateAggregated/index'
import { responseToPostman } from './responseToPostman/index'
import { writeToUsedFile } from './saveDataToFile/index'
import { variables } from './variables/index';

const express = require('express');
const ngrok = require("@ngrok/ngrok")
const app = express();
const port = 3000;
const { countries } = variables;


(async function main() {
    await createAggregatedFile();
    app.get(`/getData`, async (req: any, res: any) => {
        console.log(req);
        console.log(countries.includes((req.query.country_code).toUpperCase()))
        if (countries.includes((req.query.country_code).toLowerCase())) {
            console.log('we started');
            const data = await responseToPostman(req);
            res.send(data);
        } else {
            res.status(406).send(`Country code ${req.query.country_code} wasn't found. Please use correct country code`);
        };
    });
    app.listen(port, () => {
        (async function () {
            const listener = await ngrok.forward({
                addr: 3000,
                authtoken_from_env: true,
            });
            console.log(`Ingress established at: ${listener.url()}`);
        })();
    });
    setInterval(writeToUsedFile, (1000 * 60 * 60));
})();










// function portStopListen(server: Server) {
//     setTimeout(() => {
//         console.log('Stopping the server from accepting new connections...');
    
//         server.close(() => {
//             console.log('All connections closed. Server is now shut down.');
//         });
    
//         // Set a timeout to forcefully close the server after a certain period
//         setTimeout(() => {
//             console.error('Forcing server shutdown...');
//             process.exit(1); // Force shutdown
//         }, 10000); // 10 seconds to finish existing requests
//     }, 60000);
// };








/*const available: string[] = ['1', '2', '3'];
const used: string[] = [];



function getString(): string {
    const next = available.splice(0, 1)[0];
    used.push(next);
    return next
};

getString()

работа юзер+постман:
постман отправляет запрос на сервер getIp(country)
сервер принимает запрос
отдается айпи, он же записываеися в юзд/ отдается телефон, он же записываеися в юзд
соединение закрыто

запуск сервера:
запускаем node indexe жиэс
читаем файлы агригэйтед и юзд по странам
подписываеся на событие завершение процесса
начинаем слушать порт, откуда стучится постман

выключение сервера:
закрываем порт
доделываем все запросы, пришедшие до закрытия порта
обновляем файлы
вырбуьаем нахуй

этап: сброс кэша на локалку*/

/*async function getUsedFile(path: string, country: string): Promise<usedFile | undefined> {
    try {
        let used = await readFile(path, 'utf8').then(data => JSON.parse(data)).catch(err => {throw err});
        console.log(used)
        return used as usedFile;
    } catch (error: any) {
        if (error.code == 'ENOENT') {
            await writeFile(path, JSON.stringify({ip: [], phoneNumber: []}, null, 2), 'utf8').
                catch(err => {
                    if (err) throw error;
                    getUsedFile(path, country);
                });
            let used = await readFile(path, 'utf8').then(data => JSON.parse(data));
            return used as usedFile;
        };
    };
};



(country: string): Promise<usedFile> => {
    const filePathUsed = resolve(`./country/${country}/used.json`);
    console.log(filePathUsed)
    const used = await getUsedFile(filePathUsed, country);
    return used as usedFile;
};*/



/*const readUsedFile = async (country: string): Promise<usedFile> => {
    const filePathUsed = resolve(`./country/${country}/used.json`);
    console.log(filePathUsed)
    const used = await getUsedFile(filePathUsed, country);
    return used as usedFile;
};


async function getIp(country: string): Promise<string | undefined> {
    const filePath: string = resolve(`./country/${country}/aggregated.json`);
    let aggregated: Aggregated = await readFile(filePath, 'utf8').then(data => JSON.parse(data));
    console.log(aggregated);
    const getUsed = await readUsedFile(country) as usedFile;
    console.log(getUsed);
    let newIp = aggregated.subnets.ipv4.find(item => !getUsed['ip'].includes(item));
    if (!newIp) {
        console.log('While searching unused IP the error occured');
        return;
    };
    setIp(getUsed, newIp, country);
    newIp = newIp.slice(0, newIp.indexOf('\/'))
    console.log(newIp);
    return newIp;
};


async function setIp(file: usedFile, newIp: string, country: string): Promise<void> {
    const filePathUsed = resolve(`./country/${country}/used.json`);
    file['ip'].push(newIp);
    await writeFile(filePathUsed, JSON.stringify(file, null, 2), 'utf8');
    let conclusion = await readFile(filePathUsed, 'utf8').then(data => JSON.parse(data));
    console.log(conclusion);
};




*/