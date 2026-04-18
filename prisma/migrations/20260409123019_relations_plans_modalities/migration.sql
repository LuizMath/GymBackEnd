-- CreateTable
CREATE TABLE `PlansOnModalities` (
    `planId` INTEGER NOT NULL,
    `modalitieId` INTEGER NOT NULL,

    PRIMARY KEY (`planId`, `modalitieId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PlansOnModalities` ADD CONSTRAINT `PlansOnModalities_planId_fkey` FOREIGN KEY (`planId`) REFERENCES `Plans`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlansOnModalities` ADD CONSTRAINT `PlansOnModalities_modalitieId_fkey` FOREIGN KEY (`modalitieId`) REFERENCES `Modalities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
