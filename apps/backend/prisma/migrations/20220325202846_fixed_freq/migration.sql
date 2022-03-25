/*
  Warnings:

  - You are about to alter the column `frequency` on the `Habit` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Habit` MODIFY `frequency` INTEGER NOT NULL;
