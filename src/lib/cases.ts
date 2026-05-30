import 'server-only';
import fs from 'fs';
import path from 'path';
import type { Case } from './types';

export async function getCases(): Promise<Case[]> {
  const dir = path.join(process.cwd(), 'content', 'cases');
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
  const cases = files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
    return JSON.parse(raw) as Case;
  });

  return cases.sort((a, b) => b.year - a.year);
}
