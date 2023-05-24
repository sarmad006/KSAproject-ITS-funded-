const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const { EMAIL, PASSWORD } = require("../env.js");

/** send mail from testing account */
const verifyUser = async (req, res) => {
  const email = req.body.email;

  let config = {
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let message = {
    from: EMAIL,
    to: email,
    subject: "KSA Project",
    text: "Successfully Register with us."
  };

  transporter
    .sendMail(message)
    .then((info) => {
      return res.status(201).json({
        msg: "you should receive an email",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });

  // res.status(201).json("Signup Successfully...!");
};

/** send mail from real gmail account */
const sendApproval = (req, res) => {
  const email = req.body.email;
  const hash=req.body.hash;
  let config = {
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);


  let message = {
    from: EMAIL,
    to: email,
    subject: "KSA Project",
    text: "Successfully Register with us.",
    html:'<p> Click <a href="https://ipfs.io/ipfs/' + hash + '">here</a> to download file</p>'
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        msg: "you should receive an email",
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error });
    });

  // res.status(201).json("getBill Successfully...!");
};

module.exports = {
  verifyUser,
  sendApproval,
};
