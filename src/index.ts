import * as _ from "lodash";
import {
  SSMClient,
  GetParametersCommand,
  SSMClientConfig,
} from "@aws-sdk/client-ssm";

/**
 * @access public
 * @abstract for create ssmclient from aws
 * @param {*} config REGION
 * @returns
 */
const createClient = (config: SSMClientConfig): SSMClient =>
  new SSMClient(config);

export type PrameterResult = string[] | false;

/**
 * @access public
 * @abstract get parameter from ssm from aws
 * @param {*} name Array
 * @param {*} config object for create ssmclient
 * @return {*} values
 */
const getParameters = async (
  name: string | string[],
  config: SSMClientConfig,
): Promise<PrameterResult> => {
  try {
    const names = !_.isArray(name) ? [name] : name;
    const client = createClient(config);
    const command = new GetParametersCommand({
      Names: names,
      WithDecryption: true,
    });
    const resp = await client.send(command);
    const { Parameters } = resp;
    return _.map(
      names,
      (name) => _.find(Parameters, (p) => p.Name === name)?.Value || "",
    );
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default { getParameters, createClient };
