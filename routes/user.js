var fs = require('fs');
var psth = require('path');
var fm = require('formidable');
var util = require('util');
var usersDB = require('../db/data');
module.exports = function (router) {

  function getUser(userName) {

    var result = null;
    for (var i = 0; i < usersDB.user.length; i++) {
      var user = usersDB.user[i];
      if (user.name == userName) {
        result = user;
        break;
      }
    }
    return result;
  }
  router.post('/login', function (req, res, next) {
    // console.log(req.query, 's', req.body);
    var userName = req.body.user;
    var password = req.body.pwd;


    let result = null;
    var path = '../db/data.json';
    fs.readFile(path, function (err, data) {
      console.log(data)
      if (err) {
        console.log(err)
        res.send({
          code: '0',
          msg: '登陆失败'
        });
      } else {
        let Datajson = JSON.parse(data);
        for (var i = 0; i < Datajson.user.length; i++) {
          if (Datajson.user[i].name == userName) {
            result = Datajson.user[i];
            break;
          }
        }
        if (result) {
          console.log(password)
          console.log(result)
          if (password == result.pwd) {
            console.log(result);
            req.userInfo = result;
            var date = new Date();
            date.setMinutes(date.getMinutes() + 15); //下一分钟的值
            res.cookie('THE_LAST_LOGIN', result.name, {
              expires: date
            });
          
            req.session.userInfo = result.name;
            console.log(req.session.userInfo)
            var opt = {
              headiconurl:result.headiconurl,
              name: result.name,
              favorites: result.favorites,
              code: '1',
              msg: '登陆成功'
            }
            res.send(opt)
          } else {
            //console.log('密码错误');
            res.send({
              code: '0',
              msg: '密码错误'
            });
          }
        } else {
          res.send({
            code: '0',
            msg: '用户名不存在'
          });
        }

      }
    })
  });
  router.post('/register', function (req, res, next) {
    var form = fm.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = "../public/images/";
    form.keepExtensions = true;
    form.maxFieldsSize = 2 * 1024 * 1024;
    form.parse(req, function (err, fields, files) {
      let user = fields.user;
      let pwd = fields.pwd;
      // console.log(files.pwd,'pwd')
      if (getUser(user)) {
        res.send({
          code: '0',
          msg: '用户已经注册'
        })
      } else {
        let baseurl = files.imageIcon.path.split('\\');
        let url = './'+ baseurl[2] +'/'+baseurl[3]
        console.log(baseurl)
        var opt = {
          "name": user,
          "pwd": pwd,
          "datetime": new Date(),
          "headiconurl":url,
          "favorites": {
            "theme": [],
            "news": []
          }
        };
       
        usersDB.user.push(opt);
        usersDB.total = +1;
        var path = '../db/data.json';
        var jsonStr = JSON.stringify(usersDB);
        fs.writeFile(path, jsonStr, function (err) {
          if (err) {
            res.send({
              code: '2',
              msg: "注册失败"
            });
          } else {
            var reg = {
              name: opt.name,
              headiconurl:opt.headiconurl,
              favorites: opt.favorites,
              code: '1',
              msg: '注册成功'
            }
            res.send(reg)
          }
        })
        console.log('after writeFile');
      }
    })

  })
}