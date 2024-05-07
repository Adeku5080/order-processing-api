import * as Knex from 'knex';

const tableName = 'calculated_orders';

export async function up(knex: Knex.Knex) {
  return knex.schema.createTable(tableName, (t) => {
    t.uuid('id')
      .primary()
      .unique()
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .notNullable();
    t.string('total_amount').notNullable();
    t.boolean('free_delivery').notNullable();
    t.string('delivery_fee').notNullable();
    t.string('service_charge').notNullable();
    t.float('lat').notNullable();
    t.float('lng').notNullable();
    t.string('cokitchen_polygon');
    t.boolean('pickup').notNullable();
    t.string('prev_price').notNullable();
    t.jsonb('address_details');
    t.uuid('order_id').references('id').inTable('orders').notNullable();

    t.timestamps(true, true);

    //add iuerid
    //address details field is json.find how to rep json in knex
    //orderId as a foreingkey and define its relationships
  });
}

export async function down(knex: Knex.Knex) {
  return knex.schema.dropTable(tableName);
}
