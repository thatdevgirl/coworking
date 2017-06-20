var register = function(Handlebars) {
  // The helpers
  var helpers = {
    ifEq: function(v1, v2, options){
      return (v1 == v2) ? options.fn(this) : options.inverse(this);
    }
  };

  // Register helpers.
  if (Handlebars && typeof Handlebars.registerHelper === "function") {
    for (var prop in helpers) {
      Handlebars.registerHelper(prop, helpers[prop]);
    }
  } else {
    return helpers;
  }
};

module.exports.register = register;
module.exports.helpers = register(null);
