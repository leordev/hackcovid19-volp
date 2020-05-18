import Knex from "knex";

import { db as databaseConfigVars } from "./config";

const dbConfig: Knex.Config = databaseConfigVars;

const db = Knex(dbConfig);

export const insertDbRecord = async <T,U>(table: string, record: T): Promise<U> => {
    const result = await db.table(table).insert(record).returning("*");
    if (!result.length) {
        console.error(result);
        throw new Error("fail to insert user health");
    }
    return result[0];
}

export default db;
