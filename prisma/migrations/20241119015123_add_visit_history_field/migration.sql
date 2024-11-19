/*
  Warnings:

  - A unique constraint covering the columns `[shorturl]` on the table `Url` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Url" ADD COLUMN     "visitHistory" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "Url_shorturl_key" ON "Url"("shorturl");
