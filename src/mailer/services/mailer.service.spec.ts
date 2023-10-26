import { Test, TestingModule } from '@nestjs/testing'
import { MailerService } from './mailer.service'

describe('MailerService', (): void => {
	let mailerService: MailerService

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [MailerService]
		}).compile()

		mailerService = module.get<MailerService>(MailerService)
	})

	it('should be defined', (): void => {
		expect(mailerService).toBeDefined()
	})
})
