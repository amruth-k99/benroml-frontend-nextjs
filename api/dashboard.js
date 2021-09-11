const getDashboardData = (token) => {
  return new Promise(async (resolve, reject) => {
    await fetch(`${process.env.BaseURL}/fitness/dashboard`, {
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
    await fetch(`${process.env.BaseURL}/fitness/plans`, {
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
