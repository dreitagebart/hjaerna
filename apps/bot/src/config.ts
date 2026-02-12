import { join } from 'node:path'
import dotenv from 'dotenv'

const isDev = process.env.NODE_ENV === 'development'

dotenv.config({
	path: join(process.cwd(), '../../.env'),
	debug: isDev
})

export const config = {
	dataDir: isDev ? join(process.cwd(), '../web/public/data') : '/app/data',
	slack: {
		// clientId: String(process.env.SLACK_CLIENT_ID),
		// clientSecret: String(process.env.SLACK_CLIENT_SECRET),
		// signingSecret: String(process.env.SLACK_SIGNING_SECRET),
		appToken: String(process.env.SLACK_APP_TOKEN),
		botToken: String(process.env.SLACK_BOT_TOKEN)
	},
	gemini: {
		apiKey: String(process.env.GEMINI_API_KEY)
	},
	chroma: {
		url: process.env.CHROMA_URL || 'http://localhost:8000',
		collectionName: 'hjaerna'
	}
}
