var taskStatus ={
  uncompleted: {
    value:1,
    text:'未完成'
  },
  completed: {
    value:2,
    text:'已完成'
  }
};

var businessTypes = {
  cash: {
    value:1,
    text:'现金'
  },
  pos: {
    value:2,
    text:'pos机刷卡'
  },
  alipay: {
    value:3,
    text:'支付宝'
  },
  dianpin:{
    value:4,
    text:'大众点评'
  },
  dianpin_cash:{
    value:5,
    text:'大众点评(现金)'
  }
};

function convertDictToList(key){
  if(key=='taskStatus'){
    return getKeyValueList(taskStatus);
  }else if(key=='businessTypes'){
    return getKeyValueList(businessTypes);
  }
  return null;
}
function getKeyValueList(obj){
  var keys = Object.keys(obj);
  var rlist = [];
  for (var i = 0; i < keys.length; i++) {
    var value = obj[keys[i]].value;
    var text = obj[keys[i]].text;
    rlist.push({value:value, text:text});
  };
  return rlist;
}

function getConfigMapByValue(key, value){
  var obj;
  if(key=='taskStatus'){
    obj = getKeyValueList(taskStatus);
  }else if(key=='businessTypes'){
    obj = getKeyValueList(businessTypes);
  }
  if(!obj){
    return null;
  }
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    if(value == obj[keys[i]].value){
      return obj[keys[i]];
    }
  };
  return null;
}

exports.getConfigMapByValue = getConfigMapByValue;
exports.convertDictToList = convertDictToList;
exports.taskStatus = taskStatus;
exports.businessTypes = businessTypes;