let extractors = {};

extractors.fromHeaderAsBearerToken = function(header_name) {
  return function(req) {
    let token = null;
    if (req.headers[header_name]) {
      token = req.headers[header_name].split(' ')[1];
    }
    return token;
  };
};

module.exports = extractors;
