import * as Knex from 'knex';

const tableName = 'order_types';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable(tableName, (t) => {
    t.uuid('id')
      .primary()
      .unique()
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .notNullable();
    t.string('name');
    t.uuid('order_id').references('id').inTable('orders').notNullable();
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable(tableName);
}
