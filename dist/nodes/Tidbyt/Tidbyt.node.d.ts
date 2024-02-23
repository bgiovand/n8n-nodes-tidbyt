import { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription, JsonObject } from 'n8n-workflow';
export declare class Tidbyt implements INodeType {
    description: INodeTypeDescription;
    static formatDevice(device: JsonObject): JsonObject;
    static renderPixletCode(fns: IExecuteFunctions, item: INodeExecutionData, itemIndex: number): Promise<INodeExecutionData[]>;
    static pushToDevice(fns: IExecuteFunctions, item: INodeExecutionData, itemIndex: number): Promise<INodeExecutionData[]>;
    static getDeviceDetails(fns: IExecuteFunctions): Promise<INodeExecutionData[]>;
    static updateDeviceDetails(fns: IExecuteFunctions, item: INodeExecutionData): Promise<INodeExecutionData[]>;
    static listInstallations(fns: IExecuteFunctions): Promise<INodeExecutionData[]>;
    static deleteInstallation(fns: IExecuteFunctions, item: INodeExecutionData, itemIndex: number): Promise<INodeExecutionData[]>;
    static getAvailableApps(fns: IExecuteFunctions): Promise<INodeExecutionData[]>;
    execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]>;
}
