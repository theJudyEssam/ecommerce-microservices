/*
  Warnings:

  - The primary key for the `PaymentEvent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `creditCardInformation` on the `PaymentEvent` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `PaymentEvent` table. All the data in the column will be lost.
  - You are about to drop the column `isPaymentDone` on the `PaymentEvent` table. All the data in the column will be lost.
  - You are about to drop the column `sellerId` on the `PaymentEvent` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `PaymentEvent` table. All the data in the column will be lost.
  - The primary key for the `PaymentOrder` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `buyerAccount` on the `PaymentOrder` table. All the data in the column will be lost.
  - You are about to drop the column `ledgerUpdated` on the `PaymentOrder` table. All the data in the column will be lost.
  - You are about to drop the column `paymentId` on the `PaymentOrder` table. All the data in the column will be lost.
  - You are about to drop the column `paymentOrderStatus` on the `PaymentOrder` table. All the data in the column will be lost.
  - You are about to drop the column `walletUpdated` on the `PaymentOrder` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `PaymentEvent` table without a default value. This is not possible if the table is not empty.
  - The required column `eventId` was added to the `PaymentEvent` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `eventType` to the `PaymentEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentOrderId` to the `PaymentEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripeEventId` to the `PaymentEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buyerId` to the `PaymentOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `PaymentOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellerId` to the `PaymentOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `PaymentOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripePaymentIntentId` to the `PaymentOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `PaymentOrder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PaymentOrder" DROP CONSTRAINT "PaymentOrder_transactionId_fkey";

-- AlterTable
ALTER TABLE "PaymentEvent" DROP CONSTRAINT "PaymentEvent_pkey",
DROP COLUMN "creditCardInformation",
DROP COLUMN "customerId",
DROP COLUMN "isPaymentDone",
DROP COLUMN "sellerId",
DROP COLUMN "transactionId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "eventId" TEXT NOT NULL,
ADD COLUMN     "eventType" TEXT NOT NULL,
ADD COLUMN     "paymentOrderId" TEXT NOT NULL,
ADD COLUMN     "stripeEventId" TEXT NOT NULL,
ADD CONSTRAINT "PaymentEvent_pkey" PRIMARY KEY ("eventId");

-- AlterTable
ALTER TABLE "PaymentOrder" DROP CONSTRAINT "PaymentOrder_pkey",
DROP COLUMN "buyerAccount",
DROP COLUMN "ledgerUpdated",
DROP COLUMN "paymentId",
DROP COLUMN "paymentOrderStatus",
DROP COLUMN "walletUpdated",
ADD COLUMN     "buyerId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "orderId" TEXT NOT NULL,
ADD COLUMN     "sellerId" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "stripePaymentIntentId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "PaymentOrder_pkey" PRIMARY KEY ("transactionId");

-- AddForeignKey
ALTER TABLE "PaymentEvent" ADD CONSTRAINT "PaymentEvent_paymentOrderId_fkey" FOREIGN KEY ("paymentOrderId") REFERENCES "PaymentOrder"("transactionId") ON DELETE RESTRICT ON UPDATE CASCADE;
