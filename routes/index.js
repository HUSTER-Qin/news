
var fs = require('fs');
var path = require('path');
var request = require('request');

module.exports = function (router) {

  // /api/4/news/latest
  // 最新主题
  router.post('/api/4/news', function (req, res, next) {
    request.get('http://news-at.zhihu.com/api/4/news/' + req.body.id, function (error, response, body) {
      res.send(body)
    })

  });
  // 主题列表
  router.get('/api/4/themes', function (req, res, next) {
    request.get('http://news-at.zhihu.com/api/4/themes', function (error, response, body) {
      res.send(body)
    })
  });
  // /api/4/theme/ 主题详情
  router.post('/api/4/theme', function (req, res, next) {
    console.log(req.body.id)
    request.get('http://news-at.zhihu.com/api/4/theme/' + req.body.id, function (error, response, body) {
      res.send(body)
    })
  });
  // /api/4/story-extra/
  router.get('/api/4/story-extra/', function (req, res, next) {
    var id = req.query.id;
    request.get('http://news-at.zhihu.com/api/4/story-extra/' + id, function (error, response, body) {
      res.send(body)
    })
  });
// 热门加载更多
router.post('/loadmore',function(req, res, next){
   var date = req.body.date;
   request.get('http://news-at.zhihu.com/api/4/news/before/' + date, function (error, response, body) {
      res.send(body)
    })
})

  
  router.post('/themebefore', function (req, res, next) {
    let opt = {
      themeid:  req.body.themeid,
          themelastid: req.body.themelastid
    }
    console.log(opt)
   request.get('http://news-at.zhihu.com/api/4/theme/'+opt.themeid+'/before/'+opt.themelastid, function (error, response, body) {
      res.send(body)
    })
})  
  router.get('/image', function (req, res, next) {
    var url = req.query;  
    var request1 = request(req.query.img);
    request1.on('response', function (response) {
      var c = "";
      response.setEncoding('binary');
      response.on('data', function (chunk) {
        c += chunk;
      });
      response.on('end', function () {
        res.writeHead(200, response.headers);
        res.write(c, "binary");
        res.end();
      })
    });
    request1.end();
  });
  // 收藏
  router.post('/collects', function (req, res, next) {
      var   name = req.body.name;
       var  news = req.body.news;
       console.log(name,'collects')
       console.log(news)
        var path = '../db/data.json';
        fs.readFile(path,function(err,data){
            if(err){
              res.send({
                code:'0',
                msg:'服务器错误'
              })
            }else{
              var datajson = JSON.parse(data)
              console.log(datajson)
              for (var i in datajson.user) {
                if (datajson.user[i].name == name ){
                    datajson.user[i].favorites.news = news;
                    break ;
                }                    
              }
              
               fs.writeFile(path, JSON.stringify(datajson), function (err){
                  if(err){
                    res.send({
                      code:'0',
                      msg:'收藏失败'
                    })
                  }else{
                    res.send({
                      code:'1',
                      msg:'收藏成功'
                    })
                  }
               })


            }
        })

  })

  router.post('/themecollect',function(req,res,next){
      var   name = req.body.name;
       var  theme = req.body.theme;
        var path = '../db/data.json';
        fs.readFile(path,function(err,data){
            if(err){
              res.send({
                code:'0',
                msg:'服务器错误'
              })
            }else{
              var datajson = JSON.parse(data)
              console.log(datajson)
              for (var i in datajson.user) {
                if (datajson.user[i].name == name ){
                    datajson.user[i].favorites.theme = theme;
                    break ;
                }                    
              } 
               fs.writeFile(path, JSON.stringify(datajson), function (err){
                  if(err){
                    res.send({
                      code:'0',
                      msg:'主题收藏失败'
                    })
                  }else{
                    res.send({
                      code:'1',
                      msg:'主题收藏成功'
                    })
                  }
               })


            }
        })
  })
  // router.all("*",function (req, res, next) {
  //   // console.log(req.Url)
  //   var pathName = req.params[0]
  //   console.log(pathName,'--------');
  //   var reg = /theme\/[1-9][0-9]+/
  //   if (reg.test(pathName)) {


  //   }
  //   //  res.send(200)
  //   res.redirect('/')

  // })



  

}