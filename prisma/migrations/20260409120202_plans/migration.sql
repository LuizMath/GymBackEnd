-- CreateTable
CREATE TABLE `Plans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `duration_months` INTEGER NOT NULL,
    `description` TEXT NOT NULL,
    `has_phys_eval` BOOLEAN NOT NULL,
    `has_nutritionist` BOOLEAN NOT NULL,
    `has_app_access` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
