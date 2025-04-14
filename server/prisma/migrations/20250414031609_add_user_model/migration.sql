/*
  Warnings:

  - You are about to drop the column `token_send_at` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "token_send_at",
ADD COLUMN     "reset_password_token_send_at" TIMESTAMP(3);
