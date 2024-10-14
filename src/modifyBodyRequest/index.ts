import { bodyRequest, newDataForResponse } from '../interfaces/index'


export function modifyBodyRequest(oldBody: bodyRequest, newDataforBody: newDataForResponse) {
    oldBody.formdata[newDataforBody.phone_index].value = newDataforBody.phone!;
    oldBody.formdata[newDataforBody.country_index].value = newDataforBody.ip!;
    return oldBody;
}