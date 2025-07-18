-- CreateTable
CREATE TABLE "PersonalInformation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "yearOfBirth" TEXT NOT NULL,
    "height" DECIMAL NOT NULL,
    "weight" DECIMAL NOT NULL,
    "neck" DECIMAL NOT NULL,
    "waist" DECIMAL NOT NULL,
    "sex" TEXT NOT NULL,
    "hip" DECIMAL
);
