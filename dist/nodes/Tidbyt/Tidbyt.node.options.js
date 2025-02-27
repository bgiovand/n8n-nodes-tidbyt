"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeDescription = void 0;
exports.nodeDescription = {
    displayName: 'Tidbyt',
    name: 'tidbyt',
    group: ['input'],
    version: 1,
    description: 'Interact with your Tidbyt devices and Pixlet-based apps',
    defaults: {
        name: 'Tidbyt',
        color: '#78DECC',
    },
    icon: 'file:tidbyt.png',
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
        {
            name: 'tidbyt',
            required: true,
        },
    ],
    properties: [
        {
            displayName: 'Operation',
            name: 'operation',
            type: 'options',
            options: [
                {
                    name: 'List Available Apps',
                    value: 'listAvailableApps',
                },
                {
                    name: 'List Installations',
                    value: 'listInstallations',
                },
                {
                    name: 'Delete Installation',
                    value: 'deleteInstallation',
                },
                {
                    name: 'Get Device Details',
                    value: 'getDeviceDetails',
                },
                {
                    name: 'Update Device Details',
                    value: 'updateDeviceDetails',
                },
                {
                    name: 'Push to device',
                    value: 'push',
                },
                {
                    name: 'Render Pixlet code',
                    value: 'render',
                },
            ],
            default: 'push',
        },
        {
            displayName: 'Installation ID',
            name: 'installationId',
            type: 'string',
            required: true,
            default: '',
            description: 'The ID of the installation to delete.',
            displayOptions: {
                show: {
                    operation: [
                        'deleteInstallation',
                    ],
                },
            },
        },
        {
            displayName: 'Pixlet Code',
            name: 'pixletCode',
            typeOptions: {
                alwaysOpenEditWindow: true,
                rows: 10,
            },
            type: 'string',
            default: ``,
            description: 'The JavaScript code to execute for each item',
            noDataExpression: true,
            displayOptions: {
                show: {
                    operation: [
                        'render',
                    ],
                },
            },
        },
        {
            displayName: 'Property Name',
            name: 'dataPropertyName',
            type: 'string',
            required: true,
            default: 'data',
            description: 'Name of the binary property in which to store the rendered image data.',
            displayOptions: {
                show: {
                    operation: [
                        'render',
                        'push',
                    ],
                },
            },
        },
        {
            displayName: 'Config',
            name: 'config',
            placeholder: 'Add Field',
            type: 'fixedCollection',
            typeOptions: {
                multipleValues: true,
            },
            description: 'The configuration to send.',
            default: {},
            displayOptions: {
                show: {
                    operation: [
                        'render',
                    ],
                },
            },
            options: [
                {
                    name: 'field',
                    displayName: 'Field',
                    values: [
                        {
                            displayName: 'Name',
                            name: 'name',
                            type: 'string',
                            default: '',
                            description: 'Name of the field.',
                        },
                        {
                            displayName: 'Value',
                            name: 'value',
                            type: 'string',
                            default: '',
                            description: 'Value of the field.',
                        },
                    ],
                },
            ],
        },
        {
            displayName: 'Options',
            name: 'options',
            type: 'collection',
            default: {},
            placeholder: 'Add options',
            description: 'Add options',
            displayOptions: {
                show: {
                    operation: [
                        'push',
                    ],
                },
            },
            options: [
                {
                    displayName: 'Installation ID',
                    name: 'installationId',
                    type: 'string',
                    description: 'ID of installation to target.',
                    default: '',
                    required: false,
                },
                {
                    displayName: 'Background',
                    name: 'background',
                    type: 'boolean',
                    default: false,
                    description: 'Whether to push the image in the background instead of showing it immediately. The default is false.',
                },
            ],
        },
    ],
};
//# sourceMappingURL=Tidbyt.node.options.js.map