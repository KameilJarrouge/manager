-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "shouldRepeat" BOOLEAN NOT NULL DEFAULT false,
    "repeatType" TEXT,
    "repeat" TEXT,
    "isPaused" BOOLEAN NOT NULL DEFAULT false,
    "icon" INTEGER NOT NULL DEFAULT 0,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isFlexible" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Todo" ("date", "icon", "id", "isPaused", "repeat", "repeatType", "shouldRepeat", "title") SELECT "date", "icon", "id", "isPaused", "repeat", "repeatType", "shouldRepeat", "title" FROM "Todo";
DROP TABLE "Todo";
ALTER TABLE "new_Todo" RENAME TO "Todo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
