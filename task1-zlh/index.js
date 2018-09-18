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

// 拦截器
app.all('*', (req, res, next) => {
  const { path } = req;
  console.log(`visit path ${path}`);
  if (!path.includes('login')) {
    const token = req.get("z-token");    // 从header获取token
    if (token) {   
      const startTime = req.session.loginUser.startTime;
      const timeDifference = moment().diff(startTime, 'seconds');
      console.log(`距上次获取 session 过去了 ${timeDifference} s`);
      if (timeDifference > 3600) {  // 如果有token 判断token是否过期
        res.send({
          code: 400,
          msg: 'token timeout'
        })
      } else {
        jwt.verify(token, secret, (err) => {    //验证 token
          if (err) {
            console.log(err);
            res.send({
              code: 400,
              msg: 'error'
            })
          } else {
            next();
          }
        });
      }
    } else {  //  header 里面没 token
      res.send({
        code: 400,
        msg: 'notfound token'
      })
    }
  } else {
    next();
  }
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
  delete req.session.loginUser;
  console.log('xxxxxxxxxxxxx')
  res.send({
    code: 200,
    msg: 'logout success'
  })
})

app.post('/test', (req, res) => {
  const { test } = req.body;
  console.log(test, 'ssssssssss')
  if (test === 'test') {
    res.send({
      code: 200,
      msg: 'test === test is true'
    })
  } else {
    res.send({
      code: 400,
      msg: 'err'
    })
  }
})

app.listen(3000, (err) => {
  if (err) console.error(err)
  console.log('server listening at port 3000')
})