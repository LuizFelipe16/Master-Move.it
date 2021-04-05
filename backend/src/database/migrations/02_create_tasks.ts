import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('tasks', table => {
    table.increments('id');
    table.string('description').notNullable();
    table.string('type').notNullable();
    table.decimal('amount').notNullable();

    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('tasks');
}