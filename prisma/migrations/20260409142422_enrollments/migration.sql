-- CreateTable
CREATE TABLE `Enrollments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `full_name` VARCHAR(50) NOT NULL,
    `cpf` VARCHAR(14) NOT NULL,
    `planId` INTEGER NOT NULL,
    `preferred_time` DATETIME(3) NOT NULL,
    `zip_code` VARCHAR(9) NOT NULL,
    `street` VARCHAR(255) NOT NULL,
    `number` VARCHAR(10) NOT NULL,
    `terms_accepted` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Enrollments` ADD CONSTRAINT `Enrollments_planId_fkey` FOREIGN KEY (`planId`) REFERENCES `Plans`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
