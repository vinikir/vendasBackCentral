export interface CardPaymentRequest {
    transaction_amount: number;
    token?: string;
    description: string;
    installments: number;
    payment_method_id: 'credit_card' | 'debit_card';
    payer: {
        email: string;
        identification?: {
            type: string;
            number: string;
        };
    };
}
  
export interface PaymentResponse {
    id: string;
    status: 'approved' | 'rejected' | 'pending';
    detail: string;
}