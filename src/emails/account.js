const sgMail= require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/* sgMail.send({
    to: 'david_dexter@hotmail.com',
    from: 'david_dexter@hotmail.com',
    subject: 'test message',

    text: 'This is a test message too'

}).then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  }); */

  const sendWelcomeEmail= (email, name)=>{
    sgMail.send({
        to: email,
        from: 'david_dexter@hotmail.com',
        subject: 'Welcome to task manager app',

        text: `Welcome to the app ${name}. Let us know about any issues.`
    });

  }

  const sendGoodbyeEmail= (email, name)=>{
    sgMail.send({
        to: email,
        from: 'david_dexter@hotmail.com',
        subject: 'Sorry to see you go',

        text: `We're sorry to see you go, ${name}. Please let us know if there is anything we might improve.`
    });

  }


  module.exports = {
    sendWelcomeEmail,
    sendGoodbyeEmail
  }