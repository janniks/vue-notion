export default (req, res, next) => {
  if (req.url == "/basic-example") {
    return res.redirect(301, "/nuxt");
  }

  next();
};
