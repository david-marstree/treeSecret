var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as _ from "lodash";
import { SSMClient, GetParametersCommand, } from "@aws-sdk/client-ssm";
/**
 * @access public
 * @abstract for create ssmclient from aws
 * @param {*} config REGION
 * @returns
 */
const createClient = (config) => new SSMClient(config);
/**
 * @access public
 * @abstract get parameter from ssm from aws
 * @param {*} name Array
 * @param {*} config object for create ssmclient
 * @return {*} values
 */
const getParameters = (name, config) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const names = !_.isArray(name) ? [name] : name;
        const client = createClient(config);
        const command = new GetParametersCommand({
            Names: names,
            WithDecryption: true,
        });
        const resp = yield client.send(command);
        const { Parameters } = resp;
        return _.map(names, (name) => { var _a; return ((_a = _.find(Parameters, (p) => p.Name === name)) === null || _a === void 0 ? void 0 : _a.Value) || ""; });
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
export default { getParameters, createClient };
