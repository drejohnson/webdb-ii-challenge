const knex = require("knex");

const config = require("../knexfile.js");

const db = knex(config.development);

async function getAll() {
  return await db("cars");
}

async function getById(id) {
  return await db("cars")
    .where({ id })
    .first();
}

async function add(car) {
  const [id] = await db("cars")
    .insert(car, "id")
    .into("cars");
  return await getById(id);
}

async function update(id, changes) {
  await db("cars")
    .where({ id })
    .update(changes);

  return getById(id);
}

async function remove(id) {
  const removed = await getById(id);

  await db("cars")
    .where({ id })
    .del();

  return removed;
}

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove
};
