import { Test, TestingModule } from '@nestjs/testing'
import { MailerController } from './mailer.controller'
import { MailerService } from '../services/mailer.service'

describe('MailerController', (): void => {
	let mailerService: MailerController

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [MailerController],
			providers: [
				{
					provide: MailerService,
					useValue: {
						userCreated: jest.fn()
					}
				}
			]
		}).compile()

		mailerService = module.get<MailerController>(MailerController)
	})

	it('should be defined', (): void => {
		expect(mailerService).toBeDefined()
	})
})
