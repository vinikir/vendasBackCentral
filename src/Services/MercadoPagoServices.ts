import mercadopago, { Payment, MercadoPagoConfig } from 'mercadopago';
import { CardPaymentRequest, PaymentResponse } from '../interfaces/MercadoPagoInterface';
import dotenv from "dotenv"

dotenv.config()
const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_ACCESS_TOKEN as string })
const payments = new Payment(client);

export const processPixQR = async (valor) => {
	try {

		const body = {
			transaction_amount:valor,
			description:"Teste pix",
			payment_method_id: "pix",
			payer:{
				email:"vinikir@gmail.com"
			}
		}

		return await payments.create({ body})
		
	} catch (error) {
		throw new Error(`processPixQR: ${error.message}`);
	}
}

export const processStatus = async (id) => {
	try {

		

		return await payments.get({ id})
		
	} catch (error) {
		throw new Error(`processStatus: ${error.message}`);
	}
}

export  const processCardPayment = async (paymentData: CardPaymentRequest) => {


	try {


	} catch (error: any) {
		throw new Error(`MP-API: ${error.message}`);
	}
}


