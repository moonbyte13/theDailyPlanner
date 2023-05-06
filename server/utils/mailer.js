const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Send a welcome email to a new user
async function sendWelcomeEmail(toEmail) {
  const msg = {
    to: toEmail,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: 'Welcome to The Daily Planner!',
    html: '<h1>Thank you for joining our app</h1><p>We hope you enjoy using it!</p>',
  };
  try {
    await sgMail.send(msg);
  } catch (err) {
    console.error(`Error sending welcome email to ${toEmail}: ${err.message}`);
  }
}

module.exports = {
  sendWelcomeEmail,
};
