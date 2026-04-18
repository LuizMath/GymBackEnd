/*
  Warnings:

  - You are about to drop the column `qualiication` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `qualification` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Team` DROP COLUMN `qualiication`,
    ADD COLUMN `qualification` VARCHAR(50) NOT NULL;

-- DropTable
DROP TABLE `Users`;
