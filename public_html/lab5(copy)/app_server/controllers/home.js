/* GET 'home info' page */


var Review = require('../models/review');;

var msg = '';
var errors = [];

function successCB(res, page, title, msg){
     res.render(page, { 
        title: title,
        message : msg
    });        
}

function errorsCB(req, res, page, title){
     res.render(page, { 
        title: title,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        department: req.body.department,
        startDate: req.body.startDate,
        jobTitle: req.body.jobTitle,
        salary: req.body.salary,
        error: errors
    });        
}

function validateInputs(req)
        {
            if (req.body.firstName === "")
            {
                errors.push("First Name is required");  
            }
            if (req.body.lastName === "")
            {
                errors.push("Last Name is required");
            }
            if (req.body.department === "")
            {
                errors.push("Department is required");
            }
            if (req.body.startDate === "")
            {
                errors.push("Start Date is required");
            }
            if (req.body.jobTitle === "")
            {
                errors.push("Job Title is required");
            }
            if (req.body.salary === "")
            {
                errors.push("Salary is required");
            }
        }

module.exports.home = function(req, res){
    
    if (req.method === 'POST') {
        
        errors.length = 0;
        
        validateInputs(req);
        if (errors.length > 0)
        {            
            errorsCB(req, res, 'index', 'Home');
        }
        else
        {
            Review.create({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              department: req.body.department,
              startDate: req.body.startDate,
              jobTitle: req.body.jobTitle,
              salary: req.body.salary
            },function (err) {           
               // saved!
               successCB(res, 'index', 'Home', 'Employee Saved');
            });
        } 
    } else {
         res.render('index', { 
            title: 'Home',
            message : msg
        });
    }   
    
 
};

module.exports.view = function(req, res){
    
     var id = req.params.id,
         removed = '';
 
    function finish() {     
       Review
       .find()
       .exec(function(err, results){

               res.render('view', { 
                   title: 'View Results',
                   results : results,
                   removed : removed
               });
       });
    }
    
     if ( id ) {
         
         var removePromise = new Promise(
            function (resolve, reject) { 
                
                Review.remove({ _id: id }, function (err) {
                   if (!err) {
                        resolve(' has been removed'); // success
                    } else {
                        reject(' has not been removed'); // failure
                    }
               });                
                
            });
         
         
             removePromise.then(function(result) {
                 removed = id + result;
                 finish(); 
             }, function(result) {
                 removed = id + result;
                 finish();  
             });
           
                
     } else {
      finish();
    }
     
     
    
};



module.exports.update = function(req, res){
    
    var id = req.params.id;
    errors.length = 0;
    if (req.method === 'POST') {
         errors.length = 0;
         id = req.body._id;
         var query = { '_id': req.body._id };
         var update = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          department: req.body.department,
          startDate: req.body.startDate,
          jobTitle: req.body.jobTitle,
          salary: req.body.salary
        };
        
        var options = {error: errors};
        var callback = function(){
            res.render('index', { 
            title: 'Home',
            message : 'ID: ' + id + ' Updated Successfully!'})
        };
        
        validateInputs(req);
        if (errors.length > 0)
        {               
            findID();
        }
        else
        {
            Review.update(query, update, options, callback);
        }
        
        
     }
    
    function findID() {
    Review
    .findOne({ '_id': id })
    .exec(function(err, results){
    
         if ( results ) {
            res.render('update', { 
                title: 'Update Results',
                results : results,
                error: errors
            });
        } else {
             res.render('notfound', { 
                message: 'Sorry ID not found'
            });
        }
           
    });
    }
    
    findID();
};
