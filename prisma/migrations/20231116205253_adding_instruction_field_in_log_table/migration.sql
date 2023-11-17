/*
  Warnings:

  - Added the required column `instruction` to the `logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `logs` ADD COLUMN `instruction` VARCHAR(191) NOT NULL;
