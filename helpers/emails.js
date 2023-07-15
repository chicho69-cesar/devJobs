const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

transporter.use('compile', hbs({
  viewEngine: 'hbs',
  viewPath: __dirname + '/../views/partials/emails',
  extName: '.hbs'
}))

const sendMail = async (options) => {
  const emailOptions = {
    from: 'devJobs <noreply@devjobs.com',
    to: options.user.email,
    subject: options.subject,
    template: options.template,
    context: {
      resetUrl: options.resetUrl
    }
  }

  await transporter.sendMail(emailOptions)
}

module.exports = {
  sendMail
}
