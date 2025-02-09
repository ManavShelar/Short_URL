const express = require('express')
const { handleGetShortURL, handleRedirectURL, handleusersignup, handleLoginUser } = require("../controller/url");
const router = express.Router()

router.post('/signup',handleusersignup)

router.post('/',handleGetShortURL)

router.get('/:shortID',handleRedirectURL)

router.post('/login',handleLoginUser)

module.exports = router;