import env from "./util/validateEnv";
import app from "./app";

const pg = require("../../knex/knex")({
  client: "pg",
  connection: {
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    port: Number(env.DB_PORT),
  },
  searchPath: ["../../knex", "public"],
});

(async () => {
  const client = await pg.pool.acquire();

  try {
    const { rows: users } = await client.query("SELECT * FROM users");
    console.log(`Connected to database ${env.DB_NAME}`);

    app.listen(env.PORT, () => {
      console.log(`Server listening on port ${env.PORT}`);
    });
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
})();
