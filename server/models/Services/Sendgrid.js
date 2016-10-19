import Sendgrid from 'sendgrid';
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'development' || 'undefined') dotenv.load();

const sendgridMethods = {
  verify(userInfo, cb) {
    const subject = 'Registration Confirmation for Watchman';

    const fromEmail = new Sendgrid.mail.Email('Registration@Watchman.com');
    fromEmail.name = 'Customer Service';

    const toEmail = new Sendgrid.mail.Email(`${userInfo.email}`);
    toEmail.name = `${userInfo.firstName} ${userInfo.lastName}`;

    const content = new Sendgrid.mail.Content('text/html',
    `<html>
      <h1>Hi, ${userInfo.firstName}</h1>
      <br>
      <p>
        Please verify your new account by clicking <a href="${userInfo.verifyLink}">HERE</a>
      </p>
      <br>
      <h2>Thanks!
      <br>
        Respectfully,
      <br>
      <i>Tobiah Rex</i></h2>
    </html>`);
    const registerEmail = new Sendgrid.mail.Mail(fromEmail, subject, toEmail, content);
    const sg = Sendgrid(process.env.SENDGRID_API_KEY); //eslint-disable-line
    const requestBody = registerEmail.toJSON();
    const httpRequest = sg.emptyRequest();
    httpRequest.method = 'POST';
    httpRequest.path = '/v3/mail/send';
    httpRequest.body = requestBody;
    sg.client.API(httpRequest, cb); // eslint-disable-line
  },
};

export default sendgridMethods;
