import nodemailer from 'nodemailer';

// Create transporter (configure based on your email provider)
const createTransporter = () => {
  // For Gmail (you need to use App Passwords, not regular password)
  if (process.env.SMTP_HOST === 'smtp.gmail.com') {
    return nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS, // Use App Password for Gmail
      },
    });
  }
  
  // For other providers (Outlook, Yahoo, etc.)
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  resetToken: string,
  userName: string
): Promise<boolean> => {
  try {
    const transporter = createTransporter();
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;
    
    const mailOptions = {
      from: `"GreenPulse EV App" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Reset Your Password - GreenPulse EV',
      html: generatePasswordResetEmailTemplate(userName, resetUrl),
      text: `
Hello ${userName},

You requested to reset your password for your GreenPulse EV account.

Click the following link to reset your password:
${resetUrl}

This link will expire in 1 hour for security reasons.

If you didn't request this password reset, please ignore this email.

Best regards,
The GreenPulse EV Team
      `.trim(),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return false;
  }
};

// Email template for password reset
const generatePasswordResetEmailTemplate = (userName: string, resetUrl: string): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #1f2937; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
        .button { 
            display: inline-block; 
            background-color: #3b82f6; 
            color: white; 
            padding: 12px 24px; 
            text-decoration: none; 
            border-radius: 6px; 
            font-weight: bold;
            margin: 20px 0;
        }
        .button:hover { background-color: #2563eb; }
        .warning { background-color: #fef3c7; padding: 15px; border-radius: 6px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔒 Password Reset Request</h1>
        </div>
        <div class="content">
            <p>Hello <strong>${userName}</strong>,</p>
            
            <p>You requested to reset your password for your GreenPulse EV account. Click the button below to create a new password:</p>
            
            <p style="text-align: center;">
                <a href="${resetUrl}" class="button">Reset My Password</a>
            </p>
            
            <div class="warning">
                <strong>⚠️ Important:</strong> This link will expire in 1 hour for security reasons.
            </div>
            
            <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
            <p style="word-break: break-all; background-color: #e5e7eb; padding: 10px; border-radius: 4px;">
                ${resetUrl}
            </p>
            
            <p>If you didn't request this password reset, please ignore this email. Your account remains secure.</p>
            
            <p>Best regards,<br>The GreenPulse EV Team</p>
        </div>
        <div class="footer">
            <p>This is an automated message, please do not reply to this email.</p>
        </div>
    </div>
</body>
</html>
  `.trim();
};

// Alternative: Using a transactional email service like Resend, SendGrid, or Mailgun
// Here's an example with Resend (you'd need to install @resend/node)
/*
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordResetEmailWithResend = async (
  email: string,
  resetToken: string,
  userName: string
): Promise<boolean> => {
  try {
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;
    
    const { data, error } = await resend.emails.send({
      from: 'GreenPulse EV <noreply@yourdomain.com>',
      to: [email],
      subject: 'Reset Your Password - GreenPulse EV',
      html: generatePasswordResetEmailTemplate(userName, resetUrl),
    });

    if (error) {
      console.error('Error sending email with Resend:', error);
      return false;
    }

    console.log('Password reset email sent with Resend:', data.id);
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return false;
  }
};
*/
