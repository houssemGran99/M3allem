import { Request, Response } from 'express';
import { Category } from '../models/Category';

export async function listCategories(_req: Request, res: Response) {
  const categories = await Category.find().sort({ slug: 1 });
  res.json({ categories });
}
