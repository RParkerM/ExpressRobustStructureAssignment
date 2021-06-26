const urls = require("../data/urls-data");
const uses = require("../data/uses-data");

function urlExists(req, res, next) {
  const { urlId } = req.params;
  const foundUrl = urls.find((url) => url.id === Number(urlId));
  if (foundUrl) {
    res.locals.url = foundUrl;
    next();
  } else {
    next({ status: 404, message: `No url exists with ID ${urlId}` });
  }
}

function hasHrefProperty(req, res, next) {
  const { data: { href } = {} } = req.body;
  if (href) {
    next();
  } else {
    next({ status: 400, message: `A 'href' property is required.` });
  }
}

function create(req, res, next) {
  const { data: { href } = {} } = req.body;
  const newId = urls.length + 1;
  const newUrl = { id: Number(newId), href };
  urls.push(newUrl);
  res.status(201).json({ data: newUrl });
}

function update(req, res, next) {
  const foundUrl = res.locals.url;
  const { data: { href } = {} } = req.body;
  foundUrl.href = href;
  console.log("URL UPDATED!", foundUrl);
  res.json({ data: foundUrl });
}
function list(req, res, next) {
  res.json({ data: urls });
}

function read(req, res, next) {
  uses.push({
    id: uses.length + 1,
    urlId: Number(req.params.urlId),
    time: Date.now(),
  });
  res.json({ data: res.locals.url });
}

//DELETE IS NOT ALLOWED

module.exports = {
  list,
  read: [urlExists, read],
  create: [hasHrefProperty, create],
  update: [urlExists, hasHrefProperty, update],
  urlExists,
};
