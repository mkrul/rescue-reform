"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
const validators_1 = require("envalid/dist/validators");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const environment = process.env.NODE_ENV || 'development';
dotenv_1.default.config({
    path: path_1.default.join(__dirname, `../../${environment}.env`),
});
exports.default = (0, envalid_1.cleanEnv)(process.env, {
    DB_USER: (0, validators_1.str)(),
    DB_HOST: (0, validators_1.str)(),
    DB_NAME: (0, validators_1.str)(),
    DB_PASSWORD: (0, validators_1.str)(),
    NODE_ENV: (0, validators_1.str)(),
    DB_PORT: (0, validators_1.port)(),
    PORT: (0, validators_1.port)(),
});
