"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const _ = __importStar(require("lodash"));
const client_ssm_1 = require("@aws-sdk/client-ssm");
/**
 * @access public
 * @abstract for create ssmclient from aws
 * @param {*} config REGION
 * @returns
 */
const createClient = (config) => new client_ssm_1.SSMClient(config);
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
        const command = new client_ssm_1.GetParametersCommand({
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
exports.default = { getParameters, createClient };
