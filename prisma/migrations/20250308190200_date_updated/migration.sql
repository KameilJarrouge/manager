/*
  Warnings:

  - You are about to drop the column `date` on the `Date` table. All the data in the column will be lost.
  - Added the required column `day` to the `Date` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `Date` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Date" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "month" INTEGER NOT NULL,
    "day" INTEGER NOT NULL
);
INSERT INTO "new_Date" ("id", "title") SELECT "id", "title" FROM "Date";
DROP TABLE "Date";
ALTER TABLE "new_Date" RENAME TO "Date";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
