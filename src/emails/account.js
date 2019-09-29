const sgMail = require('@sendgrid/mail') 

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeMail = (email , name) => {
    // console.log("mail send")
    sgMail.send({
    to : email,
    from : 'badalhuria8@gmail.com',
    subject : 'Thanks For Joining in!',
    text : `Welcome to app, ${name} . Let me know how you get along with the app` 
})
}

const sendCancelationMail = (email , name) => {
    // console.log("asfdasf" ,email,log)
    sgMail.send({
    to : email,
    from : 'badalhuria8@gmail.com',
    subject : 'Account Deleted!',
    text : `Sorry to hear about that, ${name} . Let me know why you are cancelling your account. See you soon again` 
})
}

module.exports ={ 
    sendWelcomeMail,
    sendCancelationMail
}