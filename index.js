const express=require("express");
const mongoose=require("mongoose");
const app=express();
app.use(express.json());
require("dotenv").config();
const port=process.env.PORT || 3000;
const nodemailer=require("nodemailer");


async function sendEmail(name,email,phone,message,dateTime){
    try{

//Connection 
const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"mnhl3755@gmail.com",
        pass:"ighx ftcs vwhh ykzo"
    }
});

const mailData={
    from:"mnhl3755@gmail.com",
    // to:"info.pakhims@gmail.com",
    to:"mnhl3755@gmail.com",
    subject:"Sample Email",
    html:`
  <title>New Contact Form Submission</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f4f4;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#f4f4f4; padding:20px 0;">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="20" style="background:#ffffff; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td align="center" style="background:#0073e6; color:#ffffff; font-size:20px; font-weight:bold; border-radius:8px 8px 0 0;">
              :envelope_with_arrow: New Contact Form Submission
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="color:#333333; font-size:15px; line-height:1.6;">
              <p>Hello <strong>${name}</strong>,</p>
              <p>You have received a new message from your portfolio contact form:</p>
              <table width="100%" border="0" cellspacing="0" cellpadding="8" style="background:#f9f9f9; border-radius:6px; margin:15px 0;">
                <tr>
                  <td><strong>bust_in_silhouette: Name:</strong></td>
                  <td>${name}</td>
                </tr>
                <tr>
                  <td><strong>e-mail: Email:</strong></td>
                  <td>${email}</td>
                </tr>
                <tr>
                  <td><strong>iphone: Phone:</strong></td>
                  <td>${phone}</td>
                </tr>
                <tr>
                  <td valign="top"><strong>speech_balloon: Message:</strong></td>
                  <td>${message}</td>
                </tr>
              </table>
              <p><em>alarm_clock: Submitted on: ${dateTime}</em></p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td align="center" style="font-size:12px; color:#888888; border-top:1px solid #EEEEEE; padding-top:10px;">
              This message was sent from your portfolio website.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

}

const result=await transporter.sendMail(mailData);
console.log("send mail data successfully",result);
    }
    catch(err){
        console.error("Email not send", err);
    }
};

sendEmail('Sana','sna@gmail.com','0309-2783563','Hello! This is a test message.', new Date().toLocaleString());


//Mongodb connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Mongodb Connected"))
.catch(err=>console.log("error:",err));


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})