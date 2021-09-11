const getBlogs = (count) => {
  return new Promise(async (resolve, reject) => {
    await fetch(
      "https://y576n6rio7.execute-api.ap-south-1.amazonaws.com/dev/blogs",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          count,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const addComment = (body) => {
  return new Promise(async (resolve, reject) => {
    await fetch(
      "https://y576n6rio7.execute-api.ap-south-1.amazonaws.com/dev/blogs/comment",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        resolve(res.result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export { getBlogs, addComment };
