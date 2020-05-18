import * as Knex from "knex";

const TABLE_NAME = "phone_number";

export function up(knex: Knex): Knex.SchemaBuilder {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments("id").primary();
        table.integer("type").notNullable();
        table.integer("entity_id").notNullable();
        table.text("phone").notNullable();

        // speed up searches from user or locations ids
        table.index(["type", "entity_id"]);

        // speed up searches from devices phone numbers
        table.index("phone");
    });
}

export function down(knex: Knex): Knex.SchemaBuilder {
    return knex.schema.dropTable(TABLE_NAME);
}
