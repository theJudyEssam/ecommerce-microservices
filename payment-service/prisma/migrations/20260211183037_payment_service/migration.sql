-- AlterTable
ALTER TABLE "PaymentOrder" ALTER COLUMN "stripePaymentIntentId" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;
