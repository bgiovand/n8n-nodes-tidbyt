"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tidbyt = void 0;
const util_1 = require("util");
const n8n_workflow_1 = require("n8n-workflow");
const Tidbyt_node_options_1 = require("./Tidbyt.node.options");
const fs = require("fs");
const util_2 = require("util");
const WebP = require("node-webpmux");
const TidbytApi = require("tidbyt");
const crypto = require("crypto");
const path = require("path");
const debug = (0, util_1.debuglog)('n8n-nodes-tidbyt');
globalThis.require = require;
globalThis.fs = fs;
globalThis.TextEncoder = util_2.TextEncoder;
globalThis.TextDecoder = util_2.TextDecoder;
globalThis.performance = {
    now() {
        const [sec, nsec] = process.hrtime();
        return sec * 1000 + nsec / 1000000;
    },
};
globalThis.crypto = {
    getRandomValues(b) {
        crypto.randomFillSync(b);
    },
};
require("./wasm_exec");
const go = new global.Go();
go.env = Object.assign({ TMPDIR: require("os").tmpdir() }, process.env);
function loadPixlet(wasm) {
    return global.WebAssembly.instantiate(wasm, go.importObject).then((result) => {
        go.run(result.instance);
        return new Promise(resolve => {
            setTimeout(resolve, 2000);
        });
    });
}
async function getWebPImage(data, width = 64, height = 32) {
    const img = await WebP.Image.getEmptyImage();
    await img.initLib();
    await img.setImageData(data, {
        width,
        height,
    });
    return img;
}
async function buildFrame(img, options = {}) {
    return WebP.Image.generateFrame(Object.assign({ img }, options));
}
class Tidbyt {
    constructor() {
        this.description = Tidbyt_node_options_1.nodeDescription;
    }
    static formatDevice(device) {
        const json = {};
        Object.keys(device).forEach((key) => {
            if (device.hasOwnProperty(key) && !['tidbyt', 'installations', 'basePath'].includes(key)) {
                json[key] = device[key];
            }
        });
        return json;
    }
    static async renderPixletCode(fns, item, itemIndex) {
        const pixletCode = fns.getNodeParameter('pixletCode', itemIndex);
        const dataPropertyName = fns.getNodeParameter('dataPropertyName', itemIndex);
        const { field: configValues } = fns.getNodeParameter('config', itemIndex);
        const frames = [];
        const { frames: frameBuffers, width = 64, height = 32, delay } = await global.pixlet.render(pixletCode, configValues || []);
        for (let i = 0; i < frameBuffers.length; i++) {
            const img = await getWebPImage(frameBuffers[i], width, height);
            const frame = await buildFrame(img, {
                delay,
            });
            frames.push(frame);
        }
        const image = await WebP.Image.save(null, {
            frames,
            width,
            height,
        });
        const binaryData = await fns.helpers.prepareBinaryData(image, 'image/webp');
        return [{ json: {}, binary: { [dataPropertyName]: binaryData } }];
    }
    static async pushToDevice(fns, item, itemIndex) {
        const credentials = (await fns.getCredentials('tidbyt'));
        const tidbyt = new TidbytApi(credentials.apiKey);
        const device = await tidbyt.devices.get(credentials.deviceId);
        const options = fns.getNodeParameter('options', itemIndex);
        const dataPropertyName = fns.getNodeParameter('dataPropertyName', itemIndex);
        const data = await fns.helpers.getBinaryDataBuffer(itemIndex, dataPropertyName);
        if (data) {
            const response = await device.push(data, Object.assign(Object.assign({}, options), { installationID: options.installationId }));
            return [{ json: response }];
        }
        throw new n8n_workflow_1.NodeOperationError(fns.getNode(), `No data found for property ${dataPropertyName}`);
    }
    static async getDeviceDetails(fns) {
        const credentials = (await fns.getCredentials('tidbyt'));
        const tidbyt = new TidbytApi(credentials.apiKey);
        const device = await tidbyt.devices.get(credentials.deviceId);
        return [{ json: Tidbyt.formatDevice(device) }];
    }
    static async updateDeviceDetails(fns, item) {
        const credentials = (await fns.getCredentials('tidbyt'));
        const tidbyt = new TidbytApi(credentials.apiKey);
        const updated = await tidbyt.devices.update(credentials.deviceId, item.json);
        return [{ json: Tidbyt.formatDevice(updated) }];
    }
    static async listInstallations(fns) {
        const credentials = (await fns.getCredentials('tidbyt'));
        const tidbyt = new TidbytApi(credentials.apiKey);
        const device = await tidbyt.devices.get(credentials.deviceId);
        const apps = await device.installations.list();
        const returnData = apps.map((json) => ({ json }));
        return returnData;
    }
    static async deleteInstallation(fns, item, itemIndex) {
        const credentials = (await fns.getCredentials('tidbyt'));
        const tidbyt = new TidbytApi(credentials.apiKey);
        const device = await tidbyt.devices.get(credentials.deviceId);
        const installationId = fns.getNodeParameter('installationId', itemIndex);
        const response = await device.installations.delete(installationId);
        return [{ json: response }];
    }
    static async getAvailableApps(fns) {
        const credentials = (await fns.getCredentials('tidbyt'));
        const tidbyt = new TidbytApi(credentials.apiKey);
        const apps = await tidbyt.apps.list();
        const returnData = apps.map((json) => ({ json }));
        return returnData;
    }
    async execute() {
        const operation = this.getNodeParameter('operation', 0);
        const items = this.getInputData();
        const returnData = [];
        const pixletWasm = await fs.promises.readFile(path.join(__dirname, 'pixlet.wasm'));
        await loadPixlet(pixletWasm);
        for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
            const item = items[itemIndex];
            if (operation === 'listAvailableApps') {
                returnData.push(...await Tidbyt.getAvailableApps(this));
            }
            else if (operation === 'listInstallations') {
                returnData.push(...await Tidbyt.listInstallations(this));
            }
            else if (operation === 'deleteInstallation') {
                returnData.push(...await Tidbyt.deleteInstallation(this, item, itemIndex));
            }
            else if (operation === 'getDeviceDetails') {
                returnData.push(...await Tidbyt.getDeviceDetails(this));
            }
            else if (operation === 'updateDeviceDetails') {
                returnData.push(...await Tidbyt.updateDeviceDetails(this, item));
            }
            else if (operation === 'push') {
                returnData.push(...await Tidbyt.pushToDevice(this, item, itemIndex));
            }
            else if (operation === 'render') {
                returnData.push(...await Tidbyt.renderPixletCode(this, item, itemIndex));
            }
            else {
                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `The operation "${operation}" is not supported!`);
            }
        }
        return this.prepareOutputData(returnData);
    }
}
exports.Tidbyt = Tidbyt;
//# sourceMappingURL=Tidbyt.node.js.map