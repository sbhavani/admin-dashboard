import 'server-only';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {
  pgTable,
  text,
  integer,
  timestamp,
  pgEnum,
  serial
} from 'drizzle-orm/pg-core';
import { count, eq, ilike } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';

export const db = drizzle(neon(process.env.POSTGRES_URL!));

export const datasets = pgTable('datasets', {
  id: serial('id').primaryKey(),
  modality: text('modality').notNull(),
  studyDate: timestamp('study_date').notNull(),
  patientId: text('patient_id').notNull(),
  patientDob: timestamp('patient_dob').notNull(),
  patientSex: text('patient_sex').notNull(),
  report: text('report').notNull(),
  accession: text('accession').notNull(),
  patientAge: integer('patient_age').notNull(),
});

export type SelectDataset = typeof datasets.$inferSelect;
export const insertDatasetSchema = createInsertSchema(datasets);

export async function getDatasets(
  search: string,
  offset: number
): Promise<{
  datasets: SelectDataset[];
  newOffset: number | null;
  totalDatasets: number;
}> {
  // Always search the full table, not per page
  if (search) {
    return {
      datasets: await db
        .select()
        .from(datasets)
        .where(ilike(datasets.report, `%${search}%`))
        .limit(1000),
      newOffset: null,
      totalDatasets: 0
    };
  }

  if (offset === null) {
    return { datasets: [], newOffset: null, totalDatasets: 0 };
  }

  let totalDatasets = await db.select({ count: count() }).from(datasets);
  let moreDatasets = await db.select().from(datasets).limit(5).offset(offset);
  let newOffset = moreDatasets.length >= 5 ? offset + 5 : null;

  return {
    datasets: moreDatasets,
    newOffset,
    totalDatasets: totalDatasets[0].count
  };
}

export async function deleteDatasetById(id: number) {
  await db.delete(datasets).where(eq(datasets.id, id));
}
