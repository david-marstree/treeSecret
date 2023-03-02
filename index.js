const _ = require('lodash');
const { SSMClient, GetParametersCommand } = require('@aws-sdk/client-ssm');


/**
 * @access private
 * @abstract for create ssmclient from aws
 * @param {*} config REGION
 * @returns 
 */
const _createClient = (config) => (new SSMClient(config));


/**
 * @access public
 * @abstract get parameter from ssm from aws
 * @param {*} name Array
 * @param {*} config object for create ssmclient
 * @return {*} values 
 */
exports.getParameters = async (name, config) => {
    try {
        const names = !_.isArray(name) ? [name] : name;
        const client = _createClient(config);
        const command = new GetParametersCommand({
            Names: names,
            WithDecryption: true
        });
        const resp = await client.send(command);
        const { Parameters } = resp;
        return _.map(names, (name) => _.find(Parameters, (p) => p.Name === name)?.Value || '')
    } catch (error) {
        console.log(error);
        return false;
    }
}