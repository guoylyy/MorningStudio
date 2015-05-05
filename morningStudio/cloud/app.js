// 在 Cloud code 里初始化 Express 框架
var express = require('express');
var app = express();
var ejs = require('ejs');
var Mailgun = require('mailgun').Mailgun;
var util = require('util');
var expressLayouts = require('express-ejs-layouts');
var moment = require('moment');
var _ = require('underscore');
var fs = require('fs');
var avosExpressHttpsRedirect = require('avos-express-https-redirect');
var crypto = require('crypto');
var avosExpressCookieSession = require('avos-express-cookie-session');


var mutil = require('cloud/mutil.js');
var mlog = require('cloud/mlog.js');
var mtask = require('cloud/mtask.js');
var mconfig = require('cloud/mconfig.js');
var config = require('cloud/config.js');

var pageSize = 18;
// App 全局配置
if (__production) {
  app.set('views', 'cloud/views');
} else {
  app.set('views', 'cloud/views');
}
app.set('view engine', 'ejs'); // 设置 template 引擎
app.use(express.bodyParser()); // 读取请求 body 的中间件
app.use(avosExpressHttpsRedirect());
app.use(express.cookieParser(config.cookieParserSalt)); //还不明白是干什么的
app.use(avosExpressCookieSession({ //设置 cookie
  cookie: {
    maxAge: 3600000
  },
  fetchUser: true
}));
app.use(expressLayouts);
app.use(app.router);
app.use(express.static('public')); //public

// 使用 Express 路由 API 服务 /hello 的 HTTP GET 请求
app.get('/', function(req, res) {
  res.render('index.ejs');
});

app.get('/index', function(req, res) {
  if (isLogin()) {
    res.redirect('/task/list');
  } else {
    res.redirect('/login');
  }
});

app.get('/login', function(req, res) {
  res.render('index.ejs');
});
app.get('/task/list', function(req, res) {
  res.render('index.ejs');
});
app.get('/studio/manage', function(req, res) {
  res.render('index.ejs');
});



function isLogin() {
  return AV.User.current();
}

function check_login(res) {
  var u = isLogin();
  if (u) {
    return u;
  } else {
    mutil.renderError(res, {
      code: 501,
      message: '未登录，请重新登录！'
    });
  }
};

app.get(config.baseUrl + '/account/isLogin', function(req, res) {
  var u = isLogin();
  if (u) {
    mutil.renderData(res, u);
  } else {
    mutil.renderError(res, {
      code: 500,
      message: '请重新登录!'
    });
  }
});

app.get(config.baseUrl + '/account/logout', function(req, res) {
  AV.User.logOut();
  mutil.renderSuccess(res);
});
app.post(config.baseUrl + '/account/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  if (isLogin()) {
    AV.User.logOut();
  }
  AV.User.logIn(username, password, {
    success: function(user) {
      mutil.renderData(res, user);
    },
    error: function(user, error) {
      mutil.renderError(res, error);
    }
  });
});

app.get(config.baseUrl + '/dict/:key', function(req, res) {
  var key = req.params.key
  var dictData = mconfig.convertDictToList(key);
  if (dictData == null) {
    mutil.renderError(res, {
      code: 404,
      message: 'dict not found'
    });
  }
  mutil.renderData(res, mconfig.convertDictToList(key));
});

app.get(config.baseUrl + '/task/statictics', function(req, res) {
  var u = check_login(res);
  var query = new AV.Query('Task');
  var sway = req.query.sway;

  var dateConfig = {
    start: getTime(new moment(), 'begin', req.query.type).toDate(),
    end : getTime(new moment(), 'end', req.query.type).toDate()
  };

  if(dateConfig.start == null || dateConfig.end == null){
    mutil.renderError(res, {code:500, message:'参数错误!'});
  }else{
    query.greaterThanOrEqualTo('taskDate', dateConfig.start);
    query.lessThanOrEqualTo('taskDate', dateConfig.end);
    query.include('recorder');
    query.include('studio');
    query.find().then(function(results) {
      getStatictics(res, results, sway, dateConfig);
    });
  }
});

function getTime(m, type, scale) {
  if (type == 'begin') {
    m = m.startOf(scale);
  } else if (type == 'end') {
    m = m.endOf(scale);
  }else{
    return null;
  }
  return m;
};

function getStatictics(res, results, sway, dateConfig) {
  var map = {};
  if (sway == 'recorder') {
    var q = new AV.Query('Recorder');
    q.find().then(function(rcs) {
      for (var i = 0; i < rcs.length; i++) {
        map[rcs[i].get('name')] = 0;
      };
      for (var i = 0; i < results.length; i++) {
        var r = results[i].get('recorder');
        var cost = results[i].get('cost');
        if (r.get('name')) {
          map[r.get('name')] = map[r.get('name')] + cost;
        }
      };
      mutil.renderData(res, {values:map,dateConfig:dateConfig});
    });
  } else if (sway == 'studio') {
    var q = new AV.Query('Studio');
    q.find().then(function(rcs) {
      for (var i = 0; i < rcs.length; i++) {
        map[rcs[i].get('name')] = 0;
      };
      for (var i = 0; i < results.length; i++) {
        var r = results[i].get('studio');
        var cost = results[i].get('cost');
        if (r.get('name')) {
          map[r.get('name')] = map[r.get('name')] + cost;
        }
      };
      mutil.renderData(res, {values:map,dateConfig:dateConfig});
    });

  } else if (sway == 'businessType') {
    var tps = mconfig.convertDictToList('businessTypes');
    for (var i = 0; i < tps.length; i++) {
      map[tps[i].text] = 0;
    };
    for (var i = 0; i < results.length; i++) {
      var text = mconfig.getConfigMapByValue('businessTypes', results[i].get('businessType'));
      if (text) {
        map[text.text] = map[text.text] + results[i].get('cost');
      }
    };
     mutil.renderData(res, {values:map,dateConfig:dateConfig});
  } else{
    mutil.renderError(res, {code:500, message:'参数错误'});
  }
  

}



app.post(config.baseUrl + '/task', function(req, res) {
  var u = check_login(res);
  var studio = AV.Object.createWithoutData('Studio', req.body.studio);
  var recorder = AV.Object.createWithoutData('Recorder', req.body.recorder);
  var task = mtask.createTask(req.body, recorder, studio);
  task.set('owner', u);
  task.save().then(function(t) {
    mutil.renderSuccess(res);
  }, function(error) {
    mutil.renderError(res, error);
  });
});
app.put(config.baseUrl + '/task/:id', function(req, res) {
  var u = check_login(res);
  var studio = AV.Object.createWithoutData('Studio', req.body.studio);
  var recorder = AV.Object.createWithoutData('Recorder', req.body.recorder);
  var query = new AV.Query('Task');
  query.get(req.params.id, {
    success: function(task) {
      task.set('recorder', recorder);
      task.set('studio', studio);
      mtask.updateTask(task, req.body);
      saveObject(task, res);
    },
    error: function(error) {
      mutil.renderError(res, error);
    }
  });
});

app.delete(config.baseUrl + '/task/:id', function(req, res) {
  var u = check_login(res);
  var obj = AV.Object.createWithoutData('Task', req.params.id);
  deleteObj(obj, res);
});
app.get(config.baseUrl + '/task/list/:pn', function(req, res) {
  var u = check_login(res);
  var pageNumber = parseInt(req.params.pn);
  var query = new AV.Query('Task');
  var status = parseInt(req.query.status);
  if(status!= 0){
    query.equalTo('taskStatus',status);
  }
  query.equalTo('owner', u);
  query.ascending('taskStatus');
  query.descending('taskDate');
  var pageMap = {};
  query.count().then(function(count) {
    pageMap = concretePageMap(count);
    if (count == 0 || pageNumber > pageMap.totalPageNum) {
      pageMap['values'] = [];
      pageMap['currentPage'] = pageMap.totalPageNum;
      mutil.renderData(res, pageMap);
    } else {
      pageMap['currentPage'] = pageNumber;
      query.include('recorder');
      query.include('studio');
      query.limit(pageSize);
      query.skip(pageSize * (pageNumber - 1));
      query.find({
        success: function(lst) {
          var rlist = [];
          for (var i = 0; i < lst.length; i++) {
            rlist.push(tanformTask(lst[i]));
          };
          pageMap['values'] = rlist;
          mutil.renderData(res, pageMap);
        },
        error: function(error) {
          mutil.renderError(res, error);
        }
      });
    }
  });
});

function tanformTask(t) {
  var recorder = t.get('recorder');
  var studio = t.get('studio');
  return {
    taskDate: t.get('taskDate'),
    content: t.get('content'),
    number: t.get('number'),
    client: t.get('client'),
    businessType: mconfig.getConfigMapByValue('businessTypes', t.get('businessType')),
    taskStatus: mconfig.getConfigMapByValue('taskStatus', t.get('taskStatus')),
    cost: t.get('cost'),
    objectId: t.id,
    updatedAt: t.get('updatedAt'),
    recorder: recorder,
    studio: studio,
    time: t.get('time')
  };
};


function concretePageMap(count) {
  var pmap = {};
  var totalPageNum = parseInt((count - 1) / pageSize) + 1;
  pmap['totalPageNum'] = totalPageNum;
  pmap['totalNum'] = count;
  pmap['pageSize'] = pageSize;
  return pmap;
}

//下面是增删改查字典表的接口
app.get(config.baseUrl + '/studio/list/all', function(req, res) {
  var query = new AV.Query('Studio');
  listAll(query, res);
});
app.post(config.baseUrl + '/studio', function(req, res) {
  var studio = new AV.Object('Studio');
  studio.set('name', req.body.name);
  studio.set('description', req.body.description);
  saveObject(studio, res);
});
app.put(config.baseUrl + '/studio/:id', function(req, res) {
  var query = new AV.Query('Studio');
  query.get(req.params.id, {
    success: function(studio) {
      studio.set('name', req.body.name);
      studio.set('description', req.body.description);
      saveObject(studio, res);
    },
    error: function(error) {
      mutil.renderError(res, error);
    }
  });
});
app.delete(config.baseUrl + '/studio/:id', function(req, res) {
  var obj = AV.Object.createWithoutData('Studio', req.params.id);
  deleteObj(obj, res);
});


app.get(config.baseUrl + '/recorder/list/all', function(req, res) {
  var query = new AV.Query('Recorder');
  listAll(query, res);
});
app.post(config.baseUrl + '/recorder', function(req, res) {
  var recorder = new AV.Object('Recorder');
  recorder.set('name', req.body.name);
  recorder.set('pNumber', req.body.pNumber);
  recorder.set('description', req.body.description);
  saveObject(recorder, res);
});

app.put(config.baseUrl + '/recorder/:id', function(req, res) {
  var query = new AV.Query('Recorder');
  query.get(req.params.id, {
    success: function(recorder) {
      recorder.set('name', req.body.name);
      recorder.set('pNumber', req.body.pNumber);
      recorder.set('description', req.body.description);
      saveObject(recorder, res);
    },
    error: function(eror) {
      mutil.renderError(res, error);
    }
  });
});
app.delete(config.baseUrl + '/recorder/:id', function(req, res) {
  var obj = AV.Object.createWithoutData('Recorder', req.params.id);
  deleteObj(obj, res);
});


function deleteObj(obj, res) {
  obj.destroy().then(function(d) {
    mutil.renderSuccess(res);
  }, function(error) {
    mutil.renderError(res, error);
  });
};

function listAll(query, res) {
  query.find({
    success: function(rs) {
      mutil.renderData(res, rs.reverse());
    },
    error: function(error) {
      mutil.renderError(res, error);
    }
  });
};

function saveObject(obj, res) {
  obj.save({
    success: function(rs) {
      mutil.renderData(res, rs);
    },
    error: function(error) {
      mutil.renderError(res, error);
    }
  });
};



// 最后，必须有这行代码来使 express 响应 HTTP 请求
app.listen({
  "static": {
    maxAge: 604800000
  }
});