import mercadopago, { Payment, MercadoPagoConfig } from 'mercadopago';
import { CardPaymentRequest, PaymentResponse } from '../interfaces/MercadoPagoInterface';
import dotenv from "dotenv"

dotenv.config()
const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_ACCESS_TOKEN as string })
const payments = new Payment(client);

export const processPixQR = async (valor: number) => {
	try {

		const body = {
			transaction_amount: valor,
			description: "Teste pix",
			payment_method_id: "pix",
			payer: {
				email: "vinikir@gmail.com"
			}
		}

		return await payments.create({ body })

	} catch (e: unknown) {
		if (e instanceof Error) {
			throw new Error(e.message);
		}
		throw new Error("Erro inesperado");
	}
}

export const processStatus = async (id: string) => {
	try {



		return await payments.get({ id })

	} catch (e: unknown) {
		if (e instanceof Error) {
			throw new Error(e.message);
		}
		throw new Error("Erro inesperado");
	}
}

export const processCardPayment = async (paymentData: CardPaymentRequest) => {


	try {


	} catch (e: unknown) {
		if (e instanceof Error) {
			throw new Error(e.message);
		}
		throw new Error("Erro inesperado");
	}
}


