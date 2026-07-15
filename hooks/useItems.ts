import { useLiveQuery } from 'drizzle-orm/expo-sqlite';

import { db } from '@/lib/db/client';
import { items } from '@/lib/db/schema';

export function useItems() {
  const { data, error } = useLiveQuery(db.select().from(items).orderBy(items.id));

  return { items: data ?? [], error };
}

export async function insertItem(name: string) {
  await db.insert(items).values({ name });
}
