import * as Knex from "knex";

const TABLE_NAME = "help_request";

export function up(knex: Knex): Knex.SchemaBuilder {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments("id").primary();
        table.integer("requester_id").notNullable();
        table.integer("address_id").notNullable();
        table.text("description").notNullable();
        table.decimal("offered_amount").notNullable();
        table.integer("helper_id").notNullable();
        table.decimal("paid_amount").notNullable();
        table.text("receipt").notNullable();
        table.integer("status").notNullable();
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
        table.timestamp("completed_at").notNullable().defaultTo("epoch");

        // fks
        table.foreign("requester_id").references("user.id");
        table.foreign("address_id").references("address.id");

        // speed up searches
        table.index(["status", "address_id"]);
    });
}

export function down(knex: Knex): Knex.SchemaBuilder {
    return knex.schema.dropTable(TABLE_NAME);
}
