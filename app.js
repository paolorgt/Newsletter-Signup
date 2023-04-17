
const mailchimp = require("@mailchimp/mailchimp_marketing");
const https = require('https');

const express = require("express");
const bodyParser = require("body-parser");
const request =  require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname +"/signup.html");
});

app.post("/", function(req,res){
    
const firstName = req.body.fName;
const lastName = req.body.lname;
const email = req.body.email;

var data = {
    members: [
     {
        email_address: email,
        status: "subscribed",
        merge_fields: {
            FNAME : firstName,
            LNAME: lastName
        }
     }   
    ]
};
const jsonData = JSON.stringify(data);

const url = "https://us17.api.mailchimp.com/3.0/lists/e4ae8b5e2b";

const options = {
    method: "POST",
    auth:"paolo1:08e371cdbfd0f20af94279ca67852257-us17"
}

  const request = https.request(url,options,function(response){
   


    if(response.statusCode === 200){
        res.send(__dirname + "/success.html");
    }else{
        res.send(__dirname + "/failure.html");
    }
    
    response.on("data", function(data){
        console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();

});

app.post("/failure", function(req, res){
    res.redirect("/signup.html")
 })
 
 app.get("/failure.html", function(req, res){
    res.sendFile(__dirname + "/failure.html")
 })
 
 
 
app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
});


// // API Key MailChimp


// // 

// // List IdleDeadlin

// // 


