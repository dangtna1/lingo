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

  const userProgress = await db.query.userProgress.findFirst({
    with: {
      activeCourse: true,
    },
  });

  return userProgress;
});

export const getCourseById = cache(async (courseId: number) => {
  const data = await db.select().from(courses).where(eq(courses.id, courseId));
  return data;
});
