const { mongo, default: mongoose } = require("mongoose");
const User = require("../models/user");

exports.fetchInbox = (req, res) => {
  const userId = mongo.ObjectId(req.userId);
  User.findById(userId)
    .then((user) => {
      res.status(200).json({
        message: "Inbox fetched",
        inbox: user.inbox,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Server is Down,Sry for Inconvinence",
      });
    });
};

exports.fetchSentmessage = (req, res) => {
  const userId = mongo.ObjectId(req.userId);
  User.findById(userId)
    .then((user) => {
      res.status(200).json({
        message: "Sent messages fetched",
        sent: user.sent,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Server is Down,Sry for Inconvinence",
      });
    });
};

exports.postSendMessage = (req, res) => {
  const userId = mongo.ObjectId(req.userId);

  const from = req.body.from;
  const to = req.body.to;
  const subject = req.body.subject;
  const message = req.body.message;
  const Message = {
    from: from,
    to: to,
    subject: subject,
    message: message,
    important: false,
  };
  let fromUser;
  let toUser;
  User.findById(userId)
    .then((user) => {
      fromUser = user;
      return User.find({ email: to });
    })
    .then((user) => {
      toUser = user[0];
    })
    .then(() => {
      fromUser.sent.unshift(Message);

      if (fromUser.email === toUser.email) {
        fromUser.inbox.unshift(Message);
      } else {
        toUser.inbox.unshift(Message);
      }

      fromUser.save();
      toUser.save();

      res.status(200).json({
        message: "Email sent successfully",
        from: fromUser,
        to: toUser,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Unable to Sent Email",
      });
    });
};

exports.deleteInboxById = (req, res) => {
  const msgid = req.params.id;
  const userId = mongo.ObjectId(req.userId);

  User.findOneAndUpdate({ _id: userId }, { $pull: { inbox: { _id: msgid } } })
    .then((user) => {
      res.status(202).json({
        message: `${msgid} succefully deleted`,
        inbox: user.inbox,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Server is Down,Sry for Inconvinence",
      });
    });
};

exports.deleteSentbyId = (req, res) => {
  const msgid = req.params.id;
  const userId = mongo.ObjectId(req.userId);
  User.findOneAndUpdate(
    { _id: userId },
    { $pull: { sent: { _id: mongo.ObjectId(msgid) } } }
  )
    .then((user) => {
      res.status(202).json({
        message: `${msgid} succefully deleted`,
        sent: user.sent,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Invalid id",
      });
    });
};

exports.sentstarredmessage = (req, res) => {
  const msgid = req.params.id;
  const userId = mongo.ObjectId(req.userId);
  User.findOneAndUpdate(
    { _id: userId, "sent._id": mongo.ObjectId(msgid) },
    { $set: { "sent.$.important": true } }
  )
    .then((user) => {
      res.status(202).json({
        message: `${msgid} succefully marked as important`,
        sent: user.sent,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Invalid id",
      });
    });
};

exports.inboxstarredmessage = (req, res) => {
  const msgid = req.params.id;
  const userId = mongo.ObjectId(req.userId);
  User.findOneAndUpdate(
    { _id: userId, "inbox._id": mongo.ObjectId(msgid) },
    { $set: { "inbox.$.important": true } }
  )
    .then((user) => {
      res.status(202).json({
        message: `${msgid} succefully marked as important`,
        inbox: user.inbox,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Invalid id",
      });
    });
};
