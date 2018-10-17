const schedule = require('node-schedule');
const nodemailer = require('nodemailer');
const moment = require('moment');

const sendMail = (mail) => {
  //检测邮箱地址是否为空
  if (!mail) {
    return console.log('没有邮箱地址!');
  }
  //检测邮箱地址是否符合规范
  var reg = /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z0-9]{2,5}$/;
  if (!mail.match(reg)) {
    return console.log('邮箱地址不符合规范');
  }
  //邮件发送
  const transporter = nodemailer.createTransport({
    service: "qq", // 主机
    auth: {
      user: "444920039@qq.com", // 账号
      pass: "rmknjtrthdgxcacj" // 密码
    }
  });
  const mailOptions = {
    from: 'zlh <444920039@qq.com>', // sender address
    to: mail, // list of receivers
    subject: `${moment().format('YYYY-MM-DD hh:mm a')}——Go home for dinner`, // Subject line
    html: `<p>🍋 🍊 🍒 🍰 🍇 🍉 🍓 🌽 🍑</p>
           <p>dadadadadadada ~ </p>
           `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (!error) {
      console.log('邮件发送成功！')
    } else {
      console.log(error);
      console.log('邮件发送失败！')
    }
  });
}

//  从 左向右 分别代表 second 、 minute 、 hour 、 day of month 、 month 、 day of week
schedule.scheduleJob('0 0 18 * * *', () => { // 每天的 18：00 执行任务
  console.log(' okok ~ 定时任务执行了 ~')
  sendMail('932734303@qq.com');
});
// sendMail('444920039@qq.com');

console.log('server start')