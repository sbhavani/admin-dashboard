import { db, datasets } from 'lib/db';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Read the JSONL file
    const filePath = path.join(process.cwd(), 'data', 'patients.jsonl');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    
    // Parse JSONL content (each line is a JSON object)
    const patients = fileContent
      .split('\n')
      .filter(line => line.trim())  // Remove empty lines
      .map(line => {
        const patient = JSON.parse(line);
        return {
          modality: patient.modality,
          studyDate: new Date(patient.study_date),
          patientId: patient.patient_id,
          patientDob: new Date(patient.patient_dob),
          patientSex: patient.patient_sex,
          report: patient.report,
          accession: patient.accession,
          patientAge: patient.patient_age,
        };
      });

    // Insert the data into the database
    await db.insert(datasets).values(patients);

    return Response.json({ 
      success: true, 
      message: `Inserted ${patients.length} records` 
    });

  } catch (error) {
    console.error('Error seeding database:', error);
    return Response.json({ 
      success: false, 
    }, { status: 500 });
  }
}
