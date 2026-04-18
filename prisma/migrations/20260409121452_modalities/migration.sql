-- CreateTable
CREATE TABLE `Modalities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `description` TEXT NOT NULL,
    `objective` ENUM('EMAGRECIMENTO', 'HIPERTROFIA', 'RELAXAMENTO') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
