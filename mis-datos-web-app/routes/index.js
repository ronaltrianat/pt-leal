var express = require('express')
var router = express.Router()
const axios = require('axios');
var store = require('store')

var sessionChecker = (req, res, next) => {
  if (store.get('user_key') && store.get('user_key').token) {
      res.redirect('/dashboard');
  } else {
      next();
  }    
};

router.get('/', sessionChecker, (req, res, next) => {
  res.render('login', {});
});

router.get('/login', sessionChecker, (req, res, next) => {
  res.render('login', {});
});

router.get('/dashboard', (req, res, next) => {
  if (store.get('user_key') && store.get('user_key').token) {

    var message = ''
    if(store.get('message')) message = store.get('message').message
       
      
    res.render('dashboard', { message: message } );
    
  } else {
      res.redirect('/login');
  }
  
});


router.get('/signup', function(req, res, next) {
  res.render('signup', {});
});


router.get('/logout', function(req, res, next) {
  store.clearAll()
  res.redirect('/login')
});



/** Iniciar Session **/
router.post('/login', (req, res) => {
  
  const config = { headers: { 'Content-Type': 'application/json' } }
  
  axios.post('http://localhost:5000/login', req.body, config)
    .then((resp) => {
      
      if(resp && resp.status === 200 && resp.data.code == 1) {
        store.set('user_key', resp.data)
        store.set('user_id', req.body.email)
        res.redirect('/dashboard');
      } else {
        res.redirect('/login');
      }
    })
    .catch((err) => {
      res.redirect('/login');
    })
});

router.post('/signup', (req, res) => {
  
  const config = { headers: { 'Content-Type': 'application/json' } }

  axios.post('http://localhost:5000/users/user', req.body, config)
    .then((resp) => {
      
      if(resp && resp.status === 201 && resp.data.code == 1) {
        res.redirect('/login');
      } else {
        res.redirect('/signup');
      }
    })
    .catch((err) => {
      res.redirect('/signup');
    })
});


router.post('/create-transaction', (req, res) => {
  
  const config = { headers: { 'Content-Type': 'application/json', 'Authorization': store.get('user_key').token } }

  let body = { ...req.body, user_id: store.get('user_id')}
  
  axios.post('http://localhost:5000/transactions/transaction', body, config)
    .then((resp) => {
      
      store.remove('message')
      if(resp && resp.status === 200 && resp.data.code == 1) {
        store.set('message', resp.data)
        res.redirect('/dashboard');
      } else {
        res.redirect('/dashboard');
      }
    })
    .catch((err) => {
      res.redirect('/signup');
    })
});




module.exports = router;
