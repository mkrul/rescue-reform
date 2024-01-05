"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateEnv_1 = __importDefault(require("./util/validateEnv"));
const app_1 = __importDefault(require("./app"));
const pg = require("")({
    client: "pg",
    connection: {
        host: validateEnv_1.default.DB_HOST,
        user: validateEnv_1.default.DB_USER,
        password: validateEnv_1.default.DB_PASSWORD,
        database: validateEnv_1.default.DB_NAME,
        port: Number(validateEnv_1.default.DB_PORT),
    },
    searchPath: ["../../knex", "public"],
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield pg.pool.acquire();
    try {
        const { rows: users } = yield client.query("SELECT * FROM users");
        console.log(`Connected to database ${validateEnv_1.default.DB_NAME}`);
        app_1.default.listen(validateEnv_1.default.PORT, () => {
            console.log(`Server listening on port ${validateEnv_1.default.PORT}`);
        });
    }
    catch (err) {
        console.error(err);
    }
    finally {
        client.release();
    }
}))();
