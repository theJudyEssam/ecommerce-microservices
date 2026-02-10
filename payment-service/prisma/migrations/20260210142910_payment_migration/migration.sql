-- CreateTable
CREATE TABLE "PaymentOrder" (
    "paymentId" TEXT NOT NULL,
    "buyerAccount" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "paymentOrderStatus" BOOLEAN NOT NULL DEFAULT false,
    "ledgerUpdated" BOOLEAN NOT NULL DEFAULT false,
    "walletUpdated" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PaymentOrder_pkey" PRIMARY KEY ("paymentId")
);

-- CreateTable
CREATE TABLE "PaymentEvent" (
    "transactionId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "creditCardInformation" TEXT NOT NULL,
    "isPaymentDone" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PaymentEvent_pkey" PRIMARY KEY ("transactionId")
);

-- AddForeignKey
ALTER TABLE "PaymentOrder" ADD CONSTRAINT "PaymentOrder_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "PaymentEvent"("transactionId") ON DELETE RESTRICT ON UPDATE CASCADE;
