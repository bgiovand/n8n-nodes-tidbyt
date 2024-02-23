"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tidbyt = void 0;
class Tidbyt {
    constructor() {
        this.name = 'tidbyt';
        this.displayName = 'Tidbyt API';
        this.documentationUrl = 'tidbyt';
        this.properties = [
            {
                displayName: 'Device ID',
                name: 'deviceId',
                type: 'string',
                default: '',
                required: true,
                description: 'Device ID available under the Get API key button on the General tab in the mobile app',
            },
            {
                displayName: 'Key',
                name: 'apiKey',
                type: 'string',
                default: '',
                required: true,
                description: 'API Key ID available under the Get API key button on the General tab in the mobile app',
            },
        ];
    }
}
exports.Tidbyt = Tidbyt;
//# sourceMappingURL=Tidbyt.credentials.js.map