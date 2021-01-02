User Schema 
{   
    "userPrimaryKey":"",
    "first-name": name,
    "last-name": name,
    "email": name,
    "phoneNumber": name,
    "password:"",
    "profile-image":"" // Near Future,
     Gender: ""
}

[] - Allow Users to create a profile
[] - Allow Users to delete a profile 
[] - Allow User  to update a profile
[] - Allow Users to Read A Profile 


QuoteId Schema 
{
    "QuoteId":"",
    Author:"",
    "Quote":quote,
    "date":date
    userFk: userFk,
}

[] - Allow Users to create a Quote
[] - Allow Users to delete a Quote 
[] - Allow User  to update a Quote
[] - Allow Users to Read A Quote 


Comment:{
    "QuoteId":"",
    comment:"",
    date:date,
    userId: userId
}