/*
  Warnings:

  - A unique constraint covering the columns `[stripePaymentIntentId]` on the table `PaymentOrder` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PaymentOrder_stripePaymentIntentId_key" ON "PaymentOrder"("stripePaymentIntentId");
