const ProfileModel = require("../models/Profile");

// To get data of a single profile based on userID
module.exports.profileData = async(req,res)=>{    
    const userID=req.body.userID;

    const foundUser=await ProfileModel.findOne({_id:userID});
    if(foundUser)
        res.json({status:"ok", foundUser});
    else{
        res.json({status: "fail"});
    }
}

// To get all data
module.exports.Data = async(req,res)=>{
    const Users=await ProfileModel.find();
    res.json({Users});
}

// To get all notifications
module.exports.notifications = async(req, res)=>{
    const userID=req.cookies.userID;
    const User=await ProfileModel.findOne({_id:userID},{notifications:1});
    res.json({notifications:User.notifications});
}

// To send a request
module.exports.addFriend = async(req,res)=>{
    const friendID=req.body.id;
    const userID=req.cookies.userID;

    // Find User and friend in DB
    const friendData=await ProfileModel.findOne({_id:friendID},{requestRecieved:1,notifications:1,name:1});
    const UserData=await ProfileModel.findOne({_id:userID},{requestSent:1, name:1});
    
    // Adding request recieved in friend's data
    const friendRequestRecieved=friendData.requestRecieved;
    friendRequestRecieved.push(userID);
    const updatedFriend=await ProfileModel.updateOne({_id:friendID}, {$set:{requestRecieved:friendRequestRecieved}});
    
    // Adding request sent in user's data
    const UserRequests=UserData.requestSent;
    UserRequests.push(friendID);
    const updatedUser=await ProfileModel.updateOne({_id:userID}, {$set:{requestSent:UserRequests}}); 

    // Send Notification to friend 
    const Notification={
        title: "Friend request",
        message: "You have recieved a friend request from " + UserData.name,
        friendID: userID,
        hidden: false,
    };
    const friendNotifications=friendData.notifications;
    friendNotifications.push(Notification);
    const updatedFriendNotifications=await ProfileModel.updateOne({_id:friendID}, {$set:{notifications:friendNotifications}});

    res.json({status:"ok"});
}

// If user accepts request
module.exports.requestAccepted = async(req, res)=>{
    // Here friend is the one who sent the request
    const userID=req.cookies.userID;
    const notificationID=req.body.notificationID;
    const friendID=req.body.friendID;

    // Find user & friend in db
    const userData=await ProfileModel.findOne({_id:userID},{notifications:1, friends:1,requestRecieved:1, name:1});
    const friendData=await ProfileModel.findOne({_id:friendID},{notifications:1, friends:1, requestSent:1});

    // Removing request notification from user  account 
    const UserNotifications=userData.notifications;
    const notifications= UserNotifications.filter((notification)=>notification._id!=notificationID);
    const updatedNotifications=await ProfileModel.updateOne({_id:userID}, {$set:{notifications:notifications}});

    // Adding person who sent the request as friend
    const UserFriends=userData.friends;
    UserFriends.push(friendID);
    const updatedFriend=await ProfileModel.updateOne({_id:userID}, {$set:{friends:UserFriends}});

    // Removing friend from request recieved
    const userRequests=userData.requestRecieved;
    const requests= userRequests.filter((request)=>request!=friendID);
    const updatedUserRequests=await ProfileModel.updateOne({_id:userID}, {$set:{requestRecieved:requests}});

    // Adding current user as a friend in friend's account
    const Friendfriend=friendData.friends;
    Friendfriend.push(userID);
    const updatedFriendfriend=await ProfileModel.updateOne({_id:friendID}, {$set:{friends:Friendfriend}});

    // Removing user from request sent of friend's account
    const friendRequestsSent=friendData.requestSent;
    const friendRequests= friendRequestsSent.filter((request)=>request!=userID);
    const updatedFriendRequests=await ProfileModel.updateOne({_id:friendID}, {$set:{requestSent:friendRequests}});

    // Sending notification to friend
    const Notification={
        title: "Congratulations",
        message: userData.name + " just accepted your friend request.",
        friendID: userID,
        hidden: false,
    };
    const friendNotifications=friendData.notifications;
    friendNotifications.push(Notification);
    const updatedFriendNotifications=await ProfileModel.updateOne({_id:friendID}, {$set:{notifications:friendNotifications}});

    res.json({status:"ok"});
}

// If user declines request
module.exports.requestDeclined = async(req, res)=>{
    const userID=req.cookies.userID;
    const notificationID=req.body.notificationID;
    const friendID=req.body.friendID;

    // Findinf user & friend in DB
    const User=await ProfileModel.findOne({_id:userID},{notifications:1, requestRecieved:1, name:1});
    const Friend=await ProfileModel.findOne({_id:friendID},{notifications:1, requestSent:1});

    // Removing Notification from user account
    const UserNotifications=User.notifications;
    const notifications= UserNotifications.filter((notification)=>notification._id!=notificationID);
    const updatedNotifications=await ProfileModel.updateOne({_id:userID}, {$set:{notifications:notifications}});

    // Removing request recieved from user account
    const userRequests=User.requestRecieved;
    const requests= userRequests.filter((request)=>request!=friendID);
    const updatedUserRequests=await ProfileModel.updateOne({_id:userID}, {$set:{requestRecieved:requests}});

    // Removing request sent from friend's account
    const friendRequests=Friend.requestSent;
    const friendrequests= userRequests.filter((request)=>request!=userID);
    const updatedFriendRequests=await ProfileModel.updateOne({_id:friendID}, {$set:{requestSent:requests}});

    res.json({status: "ok"});
}