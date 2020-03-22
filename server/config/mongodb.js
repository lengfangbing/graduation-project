const Mongo = require('node-mongoose');
Mongo.config({
  user: 'root',
  password: '920627',
  hostnanme: '127.0.0.1',
  port: '27017',
  db: 'graduation-project'
});
module.exports = new Mongo({
  user: {
    userName: {
      type: String,
      required: true,
      unique: true
    },
    userId: {
      type: Number,
      required: true,
      unique: true,
      index: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true
    }
  }
});