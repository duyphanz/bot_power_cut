
var CronJob = require('node-cron');

 CronJob.schedule('* * * * *', function(){
    console.log('running a task every minute');
  });
 