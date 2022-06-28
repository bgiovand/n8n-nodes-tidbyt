# n8n-nodes-tidbyt

![n8n.io - Workflow Automation](https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-logo.png)

n8n node for interacting with your [Tidbyt](https://www.tidbyt.com) devices and [Pixlet](https://www.github.com/tidbyt/pixlet)-based applications.


> **Warning**
> This node is currently targeting Node.js v18. Network calls on prior Node versions (without fetch) don't currently work.

![](images/screenshot.png)

### Built with:

* [node-tidbyt](https://www.github.com/drudge/node-tidbyt)
* [Pixlet](https://www.github.com/tidbyt/pixlet)  
* [Go - wasm_exec.js](https://github.com/golang/go/tree/master/misc/wasm)

## How to install

To get started install the package in your n8n root directory:

`npm install n8n-nodes-tidbyt`


For Docker-based deployments, add the following line before the font installation command in your [n8n Dockerfile](https://github.com/n8n-io/n8n/blob/master/docker/images/n8n/Dockerfile):


`RUN cd /usr/local/lib/node_modules/n8n && npm install n8n-nodes-tidbyt`

## Node Reference

* **Operations**
    * List Available Apps
    * List Installations
    * Delete Installation
    * Get Device Details
    * Update Device Details
    * Push to device
    * Render Pixlet code


## License

MIT License

Copyright (c) 2022 Nicholas Penree <nick@penree.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.