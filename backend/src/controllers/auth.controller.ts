import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../db';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const { phone, email, fullname, password, role } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ phone }, { email }]
      }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this phone or email' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password || phone, 10); // temporary default if password empty

    // Create user
    const user = await prisma.user.create({
      data: {
        phone,
        email,
        fullname,
        password: hashedPassword,
        role: 'CITIZEN'
      }
    });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({ token, user: { id: user.id, fullname: user.fullname, role: user.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { phone, password } = req.body;

    // Hardcoded Admin Intercept
    if (phone === 'admin@123' && password === 'admin123') {
      const token = jwt.sign({ id: 'admin-hardcoded', role: 'ADMIN', phone }, JWT_SECRET, { expiresIn: '24h' });
      return res.status(200).json({ token, user: { id: 'admin-hardcoded', fullname: 'System Admin', role: 'ADMIN' } });
    }

    const user = await prisma.user.findUnique({
      where: { phone }
    });

    if (!user || !user.password) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({ token, user: { id: user.id, fullname: user.fullname, role: user.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to login' });
  }
};
