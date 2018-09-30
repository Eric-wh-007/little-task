const nodemailer = require('nodemailer');

const FuckZLH = () => {

  const account_qq = {
    user: 'wanghangan@qq.com',
    pass: 'aldlnoqidqjabebf',
    smtp: { host: 'smtp.qq.com', port: 465, secure: false },
    imap: { host: 'imap.qq.com', port: 143, secure: true },
    pop3: { host: 'pop3.qq.com', port: 110, secure: false },
  }

  const transporter = nodemailer.createTransport({
    host:account_qq.smtp.host,
    auth:{
      user:account_qq.user,
      pass:account_qq.pass,
    }
  });

  const message = {
    from: '"wanghang163"<wanghangan@qq.com>',
    to:'"zlh"<444920039@qq.com>',
    subject:'hello',
    text:'hello wh', // text 与 html 冲突
    html:`
    <p class="text">Hover Me !</p>
    <p class="fuck"></p>
    <style>
    .text {
      cursor:pointer;
      width:100px;
    }
    .text:hover + .fuck {
      visibility:visible;
    }
    .fuck {
      visibility:hidden;
      color:red;
    }

    .fuck::after {
      content:'FUCK YOU';
    }
    </style>`,
  }

  transporter.sendMail(message, (err, info) => {
    if(err) {console.log(err);return;}
    console.log(info);
  })
}

FuckZLH();
