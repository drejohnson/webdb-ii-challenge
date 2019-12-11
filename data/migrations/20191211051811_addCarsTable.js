exports.up = function(knex) {
  return knex.schema.createTable("cars", table => {
    table.increments();
    table.string("make", 255).notNullable();
    table.string("model", 255).notNullable();
    table.integer("mileage", 255).notNullable();
    table.integer("year", 4).notNullable();
    table
      .string("vin", 255)
      .notNullable()
      .unique();
    table
      .boolean("is_used")
      .notNullable()
      .defaultTo(false);
    table
      .enu("transmission", ["v6", "v8", "v12"])
      .notNullable()
      .defaultTo("v6");
    table
      .enu("title-status", ["Clean", "Salvage", "Junk", "Bonded"])
      .notNullable()
      .defaultTo("Clean");
    table.float("price", 255).notNullable();
    table.timestamps(false, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars");
};
