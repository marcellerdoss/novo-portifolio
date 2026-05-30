import 'server-only';
import fs from 'fs';
import path from 'path';
import type { ExperienceItem } from './types';

export async function getExperience(): Promise<ExperienceItem[]> {
  const file = path.join(process.cwd(), 'content', 'experience.json');
  if (!fs.existsSync(file)) return [];
  const raw = fs.readFileSync(file, 'utf-8');
  return JSON.parse(raw) as ExperienceItem[];
}
