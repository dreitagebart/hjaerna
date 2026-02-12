import slugify from '@sindresorhus/slugify'
import axios from 'axios'
import * as cheerio from 'cheerio'
import { YoutubeTranscript } from 'youtube-transcript'
import { chroma } from './chroma'
import { config } from './config'
import { getEmbeddingContent } from './gemini'

export const extractUrl = (text: string) => {
	const match = text.match(/(https?:\/\/[^\s>]+)/g)

	return match ? match[0] : null
}

export const fetchContext = async (url: string): Promise<string> => {
	if (url.includes('youtube.com') || url.includes('youtu.be')) {
		try {
			const transcript = await YoutubeTranscript.fetchTranscript(url)
			const text = transcript.map((t) => t.text).join(' ')
			// Begrenzen, da Tokens sonst explodieren können (Gemini Pro hat aber viel Platz)
			return `YOUTUBE TRANSCRIPT: ${text.substring(0, 20000)}`
		} catch (e) {
			return 'Youtube Transcript konnte nicht geladen werden. Bitte basiere die Analyse nur auf Titel/URL.'
		}
	} else {
		try {
			const { data } = await axios.get(url)
			const $ = cheerio.load(data)
			// Entferne Scripts, Styles etc.
			$('script').remove()
			$('style').remove()
			const text = $('body')
				.text()
				.replace(/\s+/g, ' ')
				.trim()
				.substring(0, 15000)
			return `WEBSITE CONTENT: ${text}`
		} catch (e) {
			return 'Webseite konnte nicht gelesen werden.'
		}
	}
}

export const saveToVectorDb = async (
	filename: string,
	content: string,
	metadata: any
) => {
	try {
		// 1. Erzeuge Embedding (Vektor) mit Gemini
		const response = await getEmbeddingContent(content)

		// 2. Collection holen/erstellen
		const collection = await chroma.getOrCreateCollection({
			name: config.chroma.collectionName
		})

		const embeddings = response.embeddings

		console.log('These are the embeddings:')
		console.log(JSON.stringify(embeddings, null, 2))

		if (!embeddings) {
			console.error('Kein Embedding erhalten')
			return
		}

		// 3. Speichern
		await collection.upsert({
			ids: [filename],
			embeddings: [embeddings as Array<number>],
			metadatas: [metadata],
			documents: [content.substring(0, 500)] // Nur Snippet speichern für Preview
		})
		console.log(`Vektor gespeichert für ${filename}`)
	} catch (error) {
		console.error('Vector DB Error:', error)
	}
}

export const sanitizeFilename = (name: string) => {
	return name

	// return slugify(name)
}
