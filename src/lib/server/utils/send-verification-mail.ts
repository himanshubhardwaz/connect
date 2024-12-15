import sgMail from '$lib/server/sendgrid';
import { env } from '$env/dynamic/private';

type SendVerificationMailProps = {
	to: string;
	verificationUrl: string;
};

export default async function sendVerificationMail({
	to,
	verificationUrl
}: SendVerificationMailProps) {
	const msg = {
		to,
		from: env.SENDGRID_FROM_EMAIL_ID,
		subject: 'Connect email verification',
		text: 'Click the link below to verify your email address',
		html: `<a href=${verificationUrl}>Verify Account</a>`
	};

	const response = await sgMail.send(msg);
	return response;
}
