exports.up = function(knex) {
  return knex.schema.createTable("cars", table => {
    table.increments();
    table.string("make", 255).notNullable();
    table.string("model", 255).notNullable();
    table.string("year", 255).notNullable();
    table
      .string("vin", 255)
      .notNullable()
      .unique();
    table.boolean("is_used", 255).defaultTo(false);
    table.float("price", 255).notNullable();
    table.timestamps(false, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars");
};
