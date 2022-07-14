const { Schema, model, Types } = require('mongoose');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: 'Please enter a reaction!',
            validate: [({ length }) => length <= 280, 'Thought should between 1 and 280 characters.']

        },
        username: {
            type: String, 
            required: 'Please enter a username!',
        },
            
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
)
const ThoughtSchema = new Schema(
    {   
    thoughtText: {
        type: String,
        required: 'Please enter a thought!',
        validate: [({ length }) => length <= 128, 'Thought should between 1 and 128 characters.']
    },
    createdAt: { 
        type: Date,
        default: Date.now
    },
    username: {
        type: String, 
        required: 'Please say who had this thought!'
    },
    reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true
    }
}
);


ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

const Thought = model('Thought', ThoughtSchema);


module.exports = Thought;