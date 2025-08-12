-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` ENUM('student', 'teacher', 'admin') NOT NULL DEFAULT 'student';
