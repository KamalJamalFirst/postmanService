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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const data_source_1 = require("./data-source");
const index_1 = require("./responseToPostman/index");
const index_2 = require("./variables/index");
const index_3 = require("./bodyValidation/index");
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const ngrok_1 = __importDefault(require("@ngrok/ngrok"));
const app = (0, express_1.default)();
const port = 3000;
const { countries } = index_2.variables;
const jsonBodyParser = body_parser_1.default.json();
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield data_source_1.AppDataSource.initialize()
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Data Source has been initialized!");
        //await generateAggregated();
        (function main() {
            return __awaiter(this, void 0, void 0, function* () {
                //await createAggregatedFile();
                app.post(`/catchData`, jsonBodyParser, (req, res) => __awaiter(this, void 0, void 0, function* () {
                    console.log(req.body);
                    const validatedBody = (0, index_3.bodyValidation)(req.body);
                    if (!Array.isArray(validatedBody)) {
                        console.log(req.body);
                        console.log('we passed request body validation');
                        const newResBody = yield (0, index_1.responseToPostman)(validatedBody);
                        //const newBody: bodyRequest = modifyBodyRequest(req, data);
                        res.send(newResBody);
                    }
                    else {
                        console.log(...validatedBody);
                        res.status(400).send(...validatedBody);
                    }
                    // console.log(countries.includes((req.query.country_code).toUpperCase()))
                    // if (countries.includes((req.query.country_code).toLowerCase())) {
                    // console.log('we started');
                    // const data = await responseToPostman(req);
                    // res.send(data);
                    // } else {
                    //     res.status(406).send(`Country code ${req.query.country_code} wasn't found. Please use correct country code`);
                    // };
                }));
                app.listen(port, () => {
                    (function () {
                        return __awaiter(this, void 0, void 0, function* () {
                            const listener = yield ngrok_1.default.forward({
                                addr: port,
                                authtoken_from_env: true,
                            });
                            console.log(`Ingress established at: ${listener.url()}`);
                        });
                    })();
                });
                // setInterval(writeToUsedFile, (1000 * 60 * 60));
            });
        })();
    }))
        .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });
});
startApp();
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
//# sourceMappingURL=auto_tests.js.map