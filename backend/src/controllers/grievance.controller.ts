import { Response } from 'express';
import { prisma } from '../db';
import { AuthRequest } from '../middleware/auth.middleware';

// Mock AI Processing Service
const processGrievanceWithAI = async (title: string, description: string) => {
  // In a real scenario, this connects to OpenAI API
  // e.g. openai.chat.completions.create(...)
  console.log(`[AI SERVICE] Processing Grievance: ${title}`);
  
  const text = `${title} ${description}`.toLowerCase();
  let aiClassification = 'GENERAL';
  let priority = 'LOW';
  
  if (text.includes('pothole') || text.includes('road')) {
    aiClassification = 'INFRASTRUCTURE';
    priority = 'HIGH';
  } else if (text.includes('water') || text.includes('leak')) {
    aiClassification = 'WATER_SUPPLY';
    priority = 'CRITICAL';
  } else if (text.includes('garbage') || text.includes('trash')) {
    aiClassification = 'SANITATION';
    priority = 'MEDIUM';
  }
  
  return {
    aiClassification,
    priority,
    aiConfidence: 0.92
  };
};

export const createComplaint = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { title, description, latitude, longitude } = req.body;
    const citizenId = req.user?.id;

    if (!citizenId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Call Mock AI Service
    const aiResult = await processGrievanceWithAI(title, description);

    const complaint = await prisma.complaint.create({
      data: {
        title,
        description,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        citizenId,
        aiClassification: aiResult.aiClassification,
        aiConfidence: aiResult.aiConfidence,
        priority: aiResult.priority,
        status: 'PENDING'
      }
    });

    res.status(201).json({ message: 'Complaint registered successfully', complaint });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit grievance' });
  }
};

export const getMyComplaints = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const citizenId = req.user?.id;
    const complaints = await prisma.complaint.findMany({
      where: { citizenId },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json({ complaints });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch complaints' });
  }
};

export const getAllComplaints = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const complaints = await prisma.complaint.findMany({
      include: {
        citizen: { select: { fullname: true, phone: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json({ complaints });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch complaints' });
  }
};
