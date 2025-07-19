/*
  Warnings:

  - Added the required column `sex` to the `Day` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Day" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "weight" DECIMAL NOT NULL,
    "neck" DECIMAL NOT NULL,
    "waist" DECIMAL NOT NULL,
    "hip" DECIMAL,
    "sex" TEXT NOT NULL
);
INSERT INTO "new_Day" ("date", "hip", "id", "neck", "waist", "weight") SELECT "date", "hip", "id", "neck", "waist", "weight" FROM "Day";
DROP TABLE "Day";
ALTER TABLE "new_Day" RENAME TO "Day";
CREATE UNIQUE INDEX "Day_date_key" ON "Day"("date");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
