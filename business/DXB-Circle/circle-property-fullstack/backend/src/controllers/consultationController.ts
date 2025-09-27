import { Request, Response } from 'express';
import { z } from 'zod';

const consultationRequestSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  investorType: z.enum(['HNWI', 'FAMILY_OFFICE', 'PROPERTY_OWNER', 'DEVELOPER', 'INVESTMENT_MANAGER']),
  consultationType: z.enum(['GENERAL', 'BESPOKE_QUOTATION', 'SERVICE_DISCUSSION', 'SWITCH_CONSULTATION']),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  contactMethod: z.enum(['PHONE', 'WHATSAPP', 'EMAIL', 'IN_PERSON', 'VIDEO_CONFERENCE']),
  message: z.string().optional(),
  ticketSize: z.string().optional(),
  timeline: z.string().optional()
});

export const requestConsultation = async (req: Request, res: Response) => {
  try {
    const data = consultationRequestSchema.parse(req.body);
    
    // TODO: Save to database using Prisma
    // TODO: Send confirmation email
    // TODO: Add to CRM system
    // TODO: Schedule calendar invite if date/time provided
    
    // For now, return success with mock consultation ID
    const consultationId = `cons_${Date.now()}`;
    
    res.json({
      success: true,
      message: 'Consultation request received',
      consultationId,
      nextSteps: [
        'You will receive a confirmation email within 5 minutes',
        'Our team will contact you within 2 business hours',
        'We will schedule a convenient time for your consultation'
      ]
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request data',
        details: error.errors
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to process consultation request'
    });
  }
};

export const getConsultations = async (req: Request, res: Response) => {
  try {
    // TODO: Implement authentication and authorization
    // TODO: Fetch from database based on user permissions
    
    // Mock response for now
    res.json({
      success: true,
      consultations: [],
      total: 0
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch consultations'
    });
  }
};

export const updateConsultationStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    
    // TODO: Validate status enum
    // TODO: Update in database
    // TODO: Send notification emails
    
    res.json({
      success: true,
      message: 'Consultation status updated',
      consultationId: id
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update consultation status'
    });
  }
};
