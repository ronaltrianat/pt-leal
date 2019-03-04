var express = require('express')
var router = express.Router()
var store = require('store')
var loginUtil = require('../utils/login-utils')
var userUtil = require('../utils/users-utils')
var transactionsUtil = require('../utils/transactions-utils')
var pointsUtil = require('../utils/points-utils')

var sessionChecker = (req, res, next) => {
  if (store.get('user_key') && store.get('user_key').token) {
      res.redirect('/dashboard');
  } else {
      next();
  }    
};

router.get('/', sessionChecker, (req, res, next) => {
  var message = ''
  if(store.get('message')) message = store.get('message').message
  res.render('login', { message: message });
});

router.get('/login', sessionChecker, (req, res, next) => {
  var message = ''
  if(store.get('message')) message = store.get('message').message
  res.render('login', { message: message });
});

router.get('/dashboard', (req, res, next) => {
  if (store.get('user_key') && store.get('user_key').token) {

    var message = ''
    var transactions = {}
    if(store.get('message')) message = store.get('message').message
    if(store.get('transactions')) transactions = store.get('transactions')
       
    res.render('dashboard', { message: message, transactions: transactions } );
    
  } else {
      res.redirect('/login');
  }
  
});


router.get('/signup', function(req, res, next) {
  var message = ''
  if(store.get('message')) message = store.get('message').message
  res.render('signup', { message: message });
});


router.get('/logout', function(req, res, next) {
  store.clearAll()
  res.redirect('/login')
});



/** Iniciar Session **/
router.post('/login', async (req, res) => {
  
  try {
    let resp = await loginUtil.login(req.body)
    if(resp === 1) res.redirect('/dashboard')
    else res.redirect('/login')
  } catch (error) {
    res.redirect('/login')
  }
  
})

/** Registrar Usuario **/
router.post('/signup', async (req, res) => {
  
  try {
    let resp = await userUtil.registerUser(req.body)
    if(resp === 1) res.redirect('/login')
    else res.redirect('/signup')
  } catch (error) {
    res.redirect('/signup')
  }

});


router.post('/create-transaction', async (req, res) => {
  
  try {
    await transactionsUtil.createTransaction(req.body)
    res.redirect('/dashboard')
  } catch (error) {
    res.redirect('/login');
  }

});


router.post('/get-transactions', async (req, res) => {
  
  try {
    await transactionsUtil.getTransactions()
    res.redirect('/dashboard')
  } catch (error) {
    res.redirect('/login');
  }

})


router.post('/update-transaction', async (req, res) => {
  
  try {
    await transactionsUtil.updateTransaction(req.body)
    res.redirect('/dashboard')
  } catch (error) {
    res.redirect('/login');
  }

})

router.post('/get-points', async (req, res) => {

  try {
    await pointsUtil.getPoints()
    res.redirect('/dashboard')
  } catch (error) {
    res.redirect('/login');
  }

})

module.exports = router;
