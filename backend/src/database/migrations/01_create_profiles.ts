import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('profiles', table => {
    table.increments('id');
    table.decimal('level').notNullable();
    table.decimal('xp').notNullable();
    table.decimal('tasks_completed').notNullable();

    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('profiles');
}