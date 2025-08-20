import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS  
  }
});


export const sendNewRequestEmail = async ({ employeeName, employeeEmail, department, amount, description, date }) => {
  const to = process.env.HR_EMAIL;
  const subject = `New Allowance Request from ${employeeName}`;
  const fmtAmount = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

  const html = `
    <h2>New Travel Allowance Request</h2>
    <p><strong>Employee:</strong> ${employeeName} (${employeeEmail})</p>
    <p><strong>Department:</strong> ${department}</p>
    <p><strong>Amount:</strong> ${fmtAmount}</p>
    <p><strong>Date:</strong> ${new Date(date).toDateString()}</p>
    <p><strong>Description:</strong><br/>${description || '-'}</p>
    <hr/>
    <p>Status starts as <b>Pending</b>. Visit the dashboard/API to approve or reject.</p>
  `;

  await transporter.sendMail({
    from: process.env.MAIL_FROM || process.env.EMAIL_USER,
    to,
    subject,
    html,
  });
};
