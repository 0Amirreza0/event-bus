export const deepClone = (itemToClone) => {
  if (!itemToClone) return itemToClone;

  const isArray = Array.isArray(itemToClone);
  if (isArray) return itemToClone.map((item) => deepClone(item));

  const isObject = typeof itemToClone === 'object';
  if (isObject) {
    const objectClone = {};
    Object.keys(itemToClone).forEach((key) => {
      const item = itemToClone[key];
      objectClone[key] = deepClone(item);
    });

    return objectClone;
  }

  return itemToClone;
};

export default deepClone;
