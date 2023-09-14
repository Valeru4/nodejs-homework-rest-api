export const handleSaveError = (error, data, next) => {
  error.status = 400;
  next();
};

export const handleRunValidateAndUpdate = function (next) {
  this.options.runValidators = true;
  next();
};
