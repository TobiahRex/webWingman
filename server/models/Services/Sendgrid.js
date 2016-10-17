import sendgrid from 'sendgrid';


export default {
  verify (userInfo, cb) {
    const fromEmail = new sendgrid.mail.Email('Registration@Watchman.com');
    const subject = 'Registration Confirmation for Watchman';
    const toEmail = new sendgrid.mail.Email(`${userInfo.Email}`);
    const content = new sendgrid.mail.Content('text/html',
    `<html>
      <h1>Hi, ${userInfo.Firstname}</h1>
      <br>
      <p>
        Please verify your new account by clicking <a href="${userInfo.profileLink()}">HERE</a>
      </p>
      <br>
      <h2>Thanks!
      <br>
        Respectfully,
      <br>
      <i>Tobiah Rex</i></h2>
    </html>`);
    const registerEmail = new sendgrid.mail.Mail(fromEmail, subject, toEmail, content);
    const sg = sendgrid.SendGrid(process.env.SENDGRID_API_KEY);
    const requestBody = registerEmail.toJSON();
    const httpRequest = sg.emptyRequest();
    httpRequest.method = 'POST';
    httpRequest.path = '/v3/mail/send';
    httpRequest.body = requestBody;
    sg.API(httpRequest, cb);
  },
};
