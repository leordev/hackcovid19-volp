import * as Knex from "knex";

const TABLE_NAME = "fcm_key";

export function up(knex: Knex): Knex.SchemaBuilder {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments("id").primary();
        table.text("token").notNullable();
        table.text("source").notNullable(); /// WEB || IOS || ANDROID
        table.integer("user_id").notNullable();
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updated_at").notNullable().defaultTo("epoch");

        // references
        table.foreign("user_id").references("user.id");

        // speed up searches and sorts
        table.index("token");
        table.index(["token", "source"]);
    });
}

export function down(knex: Knex): Knex.SchemaBuilder {
    return knex.schema.dropTable(TABLE_NAME);
}
