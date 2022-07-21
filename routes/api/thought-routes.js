const  router = require('express').Router()
const {
    getAllThoughts,
    getThoughtById, 
    updateThought,
    createThought,
    addReaction,
    removeThought,
    removeReaction
} = require('../../controllers/thought-controller');

//api/thoughts
router.route('/')
        .get(getAllThoughts);

    
//api/thoughts/:thoughtId
    router.route('/:thoughtId')
        .get(getThoughtById)
        .put(updateThought)

// api/thoughts/<userId>
router.route('/:userId')
    .post(createThought)

// api/thoughts/userId/thoughtId
router.route('/:userId/:thoughtId')
     .put(addReaction)
    .delete(removeThought);

router.route('/:userId/:thoughtId/:reactionId')
    .delete(removeReaction);


module.exports = router;    