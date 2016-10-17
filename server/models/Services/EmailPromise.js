import sendgrid = 'make this a route to ./email';

export default {
  verify: (userInfo) => new Promise((res, rej) => {
    sendgrid.verify(userInfo, response => {
      if (response.statusCode !== 202) return rej(response);
      userInfo._Password = null;
      return res(response);
    });
  });
}
