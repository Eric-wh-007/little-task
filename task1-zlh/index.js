const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const app = express();

const secret = 'key';
const sessionConfig = {
  secret: 'zlh',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 10
  }
}

const createToken = (data) => {
  let token = jwt.sign({
    data,
    exp: Math.floor(Date.now() / 1000) + (60 * 60)
  }, secret);
  return token;
}

const canLogin = (user, pass) => {
  return user === 'zlh' && pass === 'zlh';
}

app.use(session(sessionConfig));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.all('*', (req, res, next) => {
  const { path } = req;
  console.log(`visit path ${path}`);
  if (!path.includes('login')) {
    console.log('不是 login ');
    if (req.session.loginUser) {   // 如果有token 判断token是否过期
      let startTime = req.session.loginUser.startTime;
      let timeDifference = moment().diff(startTime, 'seconds');
      if (timeDifference > 3600) {   // token 超时
        res.send({
          code: 400,
          msg: 'token timeout'
        })
        return;
      }
    }
  }
  next();
})

app.post('/login', (req, res) => {
  const { user, pass } = req.body;
  if (canLogin(user, pass)) {
    const token = createToken({user, pass});
    req.session.loginUser = {
      token: token,
      startTime: moment()
    };
    res.send({
      code: 200,
      msg: 'login success',
      token
    })
  } else {
    res.send({
      code: 400,
      msg: 'login fail'
    });
  }
});

app.post('/logout', (req, res) => {
  const token = req.get("z-token");       // 从header获取token
  jwt.verify(token, secret, (err) => {
    if (err) {
      console.log(err);
      res.send({
        code: 400,
        msg: 'error'
      })
    } else {
      delete req.session.loginUser;
      res.send({
        code: 200,
        msg: 'logout success'
      })
    }
  })
})

app.listen(3000, (err) => {
  if (err) console.error(err)
  console.log('server listening at port 3000')
})