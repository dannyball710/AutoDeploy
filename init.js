var readline = require('readline-promise').default;
var path = require("path");
var fs = require("fs");
const bcrypt = require('bcrypt');

const saltRounds = 12;
let configPath = path.join(__dirname, "auto-deploy.config.json");
readline = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
});;

var configs = [
    {
        key: "port",
        title: "Port:",
        error: "Error:only can input 1~65535",
        handle: async (values, value) => {
            value = parseInt(value, 10);
            if (!value) {
                return;
            }
            if (value < 1 || value > 65535) {
                return;
            }
            return value;
        }
    },
    {
        key: "access_token",
        title: "Access token:",
        error: "",
        handle: async (values, value) => {
            return value;
        }
    },
    {
        key: "password",
        title: "Password:",
        error: "Error",
        handle: async (values, value) => {
            let hash = await bcrypt.hash(value, saltRounds);
            return hash;
        }
    },
    {
        key: "",
        title: "Confirm password:",
        error: "Error:password is inconsistent",
        handle: async (values, value) => {
            if (await bcrypt.compare(value, values.password)) {
                return false;
            }
            return;
        }
    }
]

async function run() {
    let configData = {};
    for (let i = 0; i < configs.length; i++) {
        let config = configs[i];
        let v = await readline.questionAsync(config.title);
        v = await config.handle(configData, v);
        if (v === false) {
            continue;
        }
        if (!v) {
            console.log(config.error);
            i--;
            continue;
        }
        configData[config.key] = v;
    }
    console.log(configData);
    fs.writeFileSync(configPath, JSON.stringify(configData, null, 4));
    process.exit();
}

run();