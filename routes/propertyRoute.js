const express = require('express')
const router = express.Router()

const { protectJwt } = require('../middleware/authMiddleware');
const {
    getAllProperty,
    deleteProperty,
    updateProperty,
    createProperty,
    getPropertyList,
} = require('../controller/propertyController')



router.get('/', protectJwt, getAllProperty)
router.get('/allpropertieslist', protectJwt, getPropertyList)
router.post('/', protectJwt, createProperty,)



router.put('/:id', protectJwt, updateProperty)
router.delete('/:id', protectJwt, deleteProperty)



module.exports = router