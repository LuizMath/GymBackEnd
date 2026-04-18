-- CreateTable
CREATE TABLE `Experimental_Leads` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `contact` VARCHAR(50) NOT NULL,
    `modalityId` INTEGER NOT NULL,
    `status` ENUM('PENDENTE', 'CONTATADO', 'REALIZADO') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Experimental_Leads` ADD CONSTRAINT `Experimental_Leads_modalityId_fkey` FOREIGN KEY (`modalityId`) REFERENCES `Modalities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
