import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { SendMailOptions, Transporter, createTransport } from 'nodemailer'
import { dim } from 'colorette'

@Injectable()
export class MailerService {
	private readonly logger: Logger = new Logger(MailerService.name)

	constructor(private readonly config: ConfigService) {}

	private async options(options: SendMailOptions, email: string): Promise<void> {
		const transport: Transporter = createTransport({
			service: this.config.getOrThrow<string>('NODEMAILER_SERVICE'),
			auth: {
				user: this.config.getOrThrow<string>('NODEMAILER_USER'),
				pass: this.config.getOrThrow<string>('NODEMAILER_PASS')
			}
		})
		await transport.sendMail(options)
		this.logger.log(dim(`Sent an email. User: ${email}`))
	}

	public async userCreated(email: string): Promise<void> {
		await this.options(
			{
				from: 'NikCode test-task',
				to: email,
				subject: 'Welcomme to payments app!',
				html: `<h2>Thank you for using payments app! Support: antondeuliaa@gmail.com</h2>`
			},
			email
		)
	}
}
