import * as Knex from 'knex';

const tableName = 'brands';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable(tableName, (t) => {
    t.uuid('id')
      .primary()
      .unique()
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .notNullable();
    t.string('name').notNullable();
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable(tableName);
}
