/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  // set `call_number` to null instead of empty, then add unique constraint and default null
  return knex('records').update({ call_number: null }).where('call_number', '').then(() =>
    knex.schema.alterTable('records', table => {
      table.string('call_number').unique().nullable().defaultTo(null).alter();
      table.boolean('is_processed').defaultTo(false);
    })
  )
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('records', table => {
    table.dropColumn('is_processed');
    table.dropUnique('call_number');
  });
};
