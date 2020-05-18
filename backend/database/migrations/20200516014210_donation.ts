import * as Knex from "knex";

const TABLE_NAME = "donation";

export function up(knex: Knex): Knex.SchemaBuilder {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments("id").primary();
        table.integer("donator_id").notNullable();
        table.integer("institution_id").notNullable();
        table.text("message").notNullable();
        table.text("service").notNullable();
        table.decimal("amount").notNullable();
        table.text("receipt").notNullable();
        table.boolean("is_valid").notNullable();
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());

        // speed up searches and sorts
        table.index(["donator_id"]);
        table.index(["institution_id"]);

        // references
        table.foreign("donator_id").references("user.id");
        table.foreign("institution_id").references("institution.id");
    });
}

export function down(knex: Knex): Knex.SchemaBuilder {
    return knex.schema.dropTable(TABLE_NAME);
}
