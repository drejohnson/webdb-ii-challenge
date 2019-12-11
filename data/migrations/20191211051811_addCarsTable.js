exports.up = function(knex) {
  return knex.schema.createTable("cars", table => {
    table.increments();
    table.string("make", 255).notNullable();
    table.string("model", 255).notNullable();
    table.integer("year", 4);
    table
      .string("vin", 255)
      .notNullable()
      .unique();
    table.integer("mileage");
    table.boolean("is_used").defaultTo(false);
    table.string("transmission", 20);
    table.string("title_status", 20);
    table.float("price");
    table.timestamps(false, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars");
};
