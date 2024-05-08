const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        // {
        //   name: "Practice",
        // },
        // {
        //   name: "Modules",
        // },
        // {
        //   name: "Full Tests",
        // },
        // {
        //   name: "Adaptive Tests",
        // },
        // {
        //   name: "English",
        // },
        // {
        //   name: "Math",
        // },
        // {
        //   name: "DU",
        // },
        {
          name: "DSAT",
        },
        {
          name: "BUP",
        },
      ],
    });
    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await db.$disconnect();
  }
}
main();
