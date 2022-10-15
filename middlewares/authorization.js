const rules = require("../data/rule");
const authorization = (req, res, next) => {
  const url = req.path;
  var allPath = url.split("/");
  //   ["", "organization", "getOrganization", "634b2cbf5971278490bfe358"];
  //   console.log(rules[allPath[1]]);
  //   const access = rules[allPath[1]][allPath[2]].find((ele) => )
  next();
};

module.exports = authorization;
