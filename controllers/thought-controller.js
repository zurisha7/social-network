const { Thought, User } = require('../models');

const thoughtController = {
    //get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    // get one thought 
        getThougthById ({ params }, res) {
            Thought.findOne({ _id: params.id})
                .populate({ 
                    path: 'reactions',
                    select: '-__v'
                })
                select('__v')
                .then(dbThoughtData => res.json(dbThoughtData))
                .catch(err => {
                    console.log(err);
                    res.sendStatus(400);
                });
        },

    // update a thought
        updateThought({ params, body }, res) {
            Thought.findOneAndUpdate
            ({ _id: params }, body, 
            {new: true, runValidators: true })
                .then(dbThoughtData => {
                    if(!dbThoughtData) {
                        res.status(404).json({ message: 'No Thought with that id!' })
                        return;
                    }
                    res.json(dbThoughtData)
                })
                .catch(err => res.json(err));
    },  

    // create a thought
    createThought({ params, body}, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                { _id: params.pizzaId },
                { $push: {thoughts: _id }},
                {new: true }
                );
            })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' })
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    //add a reaction
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: {reactions: body }},
            { new: true, runValidators: true })
            .then(dbUserData => {
              if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this Id!' });
                return;
              }
              res.json(dbUserData);
            })
            .catch(err => res.json(err));
    }, 

    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if(!deleteThought) {
                    return res.status(404).json({ message: 'No thought with that id!' })
                }
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { thoughts: params.thoughtId }},
                { new: true }
            );
        })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user with that id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    removeReaction({ params}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId }}},
            {new: true }
            )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
        
    }
};

module.exports = thoughtController;