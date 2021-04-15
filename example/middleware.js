export default (req, res, next) => {
  if (req.path == "/basic-example") {
    return res.redirect(301, "/nuxt");
  }

  next();
};
