var express = require('express');
var router = express.Router();
var Contact = require('../model/contact');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('contact page');
});

router.get('/show', function(req, res, next) {
  Contact.find(function(err, data){
		if(err) throw err;
		//res.json(data);
		res.render("show.twig", {data});
		
  });
});

//Ouvrir formulaire d'ajout
router.get('/addform', function(req, res, next) {
  res.render("addForm.twig");
});
//Action insert Data DB
router.post('/addaction', function(req, res, next){

			//	res.json(req.body);
			var c = new Contact({
			FullName : req.body.fullname, 
			Phone : req.body.phone
			});
			c.save();
			res.redirect("/contact/show");
});
//Supprimer Contact
router.get('/delete/:id', function(req, res, next){
	
	var ident = req.params.id;
	Contact.findOneAndRemove({_id : ident}, function(err){
			
		res.redirect('/contact/show');
	});
	
});
//Update Contact

router.get('/update/:id', function(req, res, next) {
	var ident = req.params.id;
	Contact.findById({_id : ident}, function(err, doc){
		if(err) throw err;
		  res.render("updateForm.twig", {doc});	
	});
});
router.post('/putaction', function(req, res, next) {
	var ident = req.body.secretid;
	Contact.findById({_id : ident}, function(err, doc){
		doc.FullName = req.body.fullname,
		doc.Phone = req.body.phone
		  doc.save();
	});
	res.redirect('/contact/show');
});



router.post('/search', function(req, res, next) {
  Contact.find({FullName : req.body.search, Phone : req.body.pn}, function(err, data){
		if(err) throw err;
		//res.json(data);
		res.render("show.twig", {data});
		
  });
});



module.exports = router;
