const ProfileModel = require("../models/Profile");

// To get all notifications
module.exports.notifications = async(req, res)=>{
  const userID=req.user.id;
  const User=await ProfileModel.findOne({_id:userID},{notifications:1});
  // remove notifications that have been viewed
  const UserNotifications=User.notifications;
  const notifications= UserNotifications.filter(notification => notification.title!=="Congratulations" || notification.viewed==false);
  const viewedNotifications= notifications.map((notification)=>{
      notification.viewed=true
      return notification;
  });
  await ProfileModel.updateOne({_id:userID}, {$set:{notifications:viewedNotifications}}); 
  if(User)
   res.json({notifications:UserNotifications});
  else 
   res.json({status:"fail"});  
}