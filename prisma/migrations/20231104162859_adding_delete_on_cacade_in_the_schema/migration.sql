-- DropForeignKey
ALTER TABLE `actions` DROP FOREIGN KEY `actions_instructionId_fkey`;

-- DropForeignKey
ALTER TABLE `bots` DROP FOREIGN KEY `bots_profileId_fkey`;

-- DropForeignKey
ALTER TABLE `instructions` DROP FOREIGN KEY `instructions_botId_fkey`;

-- DropForeignKey
ALTER TABLE `profiles` DROP FOREIGN KEY `profiles_userId_fkey`;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bots` ADD CONSTRAINT `bots_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `instructions` ADD CONSTRAINT `instructions_botId_fkey` FOREIGN KEY (`botId`) REFERENCES `bots`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `actions` ADD CONSTRAINT `actions_instructionId_fkey` FOREIGN KEY (`instructionId`) REFERENCES `instructions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
