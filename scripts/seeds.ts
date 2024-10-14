import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { courses, userProgress } from '@/db/schema';

// Load environment variables from .env file
config({ path: '.env' }); // or use '.env.local' if necessary

// Initialize Neon SQL connection with the database URL from the environment
const sql = neon(process.env.DATABASE_URL!);

// Initialize Drizzle ORM with the Neon SQL connection
export const db = drizzle(sql);

const main = async () => {
  try {
    console.log('Seeding database...');
    // Delete records from 'courses' and 'userProgress' tables
    await db.delete(courses);
    await db.delete(userProgress);

    await db.insert(courses).values([
      {
        id: 1,
        title: 'Spanish',
        imageSrc: '/es.svg',
      },
      {
        id: 2,
        title: 'Italian',
        imageSrc: '/it.svg',
      },
      {
        id: 3,
        title: 'French',
        imageSrc: '/fr.svg',
      },
      {
        id: 4,
        title: 'Croatian',
        imageSrc: '/hr.svg',
      },
    ]);
    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Failed to seed database:', error);
  }
};

// Run the main function
main();
