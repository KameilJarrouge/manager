-- CreateTable
CREATE TABLE "Day" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "weight" DECIMAL NOT NULL,
    "neck" DECIMAL NOT NULL,
    "waist" DECIMAL NOT NULL,
    "hip" DECIMAL
);

-- CreateTable
CREATE TABLE "Intake" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "foodItemId" INTEGER,
    "dayId" INTEGER,
    "factor" DECIMAL NOT NULL,
    CONSTRAINT "Intake_foodItemId_fkey" FOREIGN KEY ("foodItemId") REFERENCES "FoodItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Intake_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Day" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Burn" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "activityId" INTEGER,
    "dayId" INTEGER,
    "factor" DECIMAL NOT NULL,
    CONSTRAINT "Burn_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Burn_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Day" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Day_date_key" ON "Day"("date");
