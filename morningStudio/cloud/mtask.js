var Task = AV.Object.extend('Task');


function createTask(reqBody, recorder, studio){
    var contact = new AV.Object('Task');
    contact.set('recorder', recorder);
    contact.set('studio', studio);
    return updateTask(contact, reqBody);
};

function updateTask(task,reqBody){
  var taskDate = new Date(reqBody.taskDate);
  taskDate.setMinutes(2);
  task.set('client',reqBody.client);
  task.set('taskDate', taskDate);
  task.set('cost', reqBody.cost);
  task.set('businessType', reqBody.businessType);
  task.set('content', reqBody.content);
  task.set('taskStatus', reqBody.taskStatus);
  task.set('time', reqBody.time);
  return task;
}

exports.updateTask = updateTask;
exports.createTask = createTask;
