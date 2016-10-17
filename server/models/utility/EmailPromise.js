import sgEmail from '../Services/Sendgrid';

export default {
  verify(userInfo) {
    return new Promise((resolve, reject) => {
      sgEmail.verify(userInfo, (response) => {
        if (response.statusCode !== 202) return reject(response);
        userInfo.password = null;
        return resolve(response);
      });
    });
  },
};
