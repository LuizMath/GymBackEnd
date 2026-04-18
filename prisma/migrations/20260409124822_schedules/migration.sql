/*
  Warnings:

  - The primary key for the `PlansOnModalities` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `modalitieId` on the `PlansOnModalities` table. All the data in the column will be lost.
  - Added the required column `modalityId` to the `PlansOnModalities` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `PlansOnModalities` DROP FOREIGN KEY `PlansOnModalities_modalitieId_fkey`;

-- DropIndex
DROP INDEX `PlansOnModalities_modalitieId_fkey` ON `PlansOnModalities`;

-- AlterTable
ALTER TABLE `PlansOnModalities` DROP PRIMARY KEY,
    DROP COLUMN `modalitieId`,
    ADD COLUMN `modalityId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`planId`, `modalityId`);

-- CreateTable
CREATE TABLE `Schedules` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `modalityId` INTEGER NOT NULL,
    `day_of_week` ENUM('SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO') NOT NULL,
    `start_time` DATETIME(3) NOT NULL,
    `end_time` DATETIME(3) NOT NULL,
    `needs_booking` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PlansOnModalities` ADD CONSTRAINT `PlansOnModalities_modalityId_fkey` FOREIGN KEY (`modalityId`) REFERENCES `Modalities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedules` ADD CONSTRAINT `Schedules_modalityId_fkey` FOREIGN KEY (`modalityId`) REFERENCES `Modalities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
