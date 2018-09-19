const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken');

const app = express();

const secret = 'privatekey';  //秘钥 用字符串模拟

const sessionConfig = {
  secret: 'wanghang',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 1 // 10分钟
  }
}

const genetareToken = (data) => {
  let token = jwt.sign({
      data,
      exp: Math.floor(Date.now() / 1000) + (60 * 60), // 3600s 设置的是到期的时间 并非持续时间
    },
    secret);
    return token;
}

const canLogin = (user, pass) => {
  return user === 'wh' && pass === 'wh'
}

app.use(bodyParser.urlencoded({
  extended: false
})) // 解析 x-www-form-urlencoded
app.use(bodyParser.json()) // 解析json
app.use(session(sessionConfig));

app.all('*', (req,_,next) => {
  const {path} = req;
  console.log(path);
  if(!path.includes('login')) {
    // 在这做拦截操作
    console.log('拦截验证token')
  }
  next();
})

app.post('/login', (req, res) => {
  const {
    user,
    pass
  } = req.body;

  if (canLogin(user,pass)) {
    // success
    const token = genetareToken(user);
    req.session.loginUser = token;
    res.send({
      code: 200,
      msg: 'login success',
      token,
    })
  } else {
    // fail
    res.send({
      code: 400,
      msg: 'login fail'
    });
  }
});

app.post('/data',(req,res) => {
  const { loginUser } = req.session;
  const { token } = req.body;
  console.log('loginUser:  ', loginUser);

  if(token) {
    res.send('ok');
  }
})

app.post('/logout', (req, res) => {
  const {token} = req.body;
  jwt.verify(token,secret,(err) => { // 验证token  除登录外的所有请求都应该检测token
    if(err) {
      //fail
      console.log(err);
      res.send({
        code:400,
        msg:'error'
      })
    }else {
      // success
      req.session.destroy();
      res.send({
        code: 200,
        msg: 'logout success'
      })
    }
  })
})


// 启动服务器
app.listen(3000, (err) => {
  if (err) {
    console.error(err)
  }
  console.log('server listening at port 3000')
})