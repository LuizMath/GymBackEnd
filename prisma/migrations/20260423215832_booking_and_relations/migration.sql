/*
  Warnings:

  - Added the required column `max_capacity` to the `Schedules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Schedules` ADD COLUMN `max_capacity` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Booking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `booking_date` DATE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `enrollmentId` INTEGER NOT NULL,
    `scheduleId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_enrollmentId_fkey` FOREIGN KEY (`enrollmentId`) REFERENCES `Enrollments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_scheduleId_fkey` FOREIGN KEY (`scheduleId`) REFERENCES `Schedules`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
