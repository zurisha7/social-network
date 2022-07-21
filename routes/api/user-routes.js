const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser, 
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controllers');

// api/users
    router.route('/')
        .get(getAllUsers)
        .post(createUser);

// api/users/:id
    router.route('/:userId')
        .get(getUserById)
        .put(updateUser)
        .delete(deleteUser); 

    router.route('/:userId/friends')
        .put(addFriend);

// api/users/userId/friendId
    router.route('/:userId/:friendId')
       .delete(removeFriend);

    module.exports = router;