import { setupWorker } from 'msw'
import { ContactHandlers } from './contact'

const worker = setupWorker(
	...ContactHandlers
)

worker.start()