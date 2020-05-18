import * as Knex from "knex";

const TABLE_NAME = "user_health";

export function up(knex: Knex): Knex.SchemaBuilder {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments("id").primary();
        table.integer("user_id").notNullable();
        table.integer("status").notNullable();
        table.integer("reported_by_id").notNullable();
        table.timestamp("reported_at").notNullable().defaultTo(knex.fn.now());

        // references
        table.foreign("user_id").references("user.id");
        table.foreign("reported_by_id").references("user.id");
    });
}

export function down(knex: Knex): Knex.SchemaBuilder {
    return knex.schema.dropTable(TABLE_NAME);
}
