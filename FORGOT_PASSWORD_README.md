# Forgot Password Implementation

## Overview

This implementation provides a secure, user-friendly forgot password feature for your Next.js app with support for teachers, students, and admin users. The system uses JWT tokens, bcrypt password hashing, and email verification.

## Features

- ✅ **Secure Token Generation**: JWT tokens with 1-hour expiration
- ✅ **Email Verification**: HTML and text email templates
- ✅ **Password Strength Validation**: Real-time password requirements checking  
- ✅ **Role-based Support**: Works with teachers, students, and admin accounts
- ✅ **Security Best Practices**: Email enumeration protection, token validation
- ✅ **User-friendly UI**: Loading states, success messages, error handling
- ✅ **Responsive Design**: Mobile-friendly interface

## File Structure

```
├── app/
│   ├── api/auth/
│   │   ├── forgot-password/route.ts    # API for password reset requests
│   │   └── reset-password/route.ts     # API for password reset confirmation
│   ├── forgot-password/page.tsx        # Forgot password form
│   ├── reset-password/page.tsx         # Reset password form
│   └── sign-in/[[...sign-in]]/page.tsx # Updated with forgot password link
├── lib/
│   ├── database.ts                     # Database models and operations
│   ├── email.ts                        # Email service and templates
│   └── jwt.ts                          # JWT and password utilities
└── .env.local                          # Environment variables
```

## Setup Instructions

### 1. Environment Variables

Update your `.env.local` file with email configuration:

```env
# Email Configuration (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password  # Use App Password for Gmail

# JWT Secret (generate a strong random key)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# App URL
NEXTAUTH_URL=http://localhost:3000
```

### 2. Email Service Configuration

#### Option A: Gmail (Free)
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password: Google Account → Security → App passwords
3. Use the App Password in `SMTP_PASS` (not your regular password)

#### Option B: Transactional Email Services (Recommended for Production)

**Resend** (Recommended):
```bash
npm install @resend/node
```
```env
RESEND_API_KEY=your-resend-api-key
```

**SendGrid**:
```bash
npm install @sendgrid/mail
```
```env
SENDGRID_API_KEY=your-sendgrid-api-key
```

**Mailgun**:
```bash
npm install mailgun.js
```
```env
MAILGUN_API_KEY=your-mailgun-api-key
MAILGUN_DOMAIN=your-mailgun-domain
```

### 3. Database Integration

The current implementation uses in-memory storage for demonstration. For production, replace `lib/database.ts` with your actual database:

#### PostgreSQL with Prisma:
```typescript
// Add to your Prisma schema
model PasswordResetToken {
  id        String   @id @default(cuid())
  userId    String
  token     String   @unique
  expiresAt DateTime
  createdAt DateTime @default(now())
  used      Boolean  @default(false)
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

#### MongoDB with Mongoose:
```typescript
const passwordResetTokenSchema = new Schema({
  userId: { type: String, required: true },
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  used: { type: Boolean, default: false }
});
```

## API Endpoints

### POST `/api/auth/forgot-password`
Initiates password reset process.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "If an account with that email exists, we sent you a password reset link."
}
```

### GET `/api/auth/reset-password?token=xyz`
Verifies if a reset token is valid.

**Response (Success):**
```json
{
  "valid": true,
  "email": "user@example.com",
  "name": "John Doe",
  "role": "teacher"
}
```

### POST `/api/auth/reset-password`
Updates user's password with new one.

**Request:**
```json
{
  "token": "jwt-token-here",
  "password": "NewPassword123!",
  "confirmPassword": "NewPassword123!"
}
```

## Security Features

### 1. Token Security
- JWT tokens with 1-hour expiration
- Cryptographically secure token IDs
- Token invalidation after use
- Database verification alongside JWT

### 2. Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter  
- At least one number
- At least one special character (@$!%*?&)

### 3. Email Security
- No email enumeration (same response for valid/invalid emails)
- Rate limiting ready (implement as needed)
- Secure email templates with clear CTAs

### 4. General Security
- Input validation with Zod
- CSRF protection (Next.js built-in)
- Proper error handling without information leakage

## User Flow

1. **User clicks "Forgot password?" on sign-in page**
2. **Enter email address** → Submit form
3. **Check email** → Click reset link (valid for 1 hour)
4. **Create new password** → Confirm password
5. **Success** → Redirect to sign-in page

## Testing

### Test with Sample Users

The implementation includes sample users for testing:
- `teacher@example.com` (Teacher)
- `student@example.com` (Student)  
- `admin@example.com` (Admin)

### Manual Testing Steps

1. Start the development server: `npm run dev`
2. Navigate to `/sign-in` → Click "Forgot password?"
3. Enter `teacher@example.com` → Submit
4. Check your email for the reset link
5. Click the link → Set new password
6. Verify successful password reset

## Customization

### Email Templates
Modify `lib/email.ts` to customize:
- Email styling and branding
- Email content and copy
- Sender information

### UI Components
Update components in:
- `app/forgot-password/page.tsx`
- `app/reset-password/page.tsx`

### Token Expiration
Change token validity in `lib/jwt.ts`:
```typescript
const token = jwt.sign(payload, JWT_SECRET, {
  expiresIn: '2h', // Change from 1h to 2h
});
```

## Production Deployment

### 1. Environment Variables
- Use strong, random `JWT_SECRET`
- Configure production email service
- Set correct `NEXTAUTH_URL`

### 2. Database
- Replace in-memory storage with persistent database
- Set up proper indexing on email and token fields
- Implement token cleanup job for expired tokens

### 3. Security Enhancements
- Implement rate limiting
- Add CAPTCHA for additional protection
- Set up monitoring and logging
- Consider additional security headers

### 4. Performance
- Implement database connection pooling
- Add caching where appropriate
- Optimize email sending (queues for high volume)

## Troubleshooting

### Email Not Sending
1. Check SMTP credentials in `.env.local`
2. Verify Gmail App Password (not regular password)
3. Check server logs for detailed error messages
4. Test SMTP connection separately

### Token Errors
1. Verify `JWT_SECRET` is set
2. Check token expiration (1 hour default)
3. Ensure token hasn't been used already
4. Validate token format in URL

### UI Issues
1. Check browser console for JavaScript errors
2. Verify all imports are correct
3. Ensure Tailwind CSS classes are available

## Next Steps

1. **Implement Real Database**: Replace in-memory storage
2. **Add Rate Limiting**: Prevent spam and abuse
3. **Enhanced Security**: CAPTCHA, additional validations
4. **Email Templates**: Custom branding and styling
5. **Testing**: Unit tests and integration tests
6. **Monitoring**: Logs and analytics for password reset usage

## Support

For additional help:
1. Check the browser console and server logs
2. Verify all environment variables are set correctly
3. Test email configuration separately
4. Review the implementation files for any customization needed

---

**Note**: This implementation provides a solid foundation for password reset functionality. For production use, ensure you've implemented all recommended security measures and replaced the in-memory database with a persistent solution.
