import { cache } from 'react';
import { db } from './drizzle';
import { courses, userProgress } from './schema';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

export const getCourses = cache(async () => {
  const data = await db.select().from(courses);

  return data;
});

export const getUserProgress = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const data = await db
    .select()
    .from(userProgress)
    .where(eq(userProgress.userId, userId));

  const result = data.map((progress) => ({
    ...progress,
    activeCourse: true, // or a value based on your logic
  }));

  return result[0];
});

export const getCourseById = cache(async (courseId: number) => {
  const data = await db.select().from(courses).where(eq(courses.id, courseId));
  return data;
});
