import { db, datasets } from 'lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json({
    message: 'Uncomment to seed data after DB is set up.'
  });

  // await db.insert(datasets).values([
  //   {
  //     id: 1,
  //     imageUrl: '...',
  //     name: 'Dataset 1',
  //     status: 'active',
  //     price: '99.00',
  //     stock: 100,
  //     availableAt: new Date()
  //   },
  // ]);

  // Inserting data from test-patients.json
  await db.insert(datasets).values([
    {
      modality: "US",
      studyDate: new Date("2021-01-31"),
      patientId: "gAAAAABgn1pFquZ5AF8RqI5ClU0aOH3LOeA-J1OSlW1MHmyFNCc2_HAzOHfoasP09agJ35R4fpYTazPAB6rn2Ipm00b4BcTD3g==",
      patientDob: new Date("1974-04-20"),
      patientSex: "F",
      report: "OBR||BH01202101310014|ABH01OCA21027584|TEST000212^USG ABDOMEN WITH PELVIS||||||||||||||||||||US|||||||||||||OBX|1|FT|TEST000212^USG ABDOMEN WITH PELVIS|1435644|...",
      accession: "BH01202101310014",
      patientAge: 47,
    },
    {
      modality: "US",
      studyDate: new Date("2021-01-31"),
      patientId: "gAAAAABgn1pFRpjpAOXCxT0l3ZfxLQRQ3Tl1SyuRKTiSAxpvuVcUDQJDB518TjXo2YT-HRb8ztx7L2W7OWQRVXshitBSGLDmjw==",
      patientDob: new Date("1974-04-20"),
      patientSex: "F",
      report: "OBR||BH01202101310014|ABH01OCA21027584|TEST000212^USG ABDOMEN WITH PELVIS||||||||||||||||||||US|||||||||||||OBX|1|FT|TEST000212^USG ABDOMEN WITH PELVIS|1435644|...",
      accession: "BH01202101310014",
      patientAge: 47,
    },
    {
      modality: "MR",
      studyDate: new Date("2021-01-31"),
      patientId: "gAAAAABgn1pFKwmLwt7n19CI-jSHHQsVDDQxEIzoNXEpmeq4MzjP1b9rlJwtUrtsMB0jWEjdEdMoD9vwfiN7dyQT9YVD2CkdSQ==",
      patientDob: new Date("1974-08-18"),
      patientSex: "F",
      report: "OBR||BH01202101310033|ABH01OCR21004505^^O|TEST000782^MRI LUMBAR SPINE|R||20210131102953|20210131102953||||^||||^^^^||||||||MR|F||||||||||||NTE|||||",
      accession: "BH01202101310033",
      patientAge: 47,
    },
    {
      modality: "01",
      studyDate: new Date("2021-01-31"),
      patientId: "gAAAAABgn1pF52o7z51yzqNEPA104rgUUxSj9d5IgXMAKmt_4UL-aOK9--9sY5lXBEc8sFD9E6z3r0ml-iLcZQoV8yvCk7Uh9w==",
      patientDob: new Date("1997-12-30"),
      patientSex: "M",
      report: "",
      accession: "",
      patientAge: 24,
    },
    {
      modality: "US",
      studyDate: new Date("2021-01-31"),
      patientId: "gAAAAABgn1pFaEduYOO4IeZMcHeeHASEOg4H-1oY5MGMqKkUpoIuFKnQw4XKva7AoSTdiIxJtkULmWnrda5H8GJvKAeGqvZniw==",
      patientDob: new Date("1936-01-01"),
      patientSex: "M",
      report: "OBR||BH01202101300244|LO21000029517^^O|TEST000212^USG ABDOMEN WITH PELVIS|R||20210131103346|20210131103346||||^||||^^^^||||||||US|F||||||||||||NTE|||||",
      accession: "BH01202101300244",
      patientAge: 85,
    }
  ]);
}
