import sgMail from "@sendgrid/mail";

const sendEmail = (user, subject, url, text) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: user.email, // Change to your recipient
    from: process.env.USER, // Change to your verified sender
    subject: subject,
    text: url,
    html: `
      <p>Hello ${user.name.split(" ")[0]}</p>
      <p>${text}</p>
      <a href="${url}">${subject}</a>
      `,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

export default sendEmail;
