const router = require('express').Router()
const { getAll, getById, create, updateById, deleteById } = require('./accounts-model');
const { checkAccountId, checkAccountPayload } = require('./accounts-middleware');

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  getAll()
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      res.status(500).json({ message: `Error: ${err}` });
    })
})

router.get('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  res.status(200).json(req.account);
});

router.post('/', checkAccountPayload, (req, res, next) => {
  // DO YOUR MAGIC
  create(req.body)
    .then(newAccount => {
      res.status(200).json(newAccount);
    })
    .catch(err => {
      res.status(500).json({ message: `Error: ${err}` });
    })
});

router.put('/:id', checkAccountId, checkAccountPayload, (req, res, next) => {
  // DO YOUR MAGIC
  updateById(req.params.id, req.body)
    .then(updates => {
      res.status(200).json(updates);
    })
    .catch(err => {
      res.status(500).json({ message: `Error: ${err}` });
    })
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  deleteById(req.params.id)
    .then(deleted => {
      res.status(200).json(deleted);
    })
    .catch(err => {
      res.status(500).json({ message: `Error: ${err}` });
    })
})

router.use((err, req, res, next) => { // eslint-disable-line
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: 'something went wrong inside the accounts router',
    errMessage: err.message,
  })
})

module.exports = router;
