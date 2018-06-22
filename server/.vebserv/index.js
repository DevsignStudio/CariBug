require = require("esm")(module, {
    "cjs": {
        "cache": true,
        "extensions": false,
        "interop": true,
        "namedExports": true,
        "paths": true,
        "vars": true
    }
})
// console.log(__dirname)
require('module-alias/register');
module.exports = require("../index")