import { setupWorker } from 'msw'
import { ContactHandlers } from './contact'

export const worker = setupWorker(...ContactHandlers)
