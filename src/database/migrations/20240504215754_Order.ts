import * as Knex from 'knex';

const tableName = 'orders';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable(tableName, (t) => {
    t.uuid('id')
      .primary()
      .unique()
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .notNullable();
    t.string('user_id').notNullable();
    t.boolean('completed').defaultTo(true);
    t.boolean('cancelled').defaultTo(false);
    t.boolean('kitchen_cancelled').defaultTo(false);
    t.boolean('kitchen_accepted').defaultTo(true);
    t.boolean('kitchen_dispatched').defaultTo(true);
    t.string('kitchen_dispatched_time');
    t.string('completed_time');
    t.string('rider_id');
    t.boolean('kitchen_prepared').defaultTo(true);
    t.boolean('rider_assigned').defaultTo(true);
    t.boolean('paid').defaultTo(true);
    t.string('order_code');
    t.string('order_change');
    t.uuid('calculated_order_id')
      .references('id')
      .inTable('calculated_orders')
      .notNullable();
    t.string('kitchen_verified_time');
    t.string('kitchen_completed_tilme');
    t.boolean('shop_accepted').defaultTo(true).notNullable();
    t.boolean('shop_prepared').defaultTo(true).notNullable();
    t.integer('no_of_mealbags_delivered');
    t.integer('no_of_drinks_delivered');
    t.string('rider_started_time');
    t.boolean('rider_started').defaultTo(false).notNullable();
    t.string('rider_arrived_time');
    t.boolean('rider_arrived').defaultTo(false).notNullable();
    t.boolean('is_failed_trip').defaultTo(false).notNullable();
    t.jsonb('failed_trip_details');
    t.string('box_number');
    t.string('shelf_id');
    t.boolean('scheduled').defaultTo(false).notNullable();
    t.string('confirmed_by_id');
    t.string('completed_by_id');
    t.string('scheduled_delivery_date');
    t.string('scheduled_delivery_time');
    t.boolean('is_hidden').defaultTo(false).notNullable();

    t.timestamps(true, true);
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable(tableName);
}
