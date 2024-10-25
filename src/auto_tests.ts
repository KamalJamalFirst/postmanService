
import "reflect-metadata"
import { AppDataSource } from "./data-source"
import { generateAggregated } from './generateAggregated/index'
import { responseToPostman } from './responseToPostman/index'
import { writeToUsedFile } from './saveDataToFile/index'
import { variables } from './variables/index'
import { bodyValidation } from "./bodyValidation/index"
//import { bodyRequest } from './interfaces/index'
import bodyParser from 'body-parser'
import express from 'express'
import ngrok from "@ngrok/ngrok"
//import { modifyBodyRequest } from "./modifyBodyRequest"

const app = express();
const port = 3000;
const { countries } = variables;
const jsonBodyParser = bodyParser.json();



const startApp = async () => {
    await AppDataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!");
        
        (async function main() {
            
            app.post(`/catchData`, jsonBodyParser, async (req: any, res: any) => {
                console.log(req.body);
                console.log(req.headers);
                const validatedBody = bodyValidation(req.body);
                if (!Array.isArray(validatedBody)) {
                    console.log('we passed request body validation');
                    const newResBody = await responseToPostman(validatedBody);


                    const url = req.body.url;
                    const myHeaders = new Headers();
                    myHeaders.append('Authorization', req.headers.authorization);
                    myHeaders.append('Content-Type', 'application/json');
                    myHeaders.append('Accept', 'application/json');

                    
                    const reqToCRM = async () => {
                        return fetch(url, {
                            method: 'POST',
                            headers: myHeaders,
                            body: JSON.stringify(newResBody)
                        })
                        .then(async (response) => {
                            const resStat = response.status;
                            const fullResponse = await response.json();
                            console.log(fullResponse)
                            if ([200, 201].includes(resStat)) {
                                console.log('должны отдать успех')
                                return ({
                                    status: fullResponse.code,
                                    response: fullResponse,
                                    email: await newResBody.email,
                                    click_toGOto_lead: `${url}/en/app/new-traffic-data/leads/${fullResponse.lead_uuid}`,
                                    success: true
                                })
                            }
                            return ({
                                status: fullResponse.code,
                                response: fullResponse,
                                email: await newResBody.email,
                                click_toGOto_lead: `${url}/en/app/new-traffic-data/leads/${fullResponse.lead_uuid}`,
                                success: false
                            })
                        })
                    }
                    const responseToPostmano = await reqToCRM();
                    if (responseToPostmano.success) {
                        res.send(responseToPostmano)
                        return
                    }
                    res.status(400).send(responseToPostmano)

                } else {
                    console.log(...validatedBody)
                    res.status(400).json(...validatedBody);
                }
            });
            app.listen(port, () => {
                (async function () {
                    const listener = await ngrok.forward({
                        addr: port,
                        authtoken_from_env: true
                    });
                    console.log(`Ingress established at: ${listener.url()}`);
                })();
            });
        })();
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });
};

startApp();