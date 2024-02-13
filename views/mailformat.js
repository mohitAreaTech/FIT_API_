const User = require("../model/User")

exports.SendEmployeeIDPASS = (name ,designationName,  email , generatePassword ,employee,  message)=>{
   return`<!DOCTYPE html>

<html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">

<head>
    <title>Alnafeeseh Invoice</title>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
    <!--[if !mso]><!-->

    <link rel="shortcut icon" type="image/x-icon" href="./assets/images/favicon.ico">

    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css" />
    <!--<![endif]-->
    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 0;
        }

        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
        }

        #MessageViewBody a {
            color: inherit;
            text-decoration: none;
        }

        p {
            line-height: inherit
        }

        .desktop_hide,
        .desktop_hide table {
            mso-hide: all;
            display: none;
            max-height: 0px;
            overflow: hidden;
        }



        table.my-table {
            border-collapse: collapse;
            margin-top: 10px;
            font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;
            text-align: center;
        }

        .my-table tbody,
        .my-table td,
        .my-table tfoot,
        .my-table th,
        .my-table thead,
        .my-table tr {
            border-color: #000000;
            border-style: solid;
            border-width: 0px;
            border-collapse: collapse;
            padding: 10px;
        }

        table.my-table>:not(caption)>*>* {
            /* padding: 0.5rem 0.5rem; */
            background-color: #ffffff;
            border-width: 1px;
        }

        table.my-table {
            border-collapse: collapse;
            margin-bottom: 10px;
        }


        table.my-table th {
            background: #bbbbbb;
        }

        @media screen and (max-width:920px) {
            .desktop_hide table.icons-inner {
                display: inline-block !important;
            }

            .icons-inner {
                text-align: center;
            }

            .icons-inner td {
                margin: 0 auto;
            }

            .fullMobileWidth,
            .row-content {
                width: 100% !important;
            }

            .mobile_hide {
                display: none;
            }

            .stack .column {
                width: 100%;
                display: block;
            }

            .mobile_hide {
                min-height: 0;
                max-height: 0;
                max-width: 0;
                overflow: hidden;
                font-size: 0px;
            }

            .desktop_hide,
            .desktop_hide table {
                display: table !important;
                max-height: none !important;
            }

        }
    </style>
</head>

<body style="margin: 0; background-color: #ffffff; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;" width="100%">
        <tbody>
            <tr>
                <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-9"
                        role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; width:580px; margin-top: 50px; border: 1px solid #62AAAE;">
                        <tbody>
                            <tr>
                                <td>
                                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1"
                                        role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                        width="100%">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <table align="center" border="0" cellpadding="0" cellspacing="0"
                                                        class="row-content stack" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; border-radius: 0; width:580px"
                                                        width: 580;>
                                                        <tbody>
                                                            <tr>
                                                                <td class="column column-1"
                                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                                    width="25%">
                                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                                        class="image_block block-2" role="presentation"
                                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                        width="100%">
                                                                        <tr>
                                                                            <td class="pad"
                                                                                style="width:100%;padding-right:0px;padding-left:0px;padding-top:20px;padding-bottom:20px; background: #72CCD1;">
                                                                                <div align="center" class="alignment"
                                                                                    style="line-height:10px"><img
                                                                                        src="https://api.flaskitsolutions.com/assets/img/fit_logo.png"
                                                                                        style="display: block; height: auto; border: 0; width: 300px; max-width: 100%;" />
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1"
                                        role="presentation"
                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; padding: 20px 0px;"
                                        width="100%">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <table align="center" border="0" cellpadding="0" cellspacing="0"
                                                        class="row-content stack" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; border-radius: 0; width:580px"
                                                        width: 580;>
                                                        <tbody>
                                                            <tr>
                                                                <td class="column column-2"
                                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                                    width="100%">
                                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                                        class="text_block block-2" role="presentation"
                                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                                        width="100%">
                                                                        <tr>
                                                                            <td class="pad"
                                                                                style="padding-bottom:15px;padding-left:30px;padding-right:30px;padding-top:15px;">
                                                                                <div style="font-family: sans-serif">
                                                                                    <div class=""
                                                                                        style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 21.6px; color: #000000; line-height: 1.8;">
                                                                                        <p
                                                                                            style="margin: 0; font-size: 16px; text-align: left; mso-line-height-alt: 32.4px;">
                                                                                            <span
                                                                                                style="font-size:18px; margin-bottom: 10px ;display:block;"><strong><span
                                                                                                        style="text-transform: capitalize;">
                                                                                                        Congratulations ${name},
                                                                                                    </span>
                                                                                                </strong>
                                                                                            </span>
                                                                                        </p>

                                                                                        <p
                                                                                            style="margin: 0; font-size: 16px; text-align: left; mso-line-height-alt: 28.8px;">
                                                                                            <span
                                                                                                style="font-size:18px;">
                                                                                                <span
                                                                                                    style=" margin-bottom: 10px; display: block;">
                                                                                                    <!-- Congratulation to be
                                                                                                    an ${employee} with Flask IT Solutions
                                                                                                    ,${message}. -->
                                                                                                    
                                                                                                    Welcome to Flask IT Solutions. We are thrilled to have you on board. 
                                                                                                    As a ${designationName}.
                                                                                                </span>
                                                                                            </span>
                                                                                            <span
                                                                                                style="font-size:18px;">
                                                                                                <span
                                                                                                    style=" margin-bottom: 10px; display: block;">
                                                                                                    URL:-https://pos.flaskitsolutions.com/                                                                                    
                                                                                                </span>
                                                                                            </span>

                                                                                        </p>

                                                                                        <p
                                                                                            style="margin: 0; font-size: 16px; text-align: left; mso-line-height-alt: 32.4px;">
                                                                                            <span
                                                                                                style="font-size:18px; margin-bottom: 10px ;display:block;"><strong><span
                                                                                                        style="">
                                                                                                        ${employee} Login ID :
                                                                                                        -
                                                                                                    </span>
                                                                                                </strong>

                                                                                                ${email}
                                                                                            </span>
                                                                                        </p>

                                                                                        <p
                                                                                            style="margin: 0; font-size: 16px; text-align: left; mso-line-height-alt: 32.4px;">
                                                                                            <span
                                                                                                style="font-size:18px; margin-bottom: 10px ;display:block;"><strong><span
                                                                                                        style="">
                                                                                                        Login
                                                                                                        Password -
                                                                                                    </span>
                                                                                                </strong>

                                                                                                ${generatePassword}
                                                                                            </span>
                                                                                        </p>
                                                                                         
                                                                                         <p>
                                                                                            <span
                                                                                            style="margin: 0; font-size: 16px; text-align: left; mso-line-height-alt: 28.8px;">
                                                                                            <span
                                                                                            style="font-size:18px;">
                                                                                            <span
                                                                                            style=" margin-bottom: 10px; display: block;">                                                                                      
                                                                                            Welcome to Flask IT Solutions. We are delighted to inform you that your employee account has been successfully created. As a valued member of our team in the role of ${designationName},
                                                                                             your contributions are essential to our collective success. We look forward to working together and achieving great things!"
                                                                                          </span>
                                                                                        </span>
                                                                                      </p>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table><!-- End -->
</body>

</html>`
}

//for pos 
exports.SendPOSIDPASS = (name , email , password , type , message)=>{
    return`<!DOCTYPE html>
 
 <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
 
 <head>
     <title>Alnafeeseh Invoice</title>
     <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
     <meta content="width=device-width, initial-scale=1.0" name="viewport" />
     <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
     <!--[if !mso]><!-->
 
     <link rel="shortcut icon" type="image/x-icon" href="./assets/images/favicon.ico">
 
     <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css" />
     <!--<![endif]-->
     <style>
         * {
             box-sizing: border-box;
         }
 
         body {
             margin: 0;
             padding: 0;
         }
 
         a[x-apple-data-detectors] {
             color: inherit !important;
             text-decoration: inherit !important;
         }
 
         #MessageViewBody a {
             color: inherit;
             text-decoration: none;
         }
 
         p {
             line-height: inherit
         }
 
         .desktop_hide,
         .desktop_hide table {
             mso-hide: all;
             display: none;
             max-height: 0px;
             overflow: hidden;
         }
 
 
 
         table.my-table {
             border-collapse: collapse;
             margin-top: 10px;
             font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;
             text-align: center;
         }
 
         .my-table tbody,
         .my-table td,
         .my-table tfoot,
         .my-table th,
         .my-table thead,
         .my-table tr {
             border-color: #000000;
             border-style: solid;
             border-width: 0px;
             border-collapse: collapse;
             padding: 10px;
         }
 
         table.my-table>:not(caption)>*>* {
             /* padding: 0.5rem 0.5rem; */
             background-color: #ffffff;
             border-width: 1px;
         }
 
         table.my-table {
             border-collapse: collapse;
             margin-bottom: 10px;
         }
 
 
         table.my-table th {
             background: #bbbbbb;
         }
 
         @media screen and (max-width:920px) {
             .desktop_hide table.icons-inner {
                 display: inline-block !important;
             }
 
             .icons-inner {
                 text-align: center;
             }
 
             .icons-inner td {
                 margin: 0 auto;
             }
 
             .fullMobileWidth,
             .row-content {
                 width: 100% !important;
             }
 
             .mobile_hide {
                 display: none;
             }
 
             .stack .column {
                 width: 100%;
                 display: block;
             }
 
             .mobile_hide {
                 min-height: 0;
                 max-height: 0;
                 max-width: 0;
                 overflow: hidden;
                 font-size: 0px;
             }
 
             .desktop_hide,
             .desktop_hide table {
                 display: table !important;
                 max-height: none !important;
             }
 
         }
     </style>
 </head>
 
 <body style="margin: 0; background-color: #ffffff; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
     <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
         style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;" width="100%">
         <tbody>
             <tr>
                 <td>
                     <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-9"
                         role="presentation"
                         style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; width:580px; margin-top: 50px; border: 1px solid #62AAAE;">
                         <tbody>
                             <tr>
                                 <td>
                                     <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1"
                                         role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                         width="100%">
                                         <tbody>
                                             <tr>
                                                 <td>
                                                     <table align="center" border="0" cellpadding="0" cellspacing="0"
                                                         class="row-content stack" role="presentation"
                                                         style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; border-radius: 0; width:580px"
                                                         width: 580;>
                                                         <tbody>
                                                             <tr>
                                                                 <td class="column column-1"
                                                                     style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                                     width="25%">
                                                                     <table border="0" cellpadding="0" cellspacing="0"
                                                                         class="image_block block-2" role="presentation"
                                                                         style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                         width="100%">
                                                                         <tr>
                                                                             <td class="pad"
                                                                                 style="width:100%;padding-right:0px;padding-left:0px;padding-top:20px;padding-bottom:20px; background: #72CCD1;">
                                                                                 <div align="center" class="alignment"
                                                                                     style="line-height:10px"><img
                                                                                         src="https://api.flaskitsolitions.in/assets/flaskitsolitions/flaskitsolitions_logo.png"
                                                                                         style="display: block; height: auto; border: 0; width: 300px; max-width: 100%;" />
                                                                                 </div>
                                                                             </td>
                                                                         </tr>
                                                                     </table>
                                                                 </td>
                                                             </tr>
                                                         </tbody>
                                                     </table>
                                                 </td>
                                             </tr>
                                         </tbody>
                                     </table>
 
                                     <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1"
                                         role="presentation"
                                         style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; padding: 20px 0px;"
                                         width="100%">
                                         <tbody>
                                             <tr>
                                                 <td>
                                                     <table align="center" border="0" cellpadding="0" cellspacing="0"
                                                         class="row-content stack" role="presentation"
                                                         style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; border-radius: 0; width:580px"
                                                         width: 580;>
                                                         <tbody>
                                                             <tr>
                                                                 <td class="column column-2"
                                                                     style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                                     width="100%">
                                                                     <table border="0" cellpadding="0" cellspacing="0"
                                                                         class="text_block block-2" role="presentation"
                                                                         style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                                         width="100%">
                                                                         <tr>
                                                                             <td class="pad"
                                                                                 style="padding-bottom:15px;padding-left:30px;padding-right:30px;padding-top:15px;">
                                                                                 <div style="font-family: sans-serif">
                                                                                     <div class=""
                                                                                         style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 21.6px; color: #000000; line-height: 1.8;">
                                                                                         <p
                                                                                             style="margin: 0; font-size: 16px; text-align: left; mso-line-height-alt: 32.4px;">
                                                                                             <span
                                                                                                 style="font-size:18px; margin-bottom: 10px ;display:block;"><strong><span
                                                                                                         style="text-transform: capitalize;">
                                                                                                         Welcome ${name},
                                                                                                     </span>
                                                                                                 </strong>
                                                                                             </span>
                                                                                         </p>
 
                                                                                         <p
                                                                                             style="margin: 0; font-size: 16px; text-align: left; mso-line-height-alt: 28.8px;">
                                                                                             <span
                                                                                                 style="font-size:18px;">
                                                                                                 <span
                                                                                                     style=" margin-bottom: 10px; display: block;">
                                                                                                     <!-- Congratulation to be
                                                                                                     an ${type} with Flask It Solutions
                                                                                                     ,${message}. -->
                                                                                                     Congratulations on becoming a ${type} with Flask It Solutions! ${message}:
                                                                                     
                                                                                                 </span>
                                                                                             </span>
                                                                                             <span
                                                                                                 style="font-size:18px;">
                                                                                                 <span
                                                                                                     style=" margin-bottom: 10px; display: block;">
                                                                                                     URL:-https://pos.flaskitsolitions.in/                                                                                    
                                                                                                 </span>
                                                                                             </span>
 
                                                                                         </p>
 
                                                                                         <p
                                                                                             style="margin: 0; font-size: 16px; text-align: left; mso-line-height-alt: 32.4px;">
                                                                                             <span
                                                                                                 style="font-size:18px; margin-bottom: 10px ;display:block;"><strong><span
                                                                                                         style="">
                                                                                                         ${type} Login ID :
                                                                                                         -
                                                                                                     </span>
                                                                                                 </strong>
 
                                                                                                 ${email}
                                                                                             </span>
                                                                                         </p>
 
                                                                                         <p
                                                                                             style="margin: 0; font-size: 16px; text-align: left; mso-line-height-alt: 32.4px;">
                                                                                             <span
                                                                                                 style="font-size:18px; margin-bottom: 10px ;display:block;"><strong><span
                                                                                                         style="">
                                                                                                         Login
                                                                                                         Password -
                                                                                                     </span>
                                                                                                 </strong>
 
                                                                                                 ${password}
                                                                                             </span>
                                                                                         </p>
                                                                                          <p>
                                                                                             <span
                                                                                             style="margin: 0; font-size: 16px; text-align: left; mso-line-height-alt: 28.8px;">
                                                                                             <span
                                                                                             style="font-size:18px;">
                                                                                             <span
                                                                                             style=" margin-bottom: 10px; display: block;">                                                                                      
                                                                                             As you are currently in the qualification stage for certification, we wanted to notify you that we have just created a practice quiz in https://pos.flaskitsolitions.in/                                                                                    
                                                                                           </span>
                                                                                         </span>
                                                                                       </p>
                                                                                          <p>
                                                                                             <span
                                                                                             style="margin: 0; font-size: 16px; text-align: left; mso-line-height-alt: 28.8px;">
                                                                                             <span
                                                                                             style="font-size:18px;">
                                                                                             <span
                                                                                             style=" margin-bottom: 10px; display: block;">                                                                                      
                                                                                             We highly recommend reviewing the guidelines and training material before any attempt at the quiz, as it should increase your chances of passing the qualification. In it, you will find task-like questions similar to the qualification questions you will receive in the exam.
                                                                                           </span>
                                                                                         </span>
                                                                                       </p>
                                                                                          <p>
                                                                                             <span
                                                                                             style="margin: 0; font-size: 16px; text-align: left; mso-line-height-alt: 28.8px;">
                                                                                             <span
                                                                                             style="font-size:18px;">
                                                                                             <span
                                                                                             style=" margin-bottom: 10px; display: block;">                                                                                      
                                                                                             You can find the guideline and training material here https://pos.flaskitsolitions.in/
                                                                                           </span>
                                                                                         </span>
                                                                                       </p>
                                                                                          <p>
                                                                                             <span
                                                                                             style="margin: 0; font-size: 16px; text-align: left; mso-line-height-alt: 28.8px;">
                                                                                             <span
                                                                                             style="font-size:18px;">
                                                                                             <span
                                                                                             style=" margin-bottom: 10px; display: block;">                                                                                      
                                                                                             Attempt your quiz here https://pos.flaskitsolitions.in/.
                                                                                           </span>
                                                                                         </span>
                                                                                       </p>
                                                                                          <p>
                                                                                             <span
                                                                                             style="margin: 0; font-size: 16px; text-align: left; mso-line-height-alt: 28.8px;">
                                                                                             <span
                                                                                             style="font-size:18px;">
                                                                                             <span
                                                                                             style=" margin-bottom: 10px; display: block;">                                                                                      
                                                                                             Once you are certified, you will be eligible to issue policies.
                                                                                           </span>
                                                                                         </span>
                                                                                       </p>
                                                                                         
                                                                                     </div>
                                                                                 </div>
                                                                             </td>
                                                                         </tr>
                                                                     </table>
                                                                 </td>
                                                             </tr>
                                                         </tbody>
                                                     </table>
                                                 </td>
                                             </tr>
                                         </tbody>
                                     </table>
                                 </td>
                             </tr>
                         </tbody>
                     </table>
                 </td>
             </tr>
         </tbody>
     </table><!-- End -->
 </body>
 
 </html>`
 }
 
 exports.certificateMail = (name , email , password , type , message)=>{
     return`<!DOCTYPE html>
 
 <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
 
 <head>
     <title>Alnafeeseh Invoice</title>
     <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
     <meta content="width=device-width, initial-scale=1.0" name="viewport" />
     <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
     <!--[if !mso]><!-->
 
     <link rel="shortcut icon" type="image/x-icon" href="./assets/images/favicon.ico">
 
     <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css" />
     <!--<![endif]-->
     <style>
         * {
             box-sizing: border-box;
         }
 
         body {
             margin: 0;
             padding: 0;
         }
 
         a[x-apple-data-detectors] {
             color: inherit !important;
             text-decoration: inherit !important;
         }
 
         #MessageViewBody a {
             color: inherit;
             text-decoration: none;
         }
 
         p {
             line-height: inherit
         }
 
         .desktop_hide,
         .desktop_hide table {
             mso-hide: all;
             display: none;
             max-height: 0px;
             overflow: hidden;
         }
 
 
 
         table.my-table {
             border-collapse: collapse;
             margin-top: 10px;
             font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;
             text-align: center;
         }
 
         .my-table tbody,
         .my-table td,
         .my-table tfoot,
         .my-table th,
         .my-table thead,
         .my-table tr {
             border-color: #000000;
             border-style: solid;
             border-width: 0px;
             border-collapse: collapse;
             padding: 10px;
         }
 
         table.my-table>:not(caption)>*>* {
             /* padding: 0.5rem 0.5rem; */
             background-color: #ffffff;
             border-width: 1px;
         }
 
         table.my-table {
             border-collapse: collapse;
             margin-bottom: 10px;
         }
 
 
         table.my-table th {
             background: #bbbbbb;
         }
 
         @media screen and (max-width:920px) {
             .desktop_hide table.icons-inner {
                 display: inline-block !important;
             }
 
             .icons-inner {
                 text-align: center;
             }
 
             .icons-inner td {
                 margin: 0 auto;
             }
 
             .fullMobileWidth,
             .row-content {
                 width: 100% !important;
             }
 
             .mobile_hide {
                 display: none;
             }
 
             .stack .column {
                 width: 100%;
                 display: block;
             }
 
             .mobile_hide {
                 min-height: 0;
                 max-height: 0;
                 max-width: 0;
                 overflow: hidden;
                 font-size: 0px;
             }
 
             .desktop_hide,
             .desktop_hide table {
                 display: table !important;
                 max-height: none !important;
             }
 
         }
     </style>
 </head>
 
 <body style="margin: 0; background-color: #ffffff; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
     <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
         style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;" width="100%">
         <tbody>
             <tr>
                 <td>
                     <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-9"
                         role="presentation"
                         style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; width:580px; margin-top: 50px; border: 1px solid #358e93;">
                         <tbody>
                             <tr>
                                 <td>
                                     <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1"
                                         role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                         width="100%">
                                         <tbody>
                                             <tr>
                                                 <td>
                                                     <table align="center" border="0" cellpadding="0" cellspacing="0"
                                                         class="row-content stack" role="presentation"
                                                         style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; border-radius: 0; width:580px"
                                                         width: 580;>
                                                         <tbody>
                                                             <tr>
                                                                 <td class="column column-1"
                                                                     style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                                     width="25%">
                                                                     <table border="0" cellpadding="0" cellspacing="0"
                                                                         class="image_block block-2" role="presentation"
                                                                         style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                                         width="100%">
                                                                         <tr>
                                                                             <td class="pad"
                                                                                 style="width:100%;padding-right:0px;padding-left:0px;padding-top:20px;padding-bottom:20px; background-color: #72CCD1;">
                                                                                 <div align="center" class="alignment"
                                                                                     style="line-height:10px"><img
                                                                                         src="https://api.flaskitsolitions.in/assets/flaskitsolitions/flaskitsolitions_logo.png"
                                                                                         style="display: block; height: auto; border: 0; width: 300px; max-width: 100%;" />
                                                                                 </div>
                                                                             </td>
                                                                         </tr>
                                                                     </table>
                                                                 </td>
                                                             </tr>
                                                         </tbody>
                                                     </table>
                                                 </td>
                                             </tr>
                                         </tbody>
                                     </table>
 
                                     <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1"
                                         role="presentation"
                                         style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; padding: 20px 0px;"
                                         width="100%">
                                         <tbody>
                                             <tr>
                                                 <td>
                                                     <table align="center" border="0" cellpadding="0" cellspacing="0"
                                                         class="row-content stack" role="presentation"
                                                         style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; border-radius: 0; width:580px"
                                                         width: 580;>
                                                         <tbody>
                                                             <tr>
                                                                 <td class="column column-2"
                                                                     style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                                     width="100%">
                                                                     <table border="0" cellpadding="0" cellspacing="0"
                                                                         class="text_block block-2" role="presentation"
                                                                         style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                                         width="100%">
                                                                         <tr>
                                                                             <td class="pad"
                                                                                 style="padding-bottom:15px;padding-left:30px;padding-right:30px;padding-top:15px;">
                                                                                 <div style="font-family: sans-serif">
                                                                                     <div class=""
                                                                                         style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 21.6px; color: #000000; line-height: 1.8;">
                                                                                         <p
                                                                                             style="margin: 0; font-size: 16px; text-align: left; mso-line-height-alt: 32.4px;">
                                                                                             <span
                                                                                                 style="font-size:18px; margin-bottom: 10px ;display:block;"><strong><span
                                                                                                         style="text-transform: capitalize;">
                                                                                                         Welcome ${name},
                                                                                                     </span>
                                                                                                 </strong>
                                                                                             </span>
                                                                                         </p>
 
                                                                                         <p
                                                                                             style="margin: 0; font-size: 16px; text-align: left; mso-line-height-alt: 28.8px;">
                                                                                             <span
                                                                                                 style="font-size:18px;">
                                                                                                 <span
                                                                                                     style=" margin-bottom: 10px; display: block;">
                                                                                                     <!-- Congratulation to be
                                                                                                     an ${type} with Flask It Solutions
                                                                                                     ,${message}. -->
                                                                                                     Certificate of completion ${type} with Flask It Solutions!<br> ${message}:
                                                                                                     <p style="font-size: 1.8rem; font-weight: bold; margin: 15px 0px;">This is to certify that</p>
                                                                                                     <h4 class="postitle" style="text-transform: capitalize; font-size: 1.5rem; margin: 15px 0px;">Mr/Miss. ${name}</h4>
                                                                                                 </span>
                                                                                             </span>
                                                                                         </p>
                                                                                       </p>
                                                                                          <p>
                                                                                             <span
                                                                                             style="margin: 0; font-size: 16px; text-align: left; mso-line-height-alt: 28.8px;">
                                                                                             <span
                                                                                             style="font-size:18px;">
                                                                                             <span
                                                                                             style=" margin-bottom: 10px; display: block;">                                                                                      
                                                                                             Has complete our training and now he is registered as a POS in our bussiness and authorized to operate and conduct business within the state
                                                                                           </span>
                                                                                         </span>
                                                                                         <span
                                                                                                 style="font-size:18px;">
                                                                                                 <span
                                                                                                     style=" margin-bottom: 10px; display: block;">
                                                                                                     URL:-https://pos.flaskitsolitions.in/                                                                                    
                                                                                                 </span>
                                                                                             </span>
                                                                                       </p>
                                                                                         
                                                                                       <p
                                                                                       style="margin: 0; font-size: 16px; text-align: left; mso-line-height-alt: 32.4px;">
                                                                                       <span
                                                                                           style="font-size:18px; margin-bottom: 10px ;display:block;"><strong><span
                                                                                                   style="">
                                                                                                   ${type} Login ID :
                                                                                                   -
                                                                                               </span>
                                                                                           </strong>
 
                                                                                           ${email}
                                                                                       </span>
                                                                                   </p>
 
                                                                                   <p
                                                                                       style="margin: 0; font-size: 16px; text-align: left; mso-line-height-alt: 32.4px;">
                                                                                       <span
                                                                                           style="font-size:18px; margin-bottom: 10px ;display:block;"><strong><span
                                                                                                   style="">
                                                                                                   Login
                                                                                                   Password -
                                                                                               </span>
                                                                                           </strong>
 
                                                                                           ${password}
                                                                                       </span>
                                                                                   </p>
 
 
                                                                                          <p>
                                                                                             <span
                                                                                             style="margin: 0; font-size: 16px; text-align: left; mso-line-height-alt: 28.8px;">
                                                                                             <span
                                                                                             style="font-size:18px;">
                                                                                             <span
                                                                                             style=" margin-bottom: 10px; display: block;">                                                                                      
                                                                                             <p style="font-size: 1.2rem; font-weight: bold; width: 500px; margin: 10px 0px;">We have issued this crtificate along our licence on<br>
                                                                                             ${new Date().toLocaleDateString()}
                                                                                           </span>
                                                                                         </span>
                                                                                       </p>
                                                                                       <div style="width: 180px; border-bottom: 2px solid #002f5d;">
                                                                                       <img src="https://api.flaskitsolitions.in/assets/flaskitsolitions_image/sign.png" style="width: 140px;">
                                                                                      </div>
                                                                                          <p>
                                                                                             <span
                                                                                             style="margin: 0; font-size: 12px; text-align: left; mso-line-height-alt: 28.8px;">
                                                                                             <span
                                                                                             style="font-size:12px;">
                                                                                             <span
                                                                                             style=" margin-bottom: 10px; display: block;">                                                                                      
                                                                                             <h5 style="margin: 15px 0px 0px 0px; font-size: 1.3rem; line-height: 27px;">Mr. XYZ</h5>
                                                                                               <p style="font-weight: bold; font-size: 0.8rem; margin-bottom: 25px;">(Flask It Solutions OPC Pvt. Ltd.)</p>
                                                                                           </span>
                                                                                         </span>
                                                                                       </p>
                                                                                         
                                                                                     </div>
                                                                                 </div>
                                                                             </td>
                                                                         </tr>
                                                                     </table>
                                                                 </td>
                                                             </tr>
                                                         </tbody>
                                                     </table>
                                                 </td>
                                             </tr>
                                         </tbody>
                                     </table>
                                 </td>
                             </tr>
                         </tbody>
                     </table>
                 </td>
             </tr>
         </tbody>
     </table><!-- End -->
 </body>
 
 </html>`
 
  }

// exports.certificateMail = (name , email , password , type , message)=>{
//     return`<!DOCTYPE html>

// <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">

// <head>
//     <title>Alnafeeseh Invoice</title>
//     <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
//     <meta content="width=device-width, initial-scale=1.0" name="viewport" />
//     <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
//     <!--[if !mso]><!-->

//     <link rel="shortcut icon" type="image/x-icon" href="./assets/images/favicon.ico">

//     <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css" />
//     <!--<![endif]-->
//     <style>
//         * {
//             box-sizing: border-box;
//         }

//         body {
//             margin: 0;
//             padding: 0;
//         }

//         a[x-apple-data-detectors] {
//             color: inherit !important;
//             text-decoration: inherit !important;
//         }

//         #MessageViewBody a {
//             color: inherit;
//             text-decoration: none;
//         }

//         p {
//             line-height: inherit
//         }

//         .desktop_hide,
//         .desktop_hide table {
//             mso-hide: all;
//             display: none;
//             max-height: 0px;
//             overflow: hidden;
//         }



//         table.my-table {
//             border-collapse: collapse;
//             margin-top: 10px;
//             font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;
//             text-align: center;
//         }

//         .my-table tbody,
//         .my-table td,
//         .my-table tfoot,
//         .my-table th,
//         .my-table thead,
//         .my-table tr {
//             border-color: #000000;
//             border-style: solid;
//             border-width: 0px;
//             border-collapse: collapse;
//             padding: 10px;
//         }

//         table.my-table>:not(caption)>*>* {
//             /* padding: 0.5rem 0.5rem; */
//             background-color: #ffffff;
//             border-width: 1px;
//         }

//         table.my-table {
//             border-collapse: collapse;
//             margin-bottom: 10px;
//         }


//         table.my-table th {
//             background: #bbbbbb;
//         }

//         @media screen and (max-width:920px) {
//             .desktop_hide table.icons-inner {
//                 display: inline-block !important;
//             }

//             .icons-inner {
//                 text-align: center;
//             }

//             .icons-inner td {
//                 margin: 0 auto;
//             }

//             .fullMobileWidth,
//             .row-content {
//                 width: 100% !important;
//             }

//             .mobile_hide {
//                 display: none;
//             }

//             .stack .column {
//                 width: 100%;
//                 display: block;
//             }

//             .mobile_hide {
//                 min-height: 0;
//                 max-height: 0;
//                 max-width: 0;
//                 overflow: hidden;
//                 font-size: 0px;
//             }

//             .desktop_hide,
//             .desktop_hide table {
//                 display: table !important;
//                 max-height: none !important;
//             }

//         }
//     </style>
// </head>

// <body style="margin: 0; background-color: #ffffff; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
//     <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
//         style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;" width="100%">
//         <tbody>
//             <tr>
//                 <td>
//                     <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-9"
//                         role="presentation"
//                         style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; width:580px; margin-top: 50px; border: 1px solid #358e93;">
//                         <tbody>
//                             <tr>
//                                 <td>
//                                     <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1"
//                                         role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
//                                         width="100%">
//                                         <tbody>
//                                             <tr>
//                                                 <td>
//                                                     <table align="center" border="0" cellpadding="0" cellspacing="0"
//                                                         class="row-content stack" role="presentation"
//                                                         style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; border-radius: 0; width:580px"
//                                                         width: 580;>
//                                                         <tbody>
//                                                             <tr>
//                                                                 <td class="column column-1"
//                                                                     style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
//                                                                     width="25%">
//                                                                     <table border="0" cellpadding="0" cellspacing="0"
//                                                                         class="image_block block-2" role="presentation"
//                                                                         style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
//                                                                         width="100%">
//                                                                         <tr>
//                                                                             <td class="pad"
//                                                                                 style="width:100%;padding-right:0px;padding-left:0px;padding-top:20px;padding-bottom:20px; background-color: #72CCD1;">
//                                                                                 <div align="center" class="alignment"
//                                                                                     style="line-height:10px"><img
//                                                                                         src="https://api.flaskitsolutions.com/assets/flaskit_solutions/#.png"
//                                                                                         style="display: block; height: auto; border: 0; width: 300px; max-width: 100%;" />
//                                                                                 </div>
//                                                                             </td>
//                                                                         </tr>
//                                                                     </table>
//                                                                 </td>
//                                                             </tr>
//                                                         </tbody>
//                                                     </table>
//                                                 </td>
//                                             </tr>
//                                         </tbody>
//                                     </table>

//                                     <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1"
//                                         role="presentation"
//                                         style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; padding: 20px 0px;"
//                                         width="100%">
//                                         <tbody>
//                                             <tr>
//                                                 <td>
//                                                     <table align="center" border="0" cellpadding="0" cellspacing="0"
//                                                         class="row-content stack" role="presentation"
//                                                         style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; border-radius: 0; width:580px"
//                                                         width: 580;>
//                                                         <tbody>
//                                                             <tr>
//                                                                 <td class="column column-2"
//                                                                     style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
//                                                                     width="100%">
//                                                                     <table border="0" cellpadding="0" cellspacing="0"
//                                                                         class="text_block block-2" role="presentation"
//                                                                         style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
//                                                                         width="100%">
//                                                                         <tr>
//                                                                             <td class="pad"
//                                                                                 style="padding-bottom:15px;padding-left:30px;padding-right:30px;padding-top:15px;">
//                                                                                 <div style="font-family: sans-serif">
//                                                                                     <div class=""
//                                                                                         style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 21.6px; color: #000000; line-height: 1.8;">
//                                                                                         <p
//                                                                                             style="margin: 0; font-size: 16px; text-align: left; mso-line-height-alt: 32.4px;">
//                                                                                             <span
//                                                                                                 style="font-size:18px; margin-bottom: 10px ;display:block;"><strong><span
//                                                                                                         style="text-transform: capitalize;">
//                                                                                                         Welcome ${name},
//                                                                                                     </span>
//                                                                                                 </strong>
//                                                                                             </span>
//                                                                                         </p>

//                                                                                         <p
//                                                                                             style="margin: 0; font-size: 16px; text-align: left; mso-line-height-alt: 28.8px;">
//                                                                                             <span
//                                                                                                 style="font-size:18px;">
//                                                                                                 <span
//                                                                                                     style=" margin-bottom: 10px; display: block;">
//                                                                                                     <!-- Congratulation to be
//                                                                                                     an ${type} with Flask IT Solutions
//                                                                                                     ,${message}. -->
//                                                                                                     Certificate of completion ${type} with Flask IT Solutions!<br> ${message}:
//                                                                                                     <p style="font-size: 1.8rem; font-weight: bold; margin: 15px 0px;">This is to certify that</p>
//                                                                                                     <h4 class="postitle" style="text-transform: capitalize; font-size: 1.5rem; margin: 15px 0px;">Mr/Miss. ${name}</h4>
//                                                                                                 </span>
//                                                                                             </span>
//                                                                                         </p>
//                                                                                       </p>
//                                                                                          <p>
//                                                                                             <span
//                                                                                             style="margin: 0; font-size: 16px; text-align: left; mso-line-height-alt: 28.8px;">
//                                                                                             <span
//                                                                                             style="font-size:18px;">
//                                                                                             <span
//                                                                                             style=" margin-bottom: 10px; display: block;">                                                                                      
//                                                                                             Has complete our training and now he is registered as a POS in our bussiness and authorized to operate and conduct business within the state
//                                                                                           </span>
//                                                                                         </span>
//                                                                                         <span
//                                                                                                 style="font-size:18px;">
//                                                                                                 <span
//                                                                                                     style=" margin-bottom: 10px; display: block;">
//                                                                                                     URL:-https://pos.flaskitsolutions.com/                                                                                    
//                                                                                                 </span>
//                                                                                             </span>
//                                                                                       </p>
                                                                                        
//                                                                                       <p
//                                                                                       style="margin: 0; font-size: 16px; text-align: left; mso-line-height-alt: 32.4px;">
//                                                                                       <span
//                                                                                           style="font-size:18px; margin-bottom: 10px ;display:block;"><strong><span
//                                                                                                   style="">
//                                                                                                   ${type} Login ID :
//                                                                                                   -
//                                                                                               </span>
//                                                                                           </strong>

//                                                                                           ${email}
//                                                                                       </span>
//                                                                                   </p>

//                                                                                   <p
//                                                                                       style="margin: 0; font-size: 16px; text-align: left; mso-line-height-alt: 32.4px;">
//                                                                                       <span
//                                                                                           style="font-size:18px; margin-bottom: 10px ;display:block;"><strong><span
//                                                                                                   style="">
//                                                                                                   Login
//                                                                                                   Password -
//                                                                                               </span>
//                                                                                           </strong>

//                                                                                           ${password}
//                                                                                       </span>
//                                                                                   </p>


//                                                                                          <p>
//                                                                                             <span
//                                                                                             style="margin: 0; font-size: 16px; text-align: left; mso-line-height-alt: 28.8px;">
//                                                                                             <span
//                                                                                             style="font-size:18px;">
//                                                                                             <span
//                                                                                             style=" margin-bottom: 10px; display: block;">                                                                                      
//                                                                                             <p style="font-size: 1.2rem; font-weight: bold; width: 500px; margin: 10px 0px;">We have issued this crtificate along our licence on<br>
//                                                                                             ${new Date().toLocaleDateString()}
//                                                                                           </span>
//                                                                                         </span>
//                                                                                       </p>
//                                                                                       <div style="width: 180px; border-bottom: 2px solid #002f5d;">
//                                                                                       <img src="https://api.flaskitsolutions.com/assets/flaskit_solutions_image/#.png" style="width: 140px;">
//                                                                                      </div>
//                                                                                          <p>
//                                                                                             <span
//                                                                                             style="margin: 0; font-size: 12px; text-align: left; mso-line-height-alt: 28.8px;">
//                                                                                             <span
//                                                                                             style="font-size:12px;">
//                                                                                             <span
//                                                                                             style=" margin-bottom: 10px; display: block;">                                                                                      
//                                                                                             <h5 style="margin: 15px 0px 0px 0px; font-size: 1.3rem; line-height: 27px;">Mr. XYZ</h5>
//                                                                                               <p style="font-weight: bold; font-size: 0.8rem; margin-bottom: 25px;">(Flask IT Solutions Pvt. Ltd.)</p>
//                                                                                           </span>
//                                                                                         </span>
//                                                                                       </p>
                                                                                        
//                                                                                     </div>
//                                                                                 </div>
//                                                                             </td>
//                                                                         </tr>
//                                                                     </table>
//                                                                 </td>
//                                                             </tr>
//                                                         </tbody>
//                                                     </table>
//                                                 </td>
//                                             </tr>
//                                         </tbody>
//                                     </table>
//                                 </td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </td>
//             </tr>
//         </tbody>
//     </table><!-- End -->
// </body>

// </html>`

//  }