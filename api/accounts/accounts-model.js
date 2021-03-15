const db = require('../../data/db-config');

const getAll = () => {
  // DO YOUR MAGIC
  return db('accounts');
}

const getById = id => {
  // DO YOUR MAGIC
  return db('accounts').where('id', id);
}

const create = async account => {
  // DO YOUR MAGIC
  const newAccount = await db('accounts').insert(account);
  return await getById(newAccount);
}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
  await db('accounts').where('id', id).update(account);
  return getById(id);
}

const deleteById = async id => {
  // DO YOUR MAGIC
  const deleted = await getById(id);
  await db('accounts').where('id', id).delete();

  return deleted;
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
