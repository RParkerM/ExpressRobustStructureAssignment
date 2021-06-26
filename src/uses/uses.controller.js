// {
//     id: 2,
//     urlId: 1,
//     time: 1599161143457,
//   },

const uses = require("../data/uses-data");

function useExists(req, res, next) {
  const { useId } = req.params;
  const foundUse = uses.find((use) => use.id === Number(useId));
  if (foundUse) {
    res.locals.use = foundUse;
    next();
  } else {
    next({ status: 404, message: `No use associated with ID ${useId}` });
  }
}

function read(req, res, next) {
  res.json({ data: res.locals.use });
}

function list(req, res, next) {
  const { urlId } = req.params;
  console.log(urlId);
  const byResult = urlId ? (use) => use.urlId === Number(urlId) : () => true;
  res.json({ data: uses.filter(byResult) });
}

function destroy(req, res, next) {
  const id = uses.indexOf(res.locals.use);
  uses.splice(id, 1);
  res.status(204).json({ data: {} });
}

module.exports = {
  read: [useExists, read],
  list,
  destroy: [useExists, destroy],
};
