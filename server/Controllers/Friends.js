const ProfileModel = require("../models/Profile");

// To get all notifications
module.exports.notifications = async(req, res)=>{
    const userID=req.cookies.userID;
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

// To get all friends
module.exports.Friends = async(req,res)=>{
    const ID=req.cookies.userID;
    const User=await ProfileModel.findOne({_id:ID},{friends:1});
    res.json({status:"ok", friends:User.friends});
}

// To send a request
module.exports.addFriend = async(req,res)=>{ 
    const friendID=req.body.id;
    const userID=req.cookies.userID;

    // Checking if user is trying to send request to themselves(by mistake)
    if(userID==friendID){
        res.json({status:"You can not send yourself requests"});
        return;
    }

    // Find User and friend in DB
    const friendData=await ProfileModel.findOne({_id:friendID},{requestRecieved:1,requestSent:1, notifications:1, friends:1, name:1, image: 1});
    const UserData=await ProfileModel.findOne({_id:userID},{requestSent:1, requestRecieved:1,notifications:1, friends:1, name:1, image:1});

    // Checking if user is already friends with friend
    if(friendData.friends.includes(userID)){
        res.json({status:"User is already a friend!"});
        return;
    }

    // Checking if user has already sent request
    if(friendData.requestRecieved.includes(userID)){
        res.json({status:"Friend request already sent."});
        return;
    }
    
    // Checking if the user has already recieved request from the friend
    if(friendData.requestSent.includes(userID)){
        // Adding person who sent the request as friend
        const UserFriends=UserData.friends;
        UserFriends.push(friendID);
        const updatedFriend=await ProfileModel.updateOne({_id:userID}, {$set:{friends:UserFriends}});

        // Removing friend from request recieved
        const userRequests=UserData.requestRecieved;
        const requests= userRequests.filter((request)=>request!=friendID);
        const updatedUserRequests=await ProfileModel.updateOne({_id:userID}, {$set:{requestRecieved:requests}});
    
        // Removing request notification from user  account 
        const UserNotifications=UserData.notifications;
        const notifications= UserNotifications.filter((notification)=>notification.friendID!=friendID);

        // Sending notification to user
        const userNotification={
            title: "Congratulations",
            message: friendData.name + " just accepted your friend request.",
            friendID: friendID,
            viewed: false,
            image: friendData.image,
        };
        const userNotifications=notifications;
        userNotifications.unshift(userNotification);
        const updatedUserNotifications=await ProfileModel.updateOne({_id:userID}, {$set:{notifications:userNotifications}});
        
        // Sending notification to friend
        const friendNotification={
            title: "Congratulations",
            message: UserData.name + " just accepted your friend request.",
            friendID: userID,
            viewed: false,
            image: UserData.image,
        };
        const friendNotifications=friendData.notifications;
        friendNotifications.unshift(friendNotification);
        const updatedFriendNotifications=await ProfileModel.updateOne({_id:friendID}, {$set:{notifications:friendNotifications}});

        // Adding current user as a friend in friend's account
        const Friendfriend=friendData.friends;
        Friendfriend.push(userID);
        const updatedFriendfriend=await ProfileModel.updateOne({_id:friendID}, {$set:{friends:Friendfriend}});

        // Removing user from request sent of friend's account
        const friendRequestsSent=friendData.requestSent;
        const friendRequests= friendRequestsSent.filter((request)=>request!=userID);
        const updatedFriendRequests=await ProfileModel.updateOne({_id:friendID}, {$set:{requestSent:friendRequests}});

        res.json({status:"ok"});
        return;
    }

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
        viewed: false,
        image: UserData.image,
    };
    const friendNotifications=friendData.notifications;
    friendNotifications.unshift(Notification);
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
    const userData=await ProfileModel.findOne({_id:userID},{notifications:1, friends:1,requestRecieved:1, name:1, image:1});
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
        viewed: false,
        image: userData.image,
    };
    const friendNotifications=friendData.notifications;
    friendNotifications.unshift(Notification);
    const updatedFriendNotifications=await ProfileModel.updateOne({_id:friendID}, {$set:{notifications:friendNotifications}});

    res.json({status:"ok"});
}

// If user declines request
module.exports.requestDeclined = async(req, res)=>{
    const userID=req.cookies.userID;
    const notificationID=req.body.notificationID;
    const friendID=req.body.friendID;

    // Finding user & friend in DB
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
    const friendrequests= friendRequests.filter((request)=>request!=userID);
    const updatedFriendRequests=await ProfileModel.updateOne({_id:friendID}, {$set:{requestSent:friendrequests}});

    res.json({status: "ok"});
}

module.exports.removeFriend = async(req,res)=>{
    const friendID=req.body.friendID;
    const userID=req.cookies.userID;

    // Finding user & friend in DB
    const User=await ProfileModel.findOne({_id:userID},{friends:1});
    const Friend=await ProfileModel.findOne({_id:friendID},{friends:1});

    // Adding person who sent the request as friend
    const UserFriends=User.friends;
    const updatedUserFriends= UserFriends.filter((friend)=>friend!=friendID);
    const updatedUser=await ProfileModel.updateOne({_id:userID}, {$set:{friends:updatedUserFriends}});
    
    // Adding current user as a friend in friend's account
    const Friendfriend=Friend.friends;
    const updatedFriendFriends= Friendfriend.filter((friend)=>friend!=userID);
    const updatedFriend=await ProfileModel.updateOne({_id:friendID}, {$set:{friends:updatedFriendFriends}});

    res.json({status:"ok"});
}