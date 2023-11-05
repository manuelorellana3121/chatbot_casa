/*
  Warnings:

  - You are about to drop the `actions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `actions` DROP FOREIGN KEY `actions_instructionId_fkey`;

-- DropTable
DROP TABLE `actions`;
