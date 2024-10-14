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

  // Fetch user progress for the specified user
  const userProgressEntry = await db
    .select()
    .from(userProgress)
    .where(eq(userProgress.userId, userId))
    .limit(1); // Limit to 1 record

  // Check if user progress data exists
  if (userProgressEntry.length === 0) {
    return null;
  }

  // Get the first entry from the user progress data
  const progress = userProgressEntry[0];

  // Initialize activeCourse
  let activeCourse = null;

  // Fetch the active course if an activeCourseId exists
  if (progress.activeCourseId) {
    const courseData = await db
      .select()
      .from(courses)
      .where(eq(courses.id, progress.activeCourseId))
      .limit(1); // Limit to 1 record

    // If a course is found, assign it to activeCourse
    if (courseData.length > 0) {
      activeCourse = courseData[0]; // Get the first course
    }
  }

  // Return the user progress along with the active course
  return {
    ...progress,
    activeCourse, // This will be the course details or null if not found
  };
});

export const getCourseById = cache(async (courseId: number) => {
  const data = await db.select().from(courses).where(eq(courses.id, courseId));
  return data;
});
