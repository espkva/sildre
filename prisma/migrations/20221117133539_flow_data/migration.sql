/*
  Warnings:

  - You are about to drop the `WaterflowRead` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "WaterflowRead";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "SildreSensorData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "flowrate" REAL NOT NULL,
    "temperature" REAL NOT NULL,
    "UserId" INTEGER NOT NULL,
    CONSTRAINT "SildreSensorData_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
