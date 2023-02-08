-- CreateTable
CREATE TABLE "ticket" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "result" VARCHAR(10485760) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("id")
);
