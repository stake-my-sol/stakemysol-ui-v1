const validatorNameFormatter = (validatorName: string, len: number) => {
  if (validatorName.length > len) {
    return `${validatorName.slice(0, len)}...`;
  }

  return validatorName;
};

export default validatorNameFormatter;
