// config will read .env file, parse the contents,
// assign it to process.env,
//  and return an Object with a parsed key
//  containing the loaded content or an error key if it failed.

const { env } = process;
const dot = require("dotenv");
dot.config();

const config = {
  env: env.NODE_ENV || "development",
};

// development config
const devConfig = {
  db: env.MONGO_LOCAL,
  jwt_key: env.S_KEY,
};

// production config and set the password and name your database from test
const prodConfig = {
  db: env.MONGO_PROD,
  jwt_key: env.S_KEY,
};

// check which config we have currently
const currentConfig = config.env === "production" ? prodConfig : devConfig;

// export Object which consists of config and currentConfig
module.exports = Object.assign({}, config, currentConfig);
