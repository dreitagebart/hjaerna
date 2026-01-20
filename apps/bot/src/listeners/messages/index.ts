import path from 'node:path'
import type { App } from '@slack/bolt'
import dayjs from 'dayjs'
import fsExtra from 'fs-extra'
import { config } from '../../config'
import { processWithGemini } from '../../gemini'
import {
	extractUrl,
	fetchContext,
	sanitizeFilename,
	saveToVectorDb
} from '../../helpers'

export const registerMessages = (app: App) => {
	app.message(async ({ message, say }) => {
		if ((message as any).subtype || !(message as any).text) return

		const userText = (message as any).text
		const url = extractUrl(userText)

		await say(`Thinking... 🧠 (Analysiere ${url ? 'Link' : 'Text'})`)

		// Zusätzlichen Kontext laden, falls URL vorhanden
		let contextData = ''
		if (url) {
			contextData = await fetchContext(url)
		}

		// KI Fragen
		const aiResponse = await processWithGemini(userText, contextData)

		if (aiResponse.status === 'MISSING_INFO') {
			// Rückfrage an User
			await say(aiResponse.message || 'Benötige mehr Infos.')
		} else if (aiResponse.status === 'SUCCESS') {
			// Datei schreiben
			const filename = `${dayjs().format('YYYY-MM-DD')}-${sanitizeFilename(aiResponse.title)}.md`
			const filepath = path.join(config.dataDir, filename)

			const fileContent = `---
created: ${dayjs().format('DD.MM.YYYY - HH:mm')}
type: ${aiResponse.type}
url: ${url || ''}
tags: [${aiResponse.tags?.join(', ')}]
---
# ${aiResponse.title}

${aiResponse.content}
`

			await fsExtra.ensureDir(config.dataDir)
			await fsExtra.writeFile(filepath, fileContent)

			// IN VEKTOR DB SCHIEBEN (Für Next.js Suche)
			await saveToVectorDb(filename, fileContent, {
				type: aiResponse.type,
				title: aiResponse.title,
				tags: aiResponse.tags?.join(',')
			})

			await say(`✅ Gespeichert: *${aiResponse.title}*`)
		}
	})
}
