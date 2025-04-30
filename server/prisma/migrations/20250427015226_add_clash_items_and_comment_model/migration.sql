/*
  Warnings:

  - You are about to drop the column `comment_id` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `clash_id` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_comment_id_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "comment_id",
ADD COLUMN     "clash_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_clash_id_fkey" FOREIGN KEY ("clash_id") REFERENCES "Clash"("id") ON DELETE CASCADE ON UPDATE CASCADE;
