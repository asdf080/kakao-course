export const joinUser = (req, res) => {
  const { userId, userPW, userName } = req.body;
  console.log(userId, userPW, userName);
};
