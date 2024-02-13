const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const pdf = require("html-pdf");
  const { ejsFunction } = require('../views/newCertificateFunction')
  
  // const puppeteer = require('puppeteer');
  // const pdfNew = require('html-pdf-node');
  
  const nodemailer = require('nodemailer');
  
  const transporter = nodemailer.createTransport({
    // service: 'Gmail', // You can also use 'Gmail' for G Suite accounts
    host: 'mail.flaskitsolutions.com',
    port: 587, // or 587 for TLS
    secure: false, // true for 465, false for 587
    auth: {
      user: 'support@flaskitsolutions.com',
      pass: 'Support@2023', // Your email password or an app-specific password
    },
  });
  
  const ejs = require("ejs");
  
  const config = {
    height: "55.7cm",
    width: "35cm",
  };
  //html-pdf-node for pdf generation funciotn
  // exports.generatePdf = async (pathname, params) => {
  //   console.log("hello")
  //   try {
  //     console.log('pathname', pathname);
  //     console.log('params', params);
  
  //     //first fetch the html
  //     const html = ejsFunction(params);
  //     //define the config for pdf
  //     const options = {
  //       format: 'A4',
  //       printBackground: true,
  //       // margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' },
  //     };
  
  //     const pdfBuffer = await pdfNew.generatePdf({ content: html }, options);
  
  //     console.log("PDF generated successfully.");
  
  //     return pdfBuffer;
  //   } catch (error) {
  //     console.error("Error generating PDF:", error);
  //     throw error;
  //   }
  // };
  
  // //puppeteer for pdf generation function
  // exports.htmlToPdfBufferPuppeteer = async (pathname, params) => {
  //   try {
  //     //first create the html for the pdf
  //     const html = ejsFunction(params);
  //     // console.log("html file:-",html)
  //     //now starts the puppeteer process to generate the pdf from html
  //     //first launch a headless browser
  //     // const browser = await puppeteer.launch({headless : "new"});
  //     const browser = await puppeteer.launch()
  //     //now open a new page
  //     const page = await browser.newPage();
  //     //set the html content of the page
  //     // await page.setContent(html);
  //     // wait until there are no more network connections
  //     // await page.setContent(html, { waitUntil: 'networkidle0' });
  //     // wait until load event
  //     await page.setContent(html, { waitUntil: 'load' });
  //     // Generate PDF and save to file
  //     // await page.pdf({ path: outputPath, format: 'A4' });//save the pdf 
  //     //generate the pdf buffer
  //     const pdfBuffer = await page.pdf({ format: "A4" });
  //     //close the broser
  //     await browser.close();
  
  //     console.log("PDF generated successfully");
  //     return pdfBuffer;
  
  //   } catch (error) {
  //     console.error("Error generating PDF:", error);
  //   }
  // }
  
  exports.htmlToPdfBuffer = async (pathname, params) => {
    try {
      console.log('pathname', pathname);
      console.log('params', params)
      // const html = await ejs.renderFile(pathname, params);
      const html = ejsFunction(params)
      return new Promise((resolve, reject) => {
        pdf.create(html, config).toBuffer((err, buffer) => {
          if (err) {
            console.error("Error generating PDF:", err);
            reject(err);
          } else {
            console.log("PDF generated successfully.");
             // Convert buffer to Buffer if it's an array
          const pdfBuffer = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
          resolve(pdfBuffer);
            // resolve(buffer);
          }
        });
      });
    } catch (ejsError) {
      console.error("Error rendering EJS template:", ejsError);
      throw ejsError;
    }
  };
  
  
  exports.sendAttachment = async (to, subject, html, attachment) => {
    const mailOptions = {
      from: 'pos@flaskitsolutions.com',
      to: to,
      subject: subject,
      html: "",
      attachments: attachment,
    };
  
    try {
      transporter.sendMail(mailOptions).then((data) => {
        console.log("Email sent");
      }).catch((err) => {
        console.error(err);
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  exports.sendEmail = async (to, subject, html, attachment) => {
    const mailOptions = {
      from: 'support@flaskitsolutions.com',
      to: to,
      subject: subject,
      html: html,
      attachments: attachment,
    };
  
    try {
      transporter.sendMail(mailOptions).then((data) => {
        console.log("Email sent");
      }).catch((err) => {
        console.error(err);
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  
  
  
  const FCM = require('fcm-node');
  const { event } = require("jquery");
  const serverKey = "AAAA9F4c3Vw:APA91bFZE54O07eSDh8s80dIUAJSwxKqZdKhmP_0peUMsIaPHWG_bluRs1wK-fzGhQMRiFcu2YhNaYQ-S5FsOI5EBepDwCK9lCU4oibE-EQhQ5MVtb3DhidddhZQC8wKa4mUzf1RE2Hi";
  const fcm = new FCM(serverKey);
  
  exports.send_notification = async (token, body, title, data) => {
  
    var message = {
      to: token,
      // collapse_key: 'your_collapse_key',
  
      notification: {
        title: title,
        body: body
      },
      data: {
        data: data
      }
  
    };
  
    fcm.send(message, function (err, response) {
      if (err) {
        // console.log(err);
        console.log("Something has gone wrong!");
      } else {
        console.log("Successfully sent with response: ", response);
      }
    });
  }