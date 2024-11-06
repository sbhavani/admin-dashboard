import { db, datasets, llm } from 'lib/db';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

async function readPatientsFile() {
  const filePath = path.join(process.cwd(), 'data', 'patients.jsonl');
  const fileContent = await fs.readFile(filePath, 'utf-8');
  
  return fileContent
    .split('\n')
    .filter(line => line.trim())
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
}

async function readAIResultsFile() {
  const filePath = path.join(process.cwd(), 'data', 'enriched_patients.jsonl');
  const fileContent = await fs.readFile(filePath, 'utf-8');
  
  return fileContent
    .split('\n')
    .filter(line => line.trim())
    .map(line => {
      const patient = JSON.parse(line);
      return {
        patientId: patient.patient_id,
        test: patient.test,
        diagnosis: patient.diagnosis,
        diagnosisList: patient.diagnosis_list,
      };
    });
}

export async function GET() {
  try {
    // const patients = await readPatientsFile();
    const patients = await readAIResultsFile();
    
    // Insert the data into the database
    // await db.insert(datasets).values(patients);
    // You'll need to create another table/insert for enrichedPatients
    await db.insert(llm).values(patients);

    return Response.json({ 
      success: true, 
      message: `Inserted ${patients.length} patient records` 
    });
    
  } catch (error) {
    console.error('Error seeding database:', error);
    return Response.json({ 
      success: false, 
    }, { status: 500 });
  }
}
