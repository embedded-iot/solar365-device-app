const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  //1310_64956b32-5b7d-4d33-b63f-2365c071c61d
  return `${s4()}_${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

const isUndefinedOrNull = (value) => value === undefined || value === null;

module.exports = {
  getUniqueID,
  isUndefinedOrNull
}
