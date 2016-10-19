import sendgrid from './Sendgrid';

const emailMethods = {
  verify: userInfo => new Promise((resolve, reject) => {
    sendgrid.verify(userInfo, response =>
      (response.statusCode !== 202 ? reject(response) : resolve()));
  }),
};

export default emailMethods;
