import { SSMClient, SSMClientConfig } from "@aws-sdk/client-ssm";
export type PrameterResult = string[] | false;
declare const _default: {
    getParameters: (name: string | string[], config: SSMClientConfig) => Promise<PrameterResult>;
    createClient: (config: SSMClientConfig) => SSMClient;
};
export default _default;
//# sourceMappingURL=index.d.ts.map