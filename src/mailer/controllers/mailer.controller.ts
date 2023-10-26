import { Controller } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'
import { MailerService } from '../services/mailer.service'

@Controller('mailer')
export class MailerController {
	constructor(private readonly mailerService: MailerService) {}

	@EventPattern('user-created')
	public async userCreated(@Payload() email: string): Promise<void> {
		console.log(email)
		await this.mailerService.userCreated(email)
	}
}
