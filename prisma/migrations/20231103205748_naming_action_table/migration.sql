/*
  Warnings:

  - You are about to drop the `action` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `action` DROP FOREIGN KEY `Action_instructionId_fkey`;

-- DropTable
DROP TABLE `action`;

-- CreateTable
CREATE TABLE `actions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `action` VARCHAR(191) NOT NULL,
    `instructionId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `actions_instructionId_key`(`instructionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `actions` ADD CONSTRAINT `actions_instructionId_fkey` FOREIGN KEY (`instructionId`) REFERENCES `instructions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
