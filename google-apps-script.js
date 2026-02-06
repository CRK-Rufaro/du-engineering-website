// ============================================
// DUE ENGINEERING CONTACT FORM HANDLER
// Corrected Version - Proper Brand Colors
// ============================================

const CONFIG = {
  // Email settings
  notifyEmails: 'info@duengineering.co.za',
  ccEmails: '',
  sendCustomerConfirmation: true,

  // Business info
  businessName: 'DUE Engineering',
  businessPhone: '+27 78 683 5210',
  businessEmail: 'info@duengineering.co.za',
  businessAddress: '14 Boshoff Street, LaHoff, Klerksdorp, 2571',
  tagline: 'Perfection is possible',

  // Spreadsheet
  sheetName: 'Sheet1',

  // Email subjects
  emailSubject: 'New Quote Request',
  customerSubject: 'We received your quote request',

  // CORRECTED Brand Colors (matching your website)
  brandPrimary: '#2F5D50',       // Dark teal green (primary buttons, headers)
  brandPrimaryDark: '#25493F',   // Darker teal for hover/accents
  brandSecondary: '#F59E0B',     // Solar gold/amber (highlights, badges)
  brandSecondaryDark: '#D97706', // Darker gold
  brandLight: '#F0FDF4',         // Light green tint for backgrounds
  textDark: '#1f2937',
  textMuted: '#6b7280',

  // Logo - PNG version for email compatibility
  logoUrl: 'https://duengineering.co.za/due_engineering_logo.png',
  websiteUrl: 'https://duengineering.co.za',

  // Service labels
  serviceLabels: {
    'residential-solar': 'Residential Solar Installation',
    'commercial-solar': 'Commercial Solar Solutions',
    'battery-backup': 'Battery Backup Systems',
    'electrical': 'Electrical Services',
    'solar-geyser': 'Solar Geyser',
    'compliance': 'Compliance Certificate',
    'other': 'Other'
  }
};

// ============================================
// FORM SUBMISSION HANDLER
// ============================================
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.sheetName);
    const data = e.parameter;
    const timestamp = new Date();

    const cleanData = {
      name: sanitize(data.name),
      email: sanitize(data.email).toLowerCase(),
      phone: sanitize(data.phone),
      service: data.service || 'General',
      serviceLabel: CONFIG.serviceLabels[data.service] || data.service || 'General Inquiry',
      message: sanitize(data.message)
    };

    const rowData = [
      timestamp,
      cleanData.name,
      cleanData.email,
      cleanData.phone,
      cleanData.serviceLabel,
      cleanData.message,
      'New',
      '',
      formatPhoneForWhatsApp(cleanData.phone)
    ];

    sheet.appendRow(rowData);

    sendEmailNotification(cleanData, timestamp);

    if (CONFIG.sendCustomerConfirmation && cleanData.email) {
      sendCustomerConfirmation(cleanData, timestamp);
    }

    Logger.log('Lead captured: ' + cleanData.email + ' | Service: ' + cleanData.serviceLabel);

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

// ============================================
// HELPER FUNCTIONS
// ============================================
function sanitize(str) {
  if (!str) return '';
  return str.toString().trim();
}

function formatPhoneForWhatsApp(phone) {
  if (!phone) return '';
  let digits = phone.replace(/[^0-9]/g, '');
  if (digits.startsWith('0') && digits.length === 10) {
    digits = '27' + digits.substring(1);
  }
  return 'https://wa.me/' + digits;
}

function getWhatsAppNumber(phone) {
  if (!phone) return '';
  let digits = phone.replace(/[^0-9]/g, '');
  if (digits.startsWith('0') && digits.length === 10) {
    digits = '27' + digits.substring(1);
  }
  return digits;
}

// Encode for mailto: links - uses %20 for spaces (mobile-safe)
function encodeMailto(str) {
  if (!str) return '';
  return str.replace(/ /g, '%20');
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/\n/g, '<br>');
}

// ============================================
// ADMIN EMAIL NOTIFICATION
// ============================================
function sendEmailNotification(data, timestamp) {
  const subject = CONFIG.emailSubject + ' - ' + data.name + ' (' + data.serviceLabel + ')';
  const whatsappNumber = getWhatsAppNumber(data.phone);

  const plainBody =
'NEW QUOTE REQUEST\n' +
'━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
'Name:      ' + data.name + '\n' +
'Email:     ' + data.email + '\n' +
'Phone:     ' + data.phone + '\n' +
'Service:   ' + data.serviceLabel + '\n\n' +
'MESSAGE:\n' +
(data.message || 'No message provided') + '\n\n' +
'━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
'Submitted: ' + timestamp.toLocaleString('en-ZA') + '\n' +
'WhatsApp:  https://wa.me/' + whatsappNumber + '\n' +
'Leads:     ' + SpreadsheetApp.getActiveSpreadsheet().getUrl();

  const htmlBody = '<!DOCTYPE html>' +
'<html>' +
'<head>' +
'  <meta charset="utf-8">' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0">' +
'</head>' +
'<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, \'Helvetica Neue\', Arial, sans-serif;">' +
'  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f3f4f6;">' +
'    <tr>' +
'      <td align="center" style="padding: 32px 16px;">' +
'        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 560px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">' +
'          <tr>' +
'            <td style="background: linear-gradient(135deg, ' + CONFIG.brandPrimary + ' 0%, ' + CONFIG.brandPrimaryDark + ' 100%); padding: 28px 32px; text-align: center;">' +
'              <img src="' + CONFIG.logoUrl + '" alt="' + CONFIG.businessName + '" width="80" style="max-width: 80px; height: auto; display: block; margin: 0 auto 12px; border-radius: 8px;">' +
'              <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 600;">New Quote Request</h1>' +
'              <p style="margin: 8px 0 0; color: rgba(255,255,255,0.85); font-size: 13px;">' + timestamp.toLocaleString('en-ZA') + '</p>' +
'            </td>' +
'          </tr>' +
'          <tr>' +
'            <td style="padding: 20px 24px 0;">' +
'              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">' +
'                <tr>' +
'                  <td style="background-color: #FEF3C7; border-left: 3px solid ' + CONFIG.brandSecondary + '; padding: 12px 14px; border-radius: 0 6px 6px 0;">' +
'                    <p style="margin: 0; color: #92400E; font-size: 13px; font-weight: 500;">New lead received - Respond within 24 hours</p>' +
'                  </td>' +
'                </tr>' +
'              </table>' +
'            </td>' +
'          </tr>' +
'          <tr>' +
'            <td style="padding: 20px 24px;">' +
'              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f9fafb; border-radius: 8px; overflow: hidden;">' +
'                <tr>' +
'                  <td style="padding: 16px 20px; border-bottom: 1px solid #e5e7eb;">' +
'                    <p style="margin: 0 0 2px; color: ' + CONFIG.textMuted + '; font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 600;">Contact Name</p>' +
'                    <p style="margin: 0; color: ' + CONFIG.textDark + '; font-size: 18px; font-weight: 700;">' + escapeHtml(data.name) + '</p>' +
'                  </td>' +
'                </tr>' +
'                <tr>' +
'                  <td style="padding: 14px 20px; border-bottom: 1px solid #e5e7eb;">' +
'                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">' +
'                      <tr>' +
'                        <td width="50%" valign="top" style="padding-right: 10px;">' +
'                          <p style="margin: 0 0 2px; color: ' + CONFIG.textMuted + '; font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 600;">Email</p>' +
'                          <a href="mailto:' + data.email + '" style="color: ' + CONFIG.brandPrimary + '; font-size: 13px; text-decoration: none; font-weight: 500; word-break: break-all;">' + escapeHtml(data.email) + '</a>' +
'                        </td>' +
'                        <td width="50%" valign="top" style="padding-left: 10px;">' +
'                          <p style="margin: 0 0 2px; color: ' + CONFIG.textMuted + '; font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 600;">Phone</p>' +
'                          <a href="tel:' + data.phone + '" style="color: ' + CONFIG.brandPrimary + '; font-size: 13px; text-decoration: none; font-weight: 500;">' + escapeHtml(data.phone) + '</a>' +
'                        </td>' +
'                      </tr>' +
'                    </table>' +
'                  </td>' +
'                </tr>' +
'                <tr>' +
'                  <td style="padding: 14px 20px;">' +
'                    <p style="margin: 0 0 6px; color: ' + CONFIG.textMuted + '; font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 600;">Service Interest</p>' +
'                    <span style="display: inline-block; background-color: ' + CONFIG.brandSecondary + '; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 600;">' + escapeHtml(data.serviceLabel) + '</span>' +
'                  </td>' +
'                </tr>' +
'              </table>' +
'            </td>' +
'          </tr>' +
'          <tr>' +
'            <td style="padding: 0 24px 20px;">' +
'              <p style="margin: 0 0 8px; color: ' + CONFIG.textMuted + '; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px;">Message</p>' +
'              <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;">' +
'                <p style="margin: 0; color: ' + CONFIG.textDark + '; font-size: 14px; line-height: 1.6;">' + (data.message ? escapeHtml(data.message) : '<span style="color: #9ca3af; font-style: italic;">No message provided</span>') + '</p>' +
'              </div>' +
'            </td>' +
'          </tr>' +
'          <tr>' +
'            <td style="padding: 0 24px 24px;">' +
'              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">' +
'                <tr>' +
'                  <td width="33%" style="padding: 0 4px;">' +
'                    <a href="mailto:' + data.email + '?subject=Re:%20Your%20Quote%20Request%20-%20DUE%20Engineering&body=Hi%20' + encodeMailto(data.name) + ',%0D%0A%0D%0AThank%20you%20for%20your%20interest%20in%20our%20' + encodeMailto(data.serviceLabel) + '%20services.%0D%0A%0D%0A" style="display: block; background-color: ' + CONFIG.brandPrimary + '; color: #ffffff; text-decoration: none; padding: 12px 8px; border-radius: 6px; font-size: 13px; font-weight: 600; text-align: center;">Email</a>' +
'                  </td>' +
'                  <td width="33%" style="padding: 0 4px;">' +
'                    <a href="tel:' + data.phone + '" style="display: block; background-color: #3b82f6; color: #ffffff; text-decoration: none; padding: 12px 8px; border-radius: 6px; font-size: 13px; font-weight: 600; text-align: center;">Call</a>' +
'                  </td>' +
'                  <td width="33%" style="padding: 0 4px;">' +
'                    <a href="https://wa.me/' + whatsappNumber + '?text=Hi%20' + encodeMailto(data.name) + ',%20thank%20you%20for%20your%20quote%20request%20for%20' + encodeMailto(data.serviceLabel) + '." style="display: block; background-color: #22c55e; color: #ffffff; text-decoration: none; padding: 12px 8px; border-radius: 6px; font-size: 13px; font-weight: 600; text-align: center;">WhatsApp</a>' +
'                  </td>' +
'                </tr>' +
'              </table>' +
'            </td>' +
'          </tr>' +
'          <tr>' +
'            <td style="background-color: #1f2937; padding: 16px 24px;">' +
'              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">' +
'                <tr>' +
'                  <td>' +
'                    <p style="margin: 0; color: #9ca3af; font-size: 12px;"><a href="' + CONFIG.websiteUrl + '" style="color: ' + CONFIG.brandSecondary + '; text-decoration: none;">' + CONFIG.businessName + '</a></p>' +
'                  </td>' +
'                  <td align="right">' +
'                    <a href="' + SpreadsheetApp.getActiveSpreadsheet().getUrl() + '" style="color: #9ca3af; text-decoration: none; font-size: 12px;">View Leads →</a>' +
'                  </td>' +
'                </tr>' +
'              </table>' +
'            </td>' +
'          </tr>' +
'        </table>' +
'      </td>' +
'    </tr>' +
'  </table>' +
'</body>' +
'</html>';

  const emailOptions = {
    to: CONFIG.notifyEmails,
    subject: subject,
    body: plainBody,
    htmlBody: htmlBody,
    replyTo: data.email,
    name: CONFIG.businessName + ' Website'
  };

  if (CONFIG.ccEmails) {
    emailOptions.cc = CONFIG.ccEmails;
  }

  MailApp.sendEmail(emailOptions);
}

// ============================================
// CUSTOMER CONFIRMATION EMAIL
// ============================================
function sendCustomerConfirmation(data, timestamp) {
  const subject = CONFIG.customerSubject + ' - ' + CONFIG.businessName;

  const plainBody =
'Hi ' + data.name + ',\n\n' +
'Thank you for contacting ' + CONFIG.businessName + '!\n\n' +
'We\'ve received your quote request for ' + data.serviceLabel + ' and will get back to you within 24 hours.\n\n' +
'YOUR REQUEST:\n' +
'- Service: ' + data.serviceLabel + '\n' +
'- Message: ' + (data.message || 'No message provided') + '\n\n' +
'CONTACT US:\n' +
'Phone: ' + CONFIG.businessPhone + '\n' +
'Email: ' + CONFIG.businessEmail + '\n\n' +
'Best regards,\n' +
CONFIG.businessName + '\n' +
CONFIG.tagline + '\n\n' +
CONFIG.websiteUrl;

  const htmlBody = '<!DOCTYPE html>' +
'<html>' +
'<head>' +
'  <meta charset="utf-8">' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0">' +
'</head>' +
'<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, \'Helvetica Neue\', Arial, sans-serif;">' +
'  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f3f4f6;">' +
'    <tr>' +
'      <td align="center" style="padding: 32px 16px;">' +
'        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 560px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">' +
'          <tr>' +
'            <td style="background: linear-gradient(135deg, ' + CONFIG.brandPrimary + ' 0%, ' + CONFIG.brandPrimaryDark + ' 100%); padding: 36px 32px; text-align: center;">' +
'              <img src="' + CONFIG.logoUrl + '" alt="' + CONFIG.businessName + '" width="80" style="max-width: 80px; height: auto; display: block; margin: 0 auto 16px; border-radius: 8px;">' +
'              <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 700;">Thank You!</h1>' +
'              <p style="margin: 10px 0 0; color: rgba(255,255,255,0.9); font-size: 15px;">We\'ve received your quote request</p>' +
'            </td>' +
'          </tr>' +
'          <tr>' +
'            <td style="padding: 28px 28px 0;">' +
'              <p style="margin: 0; color: ' + CONFIG.textDark + '; font-size: 15px; line-height: 1.6;">Hi <strong>' + escapeHtml(data.name) + '</strong>,</p>' +
'              <p style="margin: 14px 0 0; color: #4b5563; font-size: 15px; line-height: 1.6;">Thank you for reaching out to ' + CONFIG.businessName + '. We\'ve received your request and our team will review it shortly.</p>' +
'            </td>' +
'          </tr>' +
'          <tr>' +
'            <td style="padding: 20px 28px;">' +
'              <div style="background-color: ' + CONFIG.brandLight + '; border-radius: 8px; padding: 18px 20px;">' +
'                <p style="margin: 0 0 10px; color: #065f46; font-size: 14px; font-weight: 600;">What happens next?</p>' +
'                <table role="presentation" cellspacing="0" cellpadding="0">' +
'                  <tr><td style="padding: 4px 0; color: #047857; font-size: 13px; line-height: 1.5;"><span style="color: #10b981; margin-right: 8px;">✓</span> Our team will review your requirements</td></tr>' +
'                  <tr><td style="padding: 4px 0; color: #047857; font-size: 13px; line-height: 1.5;"><span style="color: #10b981; margin-right: 8px;">✓</span> We\'ll prepare a customized quote</td></tr>' +
'                  <tr><td style="padding: 4px 0; color: #047857; font-size: 13px; line-height: 1.5;"><span style="color: #10b981; margin-right: 8px;">✓</span> You\'ll hear from us within <strong>24 hours</strong></td></tr>' +
'                </table>' +
'              </div>' +
'            </td>' +
'          </tr>' +
'          <tr>' +
'            <td style="padding: 0 28px 20px;">' +
'              <p style="margin: 0 0 10px; color: ' + CONFIG.textMuted + '; font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 600;">Your Request</p>' +
'              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f9fafb; border-radius: 8px; overflow: hidden;">' +
'                <tr>' +
'                  <td style="padding: 14px 18px; border-bottom: 1px solid #e5e7eb;">' +
'                    <p style="margin: 0 0 2px; color: ' + CONFIG.textMuted + '; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;">Service</p>' +
'                    <p style="margin: 0; color: ' + CONFIG.textDark + '; font-size: 14px; font-weight: 600;">' + escapeHtml(data.serviceLabel) + '</p>' +
'                  </td>' +
'                </tr>' +
'                <tr>' +
'                  <td style="padding: 14px 18px;">' +
'                    <p style="margin: 0 0 2px; color: ' + CONFIG.textMuted + '; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;">Your Message</p>' +
'                    <p style="margin: 0; color: ' + CONFIG.textDark + '; font-size: 13px; line-height: 1.5;">' + (data.message ? escapeHtml(data.message) : '<span style="color: #9ca3af; font-style: italic;">No message provided</span>') + '</p>' +
'                  </td>' +
'                </tr>' +
'              </table>' +
'            </td>' +
'          </tr>' +
'          <tr>' +
'            <td style="padding: 0 28px 28px;">' +
'              <p style="margin: 0 0 12px; color: #4b5563; font-size: 14px;">Have an urgent question? Reach us directly:</p>' +
'              <table role="presentation" cellspacing="0" cellpadding="0">' +
'                <tr>' +
'                  <td style="padding-right: 10px;"><a href="tel:' + CONFIG.businessPhone + '" style="display: inline-block; background-color: #f3f4f6; color: ' + CONFIG.textDark + '; text-decoration: none; padding: 10px 16px; border-radius: 6px; font-size: 13px; font-weight: 500;">' + CONFIG.businessPhone + '</a></td>' +
'                  <td><a href="mailto:' + CONFIG.businessEmail + '" style="display: inline-block; background-color: #f3f4f6; color: ' + CONFIG.textDark + '; text-decoration: none; padding: 10px 16px; border-radius: 6px; font-size: 13px; font-weight: 500;">Email Us</a></td>' +
'                </tr>' +
'              </table>' +
'            </td>' +
'          </tr>' +
'          <tr>' +
'            <td style="background-color: #1f2937; padding: 24px 28px; text-align: center;">' +
'              <p style="margin: 0 0 4px; color: #ffffff; font-size: 15px; font-weight: 600;">' + CONFIG.businessName + '</p>' +
'              <p style="margin: 0 0 12px; color: #9ca3af; font-size: 12px;">' + CONFIG.tagline + '</p>' +
'              <p style="margin: 0 0 4px; color: #6b7280; font-size: 11px;">' + CONFIG.businessAddress + '</p>' +
'              <p style="margin: 14px 0 0;"><a href="' + CONFIG.websiteUrl + '" style="color: ' + CONFIG.brandSecondary + '; text-decoration: none; font-size: 12px; font-weight: 500;">Visit Our Website →</a></p>' +
'            </td>' +
'          </tr>' +
'        </table>' +
'        <p style="margin: 20px 0 0; color: #9ca3af; font-size: 11px; text-align: center;">You received this email because you submitted a quote request on our website.</p>' +
'      </td>' +
'    </tr>' +
'  </table>' +
'</body>' +
'</html>';

  MailApp.sendEmail({
    to: data.email,
    subject: subject,
    body: plainBody,
    htmlBody: htmlBody,
    replyTo: CONFIG.businessEmail,
    name: CONFIG.businessName
  });
}

// ============================================
// GET HANDLER
// ============================================
function doGet(e) {
  return ContentService
    .createTextOutput('DUE Engineering Contact Form API is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}

// ============================================
// TEST FUNCTIONS
// ============================================
function testAdminEmail() {
  const testData = {
    name: 'John Smith',
    email: 'info@duengineering.co.za',
    phone: '078 683 5210',
    service: 'residential-solar',
    serviceLabel: 'Residential Solar Installation',
    message: 'Hi, I\'m interested in a solar installation for my 3-bedroom house in Klerksdorp. We use about R2,500 worth of electricity per month.'
  };
  sendEmailNotification(testData, new Date());
  Logger.log('Test admin email sent!');
}

function testCustomerEmail() {
  const testData = {
    name: 'John Smith',
    email: 'info@duengineering.co.za',
    phone: '078 683 5210',
    service: 'residential-solar',
    serviceLabel: 'Residential Solar Installation',
    message: 'Hi, I\'m interested in a solar installation for my 3-bedroom house.'
  };
  sendCustomerConfirmation(testData, new Date());
  Logger.log('Test customer email sent!');
}

function testBothEmails() {
  testAdminEmail();
  testCustomerEmail();
  Logger.log('Both test emails sent!');
}
