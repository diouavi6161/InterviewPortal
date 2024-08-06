/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url:'postgresql://ai-interview_owner:0JMXR1nvlfBK@ep-delicate-sunset-a54xla6l.us-east-2.aws.neon.tech/ai-interview?sslmode=require' ,
    }
  };
  