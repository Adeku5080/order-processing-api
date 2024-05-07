import * as Knex from 'knex';

const tableName = 'add_ons';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable(tableName, (t) => {
    t.uuid('id')
      .primary()
      .unique()
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .notNullable();
    t.integer('amount');
    t.string('internal_profit');
    t.jsonb('meal_data');
    t.string('meal_addon_id');
    t.string('min_selection_no');
    t.string('meal_addon_category_id');

    t.uuid('meal_id').references('id').inTable('meals').notNullable();

    t.timestamps(true, true);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable(tableName);
}
