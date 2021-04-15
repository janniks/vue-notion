function redirect(res, newLocation) {
  res.writeHead(301, {
    Location: newLocation,
  });
  res.end();
}

export default (req, res, next) => {
  if (req.url == "/basic-example") {
    return redirect(res, "/nuxt");
  }

  next();
};
