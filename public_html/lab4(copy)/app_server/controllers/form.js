
function formView(req, res) {
    
     res.render('form', { 
         title: 'Form Page', 
         message: 'Please fill in the following information' 
     });
}

function formPost(req, res) {
    
    if (req.method === 'POST') {
       res.render('results', { 
            title : 'Data',
            name: req.body.name,
            email: req.body.email,
            comments: req.body.comments
        });       
    } else {
         res.render('results', { 
            title : 'Form Post Page',
            author: 'No Author Found'
        });
    }   
}

/* Set the module class to have functions available for other files. */
module.exports.formView = formView;
module.exports.formPost = formPost;

