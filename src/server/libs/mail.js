// Подключение:
//   mail = require('libs/mail').mail,
//-------------------------------------------
// Использование:
//   mail(subject, mess, recipient, sender);
//-------------------------------------------
// Отправляем письмо на почту recipient от отправителя sender
// Если recipient не указан, отправляем письмо на почту, указанную в config
//-------------------------------------------

const config      = require('config'),
      nodemailer  = require('nodemailer'),
      log         = require('libs/log')(module),
      db          = require('libs/db'),
      validator   = require('validator'),
      SystemError = require('error/system').SystemError



function SendMail(subject, message, recipient = "", sender = "", emailLogin = "", emailPass = "") {

  // Достаем тип почты (gmail, yandex...)
  let emailType = config.get('email-login').split('@')[1].split('.')[0]


  // Проверяем, есть ли логин и пароль от почты
  let transporter = nodemailer.createTransport({
    service: emailType,
    auth: {
      user: emailLogin || config.get('email-login'),
      pass: emailPass || config.get('email-pass')
    }
  })


  // Если нет отправителя и получателя, то письмо отправляется самому себе
  let from, to;
  if (validator.isEmail(sender)) { from = sender }
  else if ( validator.isEmail(emailLogin) ) { from = emailLogin }
  else { from = config.get('email-login') }

  if (validator.isEmail(recipient)) { to = sender }
  else if ( validator.isEmail(emailLogin) ) { to = emailLogin }
  else { to = config.get('email-login') }


  let mailOptions = {
      from: from,
      to: to,
      subject: subject || 'Без темы',
      text: message || 'Нет сообщения'
  }


  transporter.sendMail(mailOptions, (err, info) => {
    if (err) return new SystemError(err)
    log.info('Message sent by email')
  })
}



function mail(subject, message, recipient, sender) {
  (async () => {
    // Достаем логин и пароль от почты
    let base = await db.findOne('Setting')

    // Если базы нет, то будем использовать значения из конфига
    if (base) {
      new SendMail(subject, message, recipient, sender, base.emailLogin, base.emailPass)
    } else {
      new SendMail(subject, message, recipient, sender)
    }

  })().catch( (err) => { if (err) return new SystemError(err) })

}



exports.mail = mail