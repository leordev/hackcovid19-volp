import * as Knex from "knex";

const TABLE_NAME = "address";

export function up(knex: Knex): Knex.SchemaBuilder {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments("id").primary();
        table.integer("type").notNullable();
        table.integer("entity_id").notNullable();
        table.text("address1").notNullable();
        table.text("address2").notNullable();
        table.text("city").notNullable();
        table.text("state").notNullable();
        table.text("zip_code").notNullable();
        table.text("country").notNullable();
        table.float("latitude", 8).notNullable();
        table.float("longitude", 8).notNullable();
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());

        // speed up searches and sorts
        table.index(["type", "entity_id"]);
        table.index(["type", "latitude", "longitude"]);
        table.index(["latitude", "longitude"]);
    });
}

export function down(knex: Knex): Knex.SchemaBuilder {
    return knex.schema.dropTable(TABLE_NAME);
}
