'use server';

import { deleteDatasetById } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function deleteDataset(formData: FormData) {
  // let id = Number(formData.get('id'));
  // await deleteDatasetById(id);
  // revalidatePath('/');
}
