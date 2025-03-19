-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TodoLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "todoId" INTEGER,
    CONSTRAINT "TodoLog_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "Todo" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_TodoLog" ("completed", "createdAt", "id", "title") SELECT "completed", "createdAt", "id", "title" FROM "TodoLog";
DROP TABLE "TodoLog";
ALTER TABLE "new_TodoLog" RENAME TO "TodoLog";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
