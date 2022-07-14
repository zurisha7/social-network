const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username: {
        type: String,
        unique: true,
        required: "This username not found",
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
    ]
  }, {
    friends: [
        {
        type: Schema.Types.ObjectId,
        ref: 'User'

        }
    ]
},
  {
    //allows user model to use virtuals and getters
    toJSON: {
        virtuals: true,
    },
        //prevents duplicate id's
    id: false
    } 
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });


const User = model('User', UserSchema )

module.exports = User;