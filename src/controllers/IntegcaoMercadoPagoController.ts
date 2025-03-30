import { Request, Response } from 'express';
import { CardPaymentRequest } from '../interfaces/MercadoPagoInterface';
import { processCardPayment , processPixQR, processStatus } from '../Services/MercadoPagoServices';

class IntegcaoMercadoPagoController {

     

    public async Pagamento(req: Request, res: Response) {
        try {

            const paymentData: CardPaymentRequest = {

                transaction_amount: Number(12),
                description: 'Pagamento via App NFC',
                installments:  1,
                payment_method_id:  'credit_card',
                payer: {
                    email: "vinikir@gmail.com",
                    
                },

            };

            const result = await processCardPayment(paymentData);

            res.status(200).json(result);

        } catch (error: any) {

            res.status(500).json({
                error: error.message,
                success: false
            });

        }

    }

    public async ApagamentoStatus(req: Request, res: Response){
        try{
            const result = await processStatus(req.body.id)
            return res.status(200).json(result);

        }catch (error) {
            res.status(500).json({
                error: error.message,
                success: false
            });
        }
    }

    public async PixQrCode(req: Request, res: Response) {

        try {

            const result = await processPixQR(req.body.valor)
            return res.status(200).json(result);

        } catch (error) {
            res.status(500).json({
                error: error.message,
                success: false
            });
        }
    }
}

export default new IntegcaoMercadoPagoController()
