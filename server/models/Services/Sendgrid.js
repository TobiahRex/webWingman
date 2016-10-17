import sendgrid from 'sendgrid';


export default {
  verify(userInfo, cb) {
    const subject = 'Registration Confirmation for Watchman';
    const fromEmail = new sendgrid.mail.Email('Registration@Watchman.com');
    const toEmail = new sendgrid.mail.Email(`${userInfo.Email}`);
    let profileLink;
    userInfo.profileLink()
    .then(token => )
    .catch(err => cb(err));



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
    const sg = sendgrid.SendGrid(process.env.SENDGRID_API_KEY); //eslint-disable-line
    const requestBody = registerEmail.toJSON();
    const httpRequest = sg.emptyRequest();
    httpRequest.method = 'POST';
    httpRequest.path = '/v3/mail/send';
    httpRequest.body = requestBody;
    sg.API(httpRequest, cb); // eslint-disable-line
  },
};
