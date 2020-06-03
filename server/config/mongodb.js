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
    name: {
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
		auth: {
			type: Number,
			default: 0
		}
	},
	invitation: {
		title: {
			type: String,
			required: true,
			unique: true
		},
		content: {
			type: String,
			required: true
		},
		author: {
			type: String,
			required: true
		},
		authorId: {
			type: Number,
			required: true
		},
		invitationId: {
			type: Number,
			required: true
		},
		status: {
			type: Number,
			required: true,
			default: 0
		}
	},
	commet: {
		invitationId: {
			type: Number,
			required: true
		},
		authorId: {
			type: Number,
			required: true
		},
		userId: {
			type: Number,
			required: true
		},
		reply: {
			type: String,
			required: true
		},
		user: {
			type: String,
			required: true
		}
	}
});