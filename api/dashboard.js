const getDashboardData = (token) => {
  return new Promise(async (resolve, reject) => {
    await fetch(`https://e1i8ucbq53.execute-api.ap-south-1.amazonaws.com/dev/fitness/dashboard`, {
      headers: {
        "x-auth-token": token,
      },
    })
      .then((result) => result.json())
      .then((res) => resolve(res))
      .catch((err) => {
        reject(err);
      });
  });
};

const getPlans = (token) => {
  return new Promise(async (resolve, reject) => {
    await fetch(`https://e1i8ucbq53.execute-api.ap-south-1.amazonaws.com/dev/fitness/plans`, {
      headers: {
        "x-auth-token": token,
      },
    })
      .then((result) => result.json())
      .then((res) => resolve(res))
      .catch((err) => {
        reject(err);
      });
  });
};
export { getDashboardData, getPlans };
