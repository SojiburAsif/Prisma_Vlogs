/*
  Warnings:

  - The `tags` column on the `posts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `postId` on table `comments` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_postId_fkey";

-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "status" SET DEFAULT 'APPROVED',
ALTER COLUMN "postId" SET NOT NULL;

-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "isFeatured" SET DEFAULT false,
DROP COLUMN "tags",
ADD COLUMN     "tags" TEXT[];

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "phone" TEXT,
ADD COLUMN     "role" TEXT DEFAULT 'USER',
ADD COLUMN     "status" TEXT DEFAULT 'ACTIVE';

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
