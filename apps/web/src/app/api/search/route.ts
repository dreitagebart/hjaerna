import { GoogleGenAI } from '@google/genai'
import { ChromaClient } from 'chromadb'
import { NextResponse } from 'next/server'

// Initialisierung (ähnlich wie im Bot)
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
const chroma = new ChromaClient({ path: 'http://localhost:8000' }) // Interner Docker Name

export async function POST(req: Request) {
	const { query } = await req.json()

	// 1. User Suchanfrage ("Wie koche ich Pasta?") in Vektor umwandeln
	const response = await ai.models.embedContent({
		model: 'text-embedding-004',
		contents: [String(query)]
	})

	const embeddings = response.embeddings

	if (!embeddings) {
		console.error('Kein Embedding erhalten')
		return
	}

	// 2. Vektor-DB fragen: "Was ist mathematisch nah an diesem Vektor?"
	const collection = await chroma.getCollection({ name: 'hjaerna' })
	const results = await collection.query({
		queryEmbeddings: [embeddings as Array<number>],
		nResults: 5 // Top 5 Ergebnisse
	})

	// 3. Ergebnisse zurückgeben
	return NextResponse.json({ results })
}
