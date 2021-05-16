export const NAVIGATOR_TYPES = {
  screen1: 'AR',
  screen2: 'VR',
  login: 'login',
  arProductInfo: 'arProductInfo'
};

export const fireBaseAdapter = (response) => {
  if (!response) {
    return;
  }
  const keys = Object.keys(response);

  return keys.map((key) => {
    return {
      _id: key,
      ...response[key],
    };
  });
};


