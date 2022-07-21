const { Schema, model } = require('mongoose');

const FriendSchema = new Schema(
  {
    friendName: {
      type: String,
      required: "Please enter a friend name!",
      trim: true
    }
  }
)

const UserSchema = new Schema(
  {
    username: {
        type: String,
        unique: true,
        required: "Please enter a username!",
        trim: true
    },
    email: {
        type: String,
        required: 'This email not found',
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    // Allows thoughts and friends to be included in the user model
    thoughts: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
        }
    ],
    friends: [ FriendSchema ]
},
  {
    //allows user model to use virtuals
    toJSON: {
        virtuals: true,
        getters: true
    },
        //prevents duplicate id's
    id: false
  }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });


const User = model('User', UserSchema )

module.exports =   User ;