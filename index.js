const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.post("/send-email", async (req, res) => {
  try {
    const { yourName, name, email, phone, message } = req.body;
    const templatePath = path.join(__dirname, "emailTemplate.html");
    let template = fs.readFileSync(templatePath, "utf-8");
    template = template.replace("{{yourName}}", yourName) .replace("{{name}}", name) .replace("{{email}}", email) .replace("{{phone}}", phone) .replace("{{message}}", message) .replace("{{dateTime}}", new Date().toLocaleString());

    //nodemailer connection
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user:process.env.USER,
        pass:process.env.PASS
      },
    });

    const mailData = {
      from:process.env.FROM,
      to:process.env.TO,
      subject: "Sample Email",
      html: template,
    };

    await transporter.sendMail(mailData);

    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
