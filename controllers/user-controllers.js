const { User } = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts', 
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then( dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // get one user
    getUserById({ params }, res) {
        User.findOne({ _id: params.userId })
            .populate({
                path: 'thoughts',
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // add a new user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    // update a user
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.userId }, body, {new: true, runValidators: true })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user with this id!' })
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    //delete a user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.userId })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' })
                    return; 
                }
                    res.json(dbUserData)
            })   
                    .catch(err => res.json(err));
    }, 

    removeFriend({ params, body }, res) {
        User.findOneAndUpdate(
         { _id: params.userId },
         {$pull: { friends: body }},
         { runValidators: true, new: true }
        )
        .then(dbUserData => {
         if(!dbUserData) {
             return res.status(404).json({ message: 'No User with that id' })
         }
         res.json(dbUserData);
        })
        .catch(err => {
         console.log(err);
         res.status(500).json(err);
        });
     },

     addFriend({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: body } },
            { runValidators: true, new: true }
          )
            .then(dbUserData => {
              if (!dbUserData) {
                return res.status(404).json({ message: 'No user with this id!' });
              }
              res.json(dbUserData);
            })
            .catch(err => {
              console.log(err);
              res.status(500).json(err)   
            });     
}
};

module.exports = userController;