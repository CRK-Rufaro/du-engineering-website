# DUE Engineering - Contact Form Setup Guide

This guide explains how to set up the Google Sheets integration for the contact form.

---

## Prerequisites

1. A Google Account using `info@duengineering.co.za` (created at accounts.google.com)
2. Access to Google Sheets and Apps Script

---

## Step 1: Create the Google Sheet (3 minutes)

1. Go to https://sheets.google.com
2. Click **+ Blank** to create a new spreadsheet
3. Name it: `DUE Engineering - Contact Leads`
4. In Row 1, add these 8 column headers:

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| Timestamp | Name | Email | Phone | Service | Message | Status | Notes |

5. Format the header row:
   - Select Row 1
   - Bold (Ctrl+B)
   - Add light gray background
6. Freeze the header: **View > Freeze > 1 row**

---

## Step 2: Create the Apps Script (5 minutes)

1. In your spreadsheet, go to **Extensions > Apps Script**
2. Delete any default code in the editor
3. Paste this code:

```javascript
// ============================================
// DUE ENGINEERING CONTACT FORM HANDLER
// ============================================

const CONFIG = {
  notifyEmails: 'info@duengineering.co.za',
  businessName: 'DUE Engineering',
  sheetName: 'Sheet1',
  emailSubject: 'New Quote Request',
  allowedOrigins: '*'
};

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.sheetName);
    const data = e.parameter;
    const timestamp = new Date();

    const rowData = [
      timestamp,
      data.name || '',
      data.email || '',
      data.phone || '',
      data.service || 'General',
      data.message || '',
      'Pending',
      ''
    ];

    sheet.appendRow(rowData);
    sendEmailNotification(data, timestamp);
    Logger.log('Lead captured: ' + data.email);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Thank you!' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: 'Error occurred.' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendEmailNotification(data, timestamp) {
  const subject = `${CONFIG.emailSubject} - ${data.name}`;
  const body = `
New Contact Form Submission

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTACT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name:        ${data.name}
Email:       ${data.email}
Phone:       ${data.phone}
Service:     ${data.service || 'General Inquiry'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${data.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SUBMISSION INFO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted:   ${timestamp.toLocaleString('en-ZA')}
Source:      ${CONFIG.businessName} Website

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

View all leads: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}
  `;

  MailApp.sendEmail({
    to: CONFIG.notifyEmails,
    subject: subject,
    body: body,
    name: CONFIG.businessName + ' Website'
  });
}

function doGet(e) {
  return ContentService
    .createTextOutput('DUE Engineering Contact Form API is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function testEmail() {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '082 123 4567',
    service: 'Residential Solar',
    message: 'This is a test submission.'
  };
  sendEmailNotification(testData, new Date());
  Logger.log('Test email sent!');
}
```

4. Click **Save** (Ctrl+S)
5. Name the project: `DUE Engineering Contact Form`

---

## Step 3: Test Email Notifications (2 minutes)

1. In the Apps Script editor, select `testEmail` from the function dropdown
2. Click **Run**
3. First time: Click **Review Permissions**
   - Choose your Google account
   - Click **Advanced** > **Go to DUE Engineering Contact Form (unsafe)**
   - Click **Allow**
4. Check your inbox for the test email

---

## Step 4: Deploy as Web App (2 minutes)

1. Click **Deploy > New deployment**
2. Click the gear icon > **Web app**
3. Settings:
   - Description: `Contact Form API v1`
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**
5. **COPY THE WEB APP URL** - You need this!
   - Looks like: `https://script.google.com/macros/s/ABC123.../exec`

---

## Step 5: Add URL to Website

Send the Web App URL to your developer, or:

1. Create a file named `.env` in the website project folder
2. Add this line (replace with your actual URL):

```
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

3. Rebuild and redeploy the website

---

## Step 6: Test the Live Form

1. Go to https://duengineering.co.za
2. Fill out the contact form with test data
3. Submit
4. Verify:
   - Success message appears on website
   - Row appears in Google Sheet
   - Email notification received

---

## Managing Leads

### In the Google Sheet:

- **Status column**: Update as you contact leads
  - `Pending` - New lead, not contacted
  - `Contacted` - Reached out
  - `Quoted` - Sent quote
  - `Won` - Converted to customer
  - `Lost` - Did not convert

- **Notes column**: Add internal notes about each lead

### Tips:

- Check the sheet daily for new leads
- Respond within 24 hours for best conversion
- Use filters to view specific statuses
- Export to CSV for reporting

---

## Troubleshooting

### Form submits but no data in sheet:
- Check Apps Script execution log
- Verify deployment is set to "Anyone"

### No email notifications:
- Check spam folder
- Verify email address in CONFIG
- Run `testEmail` function to verify

### Need to update the script:
1. Make changes in Apps Script
2. Deploy > Manage deployments
3. Edit > Create new version
4. Deploy

---

## Support

For technical issues, contact your web developer.
