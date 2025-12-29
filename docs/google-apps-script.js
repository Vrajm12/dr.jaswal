/**
 * Google Apps Script for Consultation Booking Form
 * 
 * SETUP INSTRUCTIONS:
 * 
 * 1. Go to Google Sheets and create a new spreadsheet
 * 2. Name it "Consultation Bookings" or any name you prefer
 * 3. Add these headers in Row 1:
 *    A1: Timestamp | B1: Full Name | C1: Age | D1: Email | E1: Phone | 
 *    F1: Consultation Type | G1: Urgency Level | H1: Preferred Date | 
 *    I1: Preferred Time | J1: Symptoms | K1: Medical History
 * 
 * 4. Go to Extensions > Apps Script
 * 5. Replace the default code with this entire script
 * 6. Click "Deploy" > "New deployment"
 * 7. Select type: "Web app"
 * 8. Set "Execute as": "Me"
 * 9. Set "Who has access": "Anyone"
 * 10. Click "Deploy" and copy the Web App URL
 * 11. Replace GOOGLE_SCRIPT_URL in consultation-options.tsx with your URL
 * 
 * OPTIONAL: Email Notification Setup
 * - Uncomment the sendEmailNotification function call in doPost
 * - Update DOCTOR_EMAIL with the actual email address
 */

// Configuration
const SPREADSHEET_ID = '1ajEpFzFUHg9MnYxAhxuCZwaKVI0xJvrP01-4VVKJVPI'; // Replace with your Google Sheet ID
const SHEET_NAME = 'Bookings';
const DOCTOR_EMAIL = 'veerajmatnale@gmail.com';

/**
 * Handles POST requests from the website
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Check if it's a contact form or consultation form
    if (data.formType === 'contact') {
      // Save to Contact Messages sheet
      saveContactToSheet(data);
      // Send contact email notification
      sendContactEmailNotification(data);
    } else {
      // Save to Consultation Bookings sheet
      saveToSheet(data);
      // Send consultation email notification
      sendEmailNotification(data);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Data saved successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handles GET requests (for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'OK', message: 'Consultation Booking API is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Saves booking data to Google Sheets
 */
function saveToSheet(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // Add headers
    sheet.getRange(1, 1, 1, 11).setValues([[
      'Timestamp',
      'Full Name',
      'Age',
      'Email',
      'Phone',
      'Consultation Type',
      'Urgency Level',
      'Preferred Date',
      'Preferred Time',
      'Symptoms',
      'Medical History'
    ]]);
    // Format headers
    sheet.getRange(1, 1, 1, 11).setFontWeight('bold').setBackground('#2F72B8').setFontColor('#ffffff');
  }
  
  // Append new row
  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.fullName,
    data.age,
    data.email,
    data.phone,
    data.consultationType,
    data.urgencyLevel,
    data.preferredDate,
    data.preferredTime,
    data.symptoms || '',
    data.medicalHistory || ''
  ]);
  
  // Auto-resize columns
  sheet.autoResizeColumns(1, 11);
}

/**
 * Sends email notification to doctor (optional)
 */
function sendEmailNotification(data) {
  const subject = `NEW CONSULTATION REQUEST - ${data.fullName} (${data.urgencyLevel.toUpperCase()})`;
  
  const htmlBody = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 700px; margin: 0 auto; background: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #2F72B8 0%, #3B96D7 50%, #5E3491 100%); color: white; padding: 25px 30px; border-radius: 8px 8px 0 0;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td>
              <h1 style="margin: 0; font-size: 24px; font-weight: 600;">CONSULTATION REQUEST</h1>
              <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">EternaWell AI Healthcare Portal</p>
            </td>
            <td style="text-align: right;">
              <div style="background: rgba(255,255,255,0.2); padding: 8px 12px; border-radius: 6px; font-size: 12px;">
                URGENT: ${data.urgencyLevel.toUpperCase()}
              </div>
            </td>
          </tr>
        </table>
      </div>
      
      <!-- Main Content -->
      <div style="padding: 30px;">
        <!-- Patient Information -->
        <div style="margin-bottom: 25px;">
          <h2 style="color: #2F72B8; font-size: 18px; margin: 0 0 15px 0; padding-bottom: 8px; border-bottom: 2px solid #2F72B8;">PATIENT INFORMATION</h2>
          <table style="width: 100%; border-collapse: collapse; background: #f8f9fa; border-radius: 6px;">
            <tr>
              <td style="padding: 12px 15px; font-weight: 600; color: #495057; width: 25%;">Full Name:</td>
              <td style="padding: 12px 15px; color: #212529;">${data.fullName}</td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="padding: 12px 15px; font-weight: 600; color: #495057;">Age:</td>
              <td style="padding: 12px 15px; color: #212529;">${data.age} years</td>
            </tr>
            <tr>
              <td style="padding: 12px 15px; font-weight: 600; color: #495057;">Contact Number:</td>
              <td style="padding: 12px 15px;"><a href="tel:${data.phone}" style="color: #2F72B8; text-decoration: none; font-weight: 500;">${data.phone}</a></td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="padding: 12px 15px; font-weight: 600; color: #495057;">Email Address:</td>
              <td style="padding: 12px 15px;"><a href="mailto:${data.email}" style="color: #2F72B8; text-decoration: none; font-weight: 500;">${data.email}</a></td>
            </tr>
          </table>
        </div>
        
        <!-- Appointment Details -->
        <div style="margin-bottom: 25px;">
          <h2 style="color: #5E3491; font-size: 18px; margin: 0 0 15px 0; padding-bottom: 8px; border-bottom: 2px solid #5E3491;">APPOINTMENT DETAILS</h2>
          <table style="width: 100%; border-collapse: collapse; background: #f8f9fa; border-radius: 6px;">
            <tr>
              <td style="padding: 12px 15px; font-weight: 600; color: #495057; width: 25%;">Consultation Type:</td>
              <td style="padding: 12px 15px; color: #212529; text-transform: capitalize;">${data.consultationType} Consultation</td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="padding: 12px 15px; font-weight: 600; color: #495057;">Priority Level:</td>
              <td style="padding: 12px 15px;">
                <span style="background: ${data.urgencyLevel === 'urgent' ? '#dc3545' : data.urgencyLevel === 'priority' ? '#fd7e14' : '#28a745'}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; text-transform: uppercase;">
                  ${data.urgencyLevel}
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 15px; font-weight: 600; color: #495057;">Requested Date:</td>
              <td style="padding: 12px 15px; color: #212529; font-weight: 500;">${new Date(data.preferredDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="padding: 12px 15px; font-weight: 600; color: #495057;">Preferred Time:</td>
              <td style="padding: 12px 15px; color: #212529; text-transform: capitalize;">${data.preferredTime}</td>
            </tr>
          </table>
        </div>
        
        <!-- Clinical Information -->
        <div style="margin-bottom: 25px;">
          <h2 style="color: #2F72B8; font-size: 18px; margin: 0 0 15px 0; padding-bottom: 8px; border-bottom: 2px solid #2F72B8;">PRESENTING SYMPTOMS</h2>
          <div style="background: #fff; padding: 20px; border-radius: 6px; border-left: 4px solid #2F72B8; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <p style="margin: 0; color: #495057; line-height: 1.6; white-space: pre-wrap;">${data.symptoms || 'No specific symptoms mentioned'}</p>
          </div>
        </div>
        
        <div style="margin-bottom: 25px;">
          <h2 style="color: #5E3491; font-size: 18px; margin: 0 0 15px 0; padding-bottom: 8px; border-bottom: 2px solid #5E3491;">MEDICAL HISTORY</h2>
          <div style="background: #fff; padding: 20px; border-radius: 6px; border-left: 4px solid #5E3491; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <p style="margin: 0; color: #495057; line-height: 1.6; white-space: pre-wrap;">${data.medicalHistory || 'No previous medical history provided'}</p>
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="background: #f8f9fa; padding: 20px 30px; border-top: 1px solid #dee2e6; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td>
              <p style="margin: 0; font-size: 13px; color: #6c757d;">
                <strong>Submitted:</strong> ${new Date(data.timestamp).toLocaleString('en-US', { 
                  timeZone: 'Asia/Kolkata',
                  weekday: 'long',
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })} IST
              </p>
            </td>
            <td style="text-align: right;">
              <p style="margin: 0; font-size: 12px; color: #6c757d;">
                EternaWell AI Healthcare Portal<br>
                Dr. Gaurav Jaswal - Radiation Oncology
              </p>
            </td>
          </tr>
        </table>
      </div>
    </div>
  `;
  
  MailApp.sendEmail({
    to: DOCTOR_EMAIL,
    subject: subject,
    htmlBody: htmlBody
  });
}

/**
 * Saves contact form data to Google Sheets
 */
function saveContactToSheet(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName('Contact Messages');
  
  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet('Contact Messages');
    // Add headers
    sheet.getRange(1, 1, 1, 7).setValues([[
      'Timestamp',
      'Full Name',
      'Email',
      'Phone',
      'Inquiry Type',
      'Subject',
      'Message'
    ]]);
    // Format headers
    sheet.getRange(1, 1, 1, 7).setFontWeight('bold').setBackground('#5E3491').setFontColor('#ffffff');
  }
  
  // Append new row
  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.fullName,
    data.email,
    data.phone,
    data.inquiryType,
    data.subject,
    data.message
  ]);
  
  // Auto-resize columns
  sheet.autoResizeColumns(1, 7);
}

/**
 * Sends contact form email notification to doctor
 */
function sendContactEmailNotification(data) {
  const subject = `NEW INQUIRY - ${data.subject} (${data.inquiryType})`;
  
  const htmlBody = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 700px; margin: 0 auto; background: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #5E3491 0%, #3B96D7 50%, #2F72B8 100%); color: white; padding: 25px 30px; border-radius: 8px 8px 0 0;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td>
              <h1 style="margin: 0; font-size: 24px; font-weight: 600;">NEW INQUIRY RECEIVED</h1>
              <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">EternaWell AI Healthcare Portal</p>
            </td>
            <td style="text-align: right;">
              <div style="background: rgba(255,255,255,0.2); padding: 8px 12px; border-radius: 6px; font-size: 12px; text-transform: uppercase;">
                ${data.inquiryType}
              </div>
            </td>
          </tr>
        </table>
      </div>
      
      <!-- Main Content -->
      <div style="padding: 30px;">
        <!-- Contact Information -->
        <div style="margin-bottom: 25px;">
          <h2 style="color: #5E3491; font-size: 18px; margin: 0 0 15px 0; padding-bottom: 8px; border-bottom: 2px solid #5E3491;">CONTACT INFORMATION</h2>
          <table style="width: 100%; border-collapse: collapse; background: #f8f9fa; border-radius: 6px;">
            <tr>
              <td style="padding: 12px 15px; font-weight: 600; color: #495057; width: 25%;">Full Name:</td>
              <td style="padding: 12px 15px; color: #212529;">${data.fullName}</td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="padding: 12px 15px; font-weight: 600; color: #495057;">Email Address:</td>
              <td style="padding: 12px 15px;"><a href="mailto:${data.email}" style="color: #5E3491; text-decoration: none; font-weight: 500;">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 15px; font-weight: 600; color: #495057;">Phone Number:</td>
              <td style="padding: 12px 15px;"><a href="tel:${data.phone}" style="color: #5E3491; text-decoration: none; font-weight: 500;">${data.phone}</a></td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="padding: 12px 15px; font-weight: 600; color: #495057;">Inquiry Type:</td>
              <td style="padding: 12px 15px;">
                <span style="background: #5E3491; color: white; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; text-transform: uppercase;">
                  ${data.inquiryType}
                </span>
              </td>
            </tr>
          </table>
        </div>
        
        <!-- Subject -->
        <div style="margin-bottom: 25px;">
          <h2 style="color: #2F72B8; font-size: 18px; margin: 0 0 15px 0; padding-bottom: 8px; border-bottom: 2px solid #2F72B8;">SUBJECT</h2>
          <div style="background: #fff; padding: 20px; border-radius: 6px; border-left: 4px solid #2F72B8; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <h3 style="margin: 0; color: #2F72B8; font-size: 16px; font-weight: 600;">${data.subject}</h3>
          </div>
        </div>
        
        <!-- Message -->
        <div style="margin-bottom: 25px;">
          <h2 style="color: #5E3491; font-size: 18px; margin: 0 0 15px 0; padding-bottom: 8px; border-bottom: 2px solid #5E3491;">MESSAGE DETAILS</h2>
          <div style="background: #fff; padding: 20px; border-radius: 6px; border-left: 4px solid #5E3491; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <p style="margin: 0; color: #495057; line-height: 1.6; white-space: pre-wrap; font-size: 14px;">${data.message}</p>
          </div>
        </div>
        
        <!-- Response Action -->
        <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 20px; border-radius: 6px; border: 1px solid #dee2e6; text-align: center;">
          <h3 style="margin: 0 0 10px 0; color: #495057; font-size: 16px;">Quick Response Actions</h3>
          <p style="margin: 0 0 15px 0; color: #6c757d; font-size: 14px;">Click below to respond to this inquiry</p>
          <a href="mailto:${data.email}?subject=Re: ${data.subject}&body=Dear ${data.fullName},%0D%0A%0D%0AThank you for contacting EternaWell AI Healthcare Portal.%0D%0A%0D%0ABest regards,%0D%0ADr. Gaurav Jaswal" 
             style="display: inline-block; background: linear-gradient(135deg, #5E3491, #2F72B8); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; margin-right: 10px;">
            Reply via Email
          </a>
          <a href="tel:${data.phone}" 
             style="display: inline-block; background: linear-gradient(135deg, #28a745, #20c997); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">
            Call Patient
          </a>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="background: #f8f9fa; padding: 20px 30px; border-top: 1px solid #dee2e6; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td>
              <p style="margin: 0; font-size: 13px; color: #6c757d;">
                <strong>Received:</strong> ${new Date(data.timestamp).toLocaleString('en-US', { 
                  timeZone: 'Asia/Kolkata',
                  weekday: 'long',
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })} IST
              </p>
            </td>
            <td style="text-align: right;">
              <p style="margin: 0; font-size: 12px; color: #6c757d;">
                EternaWell AI Healthcare Portal<br>
                Dr. Gaurav Jaswal - Radiation Oncology
              </p>
            </td>
          </tr>
        </table>
      </div>
    </div>
  `;
  
  MailApp.sendEmail({
    to: DOCTOR_EMAIL,
    subject: subject,
    htmlBody: htmlBody
  });
}

/**
 * Test function - Run this to test the setup
 */
function testSetup() {
  const testData = {
    timestamp: new Date().toISOString(),
    fullName: 'Test Patient',
    age: '30',
    email: 'test@example.com',
    phone: '+91 9876543210',
    consultationType: 'video',
    urgencyLevel: 'routine',
    preferredDate: '2025-12-10',
    preferredTime: 'morning',
    symptoms: 'Test symptoms',
    medicalHistory: 'Test medical history'
  };
  
  saveToSheet(testData);
  Logger.log('Test data saved successfully!');
}
