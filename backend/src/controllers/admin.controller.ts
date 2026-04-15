import { Response } from 'express';
import { prisma } from '../db';
import { AuthRequest } from '../middleware/auth.middleware';

export const updateComplaintPriority = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { priority } = req.body;
    
    if (!priority) {
      return res.status(400).json({ error: 'Priority is required' });
    }

    const complaint = await prisma.complaint.update({
      where: { id },
      data: { priority }
    });
    
    res.status(200).json({ message: 'Priority updated', complaint });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update priority' });
  }
};

export const updateComplaintStatus = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const complaint = await prisma.complaint.update({
      where: { id },
      data: { status }
    });
    
    res.status(200).json({ message: 'Status updated', complaint });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update status' });
  }
};

export const getAllUsers = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        fullname: true,
        phone: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const getDashboardStats = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const totalComplaints = await prisma.complaint.count();
    const resolvedComplaints = await prisma.complaint.count({ where: { status: 'RESOLVED' } });
    const pendingComplaints = await prisma.complaint.count({ where: { status: 'PENDING' } });
    const totalUsers = await prisma.user.count();

    res.status(200).json({
      totalComplaints,
      resolvedComplaints,
      pendingComplaints,
      totalUsers
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};
