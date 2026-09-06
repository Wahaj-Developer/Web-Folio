import ContactMessage from '../models/ContactMessage.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendContactMessage = async (req, res, next) => {
  try {
    const { name, subject, email, message } = req.body;

    const contactMessage = await ContactMessage.create({
      name,
      subject,
      email,
      message,
    });

    // Send email notification (optional)
    if (process.env.SMTP_HOST) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          secure: process.env.SMTP_PORT === '465',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
          },
        });

        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
          subject: `New Contact Message from ${name}`,
          html: `
            <h2>New Contact Message</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `,
        });
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
        // Don't fail the request if email fails
      }
    }

    res.status(201).json(successResponse(
      { id: contactMessage._id },
      'Message sent successfully'
    ));
  } catch (error) {
    next(error);
  }
};

// Admin: Get all contact messages
export const getContactMessages = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await ContactMessage.countDocuments();

    const messages = await ContactMessage.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json(successResponse(
      messages,
      'Messages retrieved successfully',
      {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      }
    ));
  } catch (error) {
    next(error);
  }
};

// Admin: Delete contact message
export const deleteContactMessage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const message = await ContactMessage.findById(id);
    if (!message) {
      return res.status(404).json(errorResponse('Message not found'));
    }

    await message.deleteOne();

    res.json(successResponse(null, 'Message deleted successfully'));
  } catch (error) {
    next(error);
  }
};

// Admin: Get contact message count
export const getContactMessageCount = async (req, res, next) => {
  try {
    const count = await ContactMessage.countDocuments();
    res.json(successResponse({ count }, 'Message count retrieved successfully'));
  } catch (error) {
    next(error);
  }
};
