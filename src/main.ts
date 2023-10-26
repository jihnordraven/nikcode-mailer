import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import dotenv from 'dotenv'
import { INestMicroservice, InternalServerErrorException, Logger } from '@nestjs/common'
import { blue, red } from 'colorette'

dotenv.config()

const RMQ_HOST: string = process.env.RMQ_HOST
const RMQ_QUEUE: string = process.env.RMQ_QUEUE

const logger: Logger = new Logger('bootstrap')

const bootstrap = async (): Promise<void> => {
	const app: INestMicroservice =
		await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
			transport: Transport.RMQ,
			options: {
				urls: [RMQ_HOST],
				queue: RMQ_QUEUE,
				queueOptions: {
					durable: true
				}
			}
		})

	try {
		await app.listen()
		logger.log(blue('Microservice is listening'))
	} catch (err: unknown) {
		logger.error(red(`Something went wrong... Learn more at: ${err}`))
		throw new InternalServerErrorException(err)
	}
}

bootstrap()
