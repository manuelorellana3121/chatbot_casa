/*
  Warnings:

  - You are about to drop the column `answer` on the `instructions` table. All the data in the column will be lost.
  - You are about to drop the column `ask` on the `instructions` table. All the data in the column will be lost.
  - Added the required column `instruction` to the `instructions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `instructions` DROP COLUMN `answer`,
    DROP COLUMN `ask`,
    ADD COLUMN `instruction` VARCHAR(191) NOT NULL;
