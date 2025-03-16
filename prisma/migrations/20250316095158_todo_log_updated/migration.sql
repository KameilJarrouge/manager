/*
  Warnings:

  - You are about to drop the column `details` on the `TodoLog` table. All the data in the column will be lost.
  - You are about to drop the column `todoId` on the `TodoLog` table. All the data in the column will be lost.
  - Added the required column `title` to the `TodoLog` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TodoLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_TodoLog" ("completed", "createdAt", "id") SELECT "completed", "createdAt", "id" FROM "TodoLog";
DROP TABLE "TodoLog";
ALTER TABLE "new_TodoLog" RENAME TO "TodoLog";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
