-- CreateTable
CREATE TABLE "ClashItem" (
    "id" TEXT NOT NULL,
    "clash_id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClashItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "comment_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClashItem" ADD CONSTRAINT "ClashItem_clash_id_fkey" FOREIGN KEY ("clash_id") REFERENCES "Clash"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Clash"("id") ON DELETE CASCADE ON UPDATE CASCADE;
