import pg from "pg";
import * as dotenv from "dotenv";

dotenv.config();
const conStringPri = `postgres://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}:5432/${process.env.DATABASE}`;
const Client = pg.Client;
const client = new Client({ connectionString: conStringPri });
client.connect();

export default client;
