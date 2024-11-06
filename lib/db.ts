import 'server-only';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {
  pgTable,
  text,
  integer,
  timestamp,
  pgEnum,
  serial,
  jsonb
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

// TODO: using patientId as a foreign key, you might want to add an index to it in the datasets table for better query performance.
export const llm = pgTable('llm', {
  id: serial('id').primaryKey(),
  patientId: text('patient_id').references(() => datasets.patientId),
  test: text('test'),
  diagnosis: text('diagnosis'),
  diagnosisList: jsonb('diagnosis_list'),
});

export type SelectDataset = typeof datasets.$inferSelect;
export const insertDatasetSchema = createInsertSchema(datasets);

export type SelectLlm = typeof llm.$inferSelect;
export const insertLlmSchema = createInsertSchema(llm);

export async function getDatasets(
  search: string,
  offset: number,
  pageSize: number = 25
): Promise<{
  datasets: (SelectDataset & { llm?: SelectLlm })[];
  newOffset: number | null;
  totalDatasets: number;
}> {
  // Always search the full table, not per page
  if (search) {
    const results = await db
      .select()
      .from(datasets)
      .leftJoin(llm, eq(datasets.patientId, llm.patientId))
      .where(ilike(datasets.report, `%${search}%`))
      .limit(1000);

    return {
      datasets: results.map(r => ({
        ...r.datasets,
        llm: r.llm || undefined
      })),
      newOffset: null,
      totalDatasets: 0
    };
  }

  if (offset === null) {
    return { datasets: [], newOffset: null, totalDatasets: 0 };
  }

  let totalDatasets = await db.select({ count: count() }).from(datasets);
  let moreDatasets = await db
    .select()
    .from(datasets)
    .leftJoin(llm, eq(datasets.patientId, llm.patientId))
    .limit(pageSize)
    .offset(offset);

  let newOffset = moreDatasets.length >= pageSize ? offset + pageSize : null;

  return {
    datasets: moreDatasets.map(r => ({
      ...r.datasets,
      llm: r.llm || undefined
    })),
    newOffset,
    totalDatasets: totalDatasets[0].count
  };
}

export async function deleteDatasetById(id: number) {
  await db.delete(datasets).where(eq(datasets.id, id));
}
