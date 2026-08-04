const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function sendPasswordResetEmail({ to, resetUrl }) {
  await transporter.sendMail({
    from: `"AI Kids" <${process.env.EMAIL_FROM}>`,
    to,
    subject: 'AI Kids - Reset Your Password',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px;color:#10184b;">
        <h1 style="color:#4b16ef;">Reset Your Password</h1>

        <p>
          We received a request to reset your AI Kids account password.
        </p>

        <p>
          Click the button below to create a new password.
        </p>

        <a
          href="${resetUrl}"
          style="
            display:inline-block;
            margin:16px 0;
            padding:14px 22px;
            border-radius:10px;
            background:#4b16ef;
            color:#ffffff;
            text-decoration:none;
            font-weight:bold;
          "
        >
          Reset Password
        </a>

        <p>
          This link will expire in 15 minutes.
        </p>

        <p>
          If you did not request this, you can ignore this email.
        </p>

        <p>
          AI Kids Team
        </p>
      </div>
    `
  });
}

module.exports = {
  sendPasswordResetEmail
};