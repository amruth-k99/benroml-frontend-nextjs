const { baseURL } = process.env;
const getDashboardData = (token) => {
  return new Promise(async (resolve, reject) => {
    console.log(baseURL);
    await fetch(`${baseURL}/fitness/dashboard`, {
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
    await fetch(`${baseURL}/fitness/plans`, {
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
