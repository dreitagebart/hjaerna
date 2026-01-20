import { GoogleGenAI } from '@google/genai'
import { config } from './config'

const ai = new GoogleGenAI({ apiKey: config.gemini.apiKey })

export const processWithGemini = async (
	userText: string,
	contextData: string
): Promise<any> => {
	const prompt = `
    Du bist mein Second Brain Librarian.

    USER INPUT: "${userText}"

    ZUSATZ-KONTEXT (aus URL):
    "${contextData.substring(0, 5000)}" ... (gekürzt)

    AUFGABE:
    1. Analysiere den Input. Ist es eine Aufgabe, eine Notiz oder eine Ressource (Video/Artikel)?
    2. Wenn es ein YouTube Video ist: Erstelle eine Zusammenfassung basierend auf dem Kontext. Extrahiere die wichtigsten 3 Learnings.
    3. Wenn wichtige Metadaten fehlen (z.B. Deadline bei Tasks), frage nach (Status: MISSING_INFO).

    ANTWORTE NUR ALS JSON:
    {
      "status": "SUCCESS" | "MISSING_INFO",
      "type": "task" | "note" | "resource",
      "title": "Kurzer prägnanter Titel",
      "content": "Der volle Markdown Inhalt. Nutze Headings, Bulletpoints.",
      "tags": ["tag1", "youtube", "coding"],
      "message": "Nur falls status MISSING_INFO: Deine Frage an mich."
    }
  `

	const response = await ai.models.generateContent({
		model: 'gemini-2.5-flash',
		contents: prompt
	})

	const text = response.text || ''

	// JSON Cleanup hack
	return JSON.parse(
		text
			.replace(/```json/g, '')
			.replace(/```/g, '')
			.trim()
	)
}

export const getEmbeddingContent = async (content: string) => {
	const response = await ai.models.embedContent({
		model: 'text-embedding-004',
		contents: content
	})

	return response
}
