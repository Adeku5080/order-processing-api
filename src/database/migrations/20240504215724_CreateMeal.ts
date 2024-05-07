import * as Knex from 'knex';

const tableName = 'meals';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable(tableName, (t) => {
    t.uuid('id')
      .primary()
      .unique()
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .notNullable();
    t.boolean('new').notNullable();
    t.string('name').notNullable();
    // t.jsonb('brand');/
    t.boolean('active').defaultTo(true).notNullable();
    t.string('amount').notNullable();
    t.jsonb('images').defaultTo(JSON.stringify([])).notNullable();
    t.uuid('calculated_order_id')
      .references('id')
      .inTable('calculated_orders')
      .notNullable();
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable(tableName);
}
