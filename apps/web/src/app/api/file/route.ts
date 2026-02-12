import { promises as fs } from 'node:fs'
import { dirname, join } from 'node:path'
import { NextResponse } from 'next/server'

const basePath = join(process.cwd(), 'public/data')

/**
 * GET: Inhalt einer Datei lesen
 */
export const GET = async (req: Request) => {
	const { searchParams } = new URL(req.url)
	const filePath = searchParams.get('path')

	if (!filePath)
		return NextResponse.json({ error: 'Pfad fehlt' }, { status: 400 })

	try {
		const fullPath = join(basePath, filePath)
		const content = await fs.readFile(fullPath, 'utf-8')
		return NextResponse.json({ content })
	} catch (error) {
		return NextResponse.json({ error: 'Datei nicht gefunden' }, { status: 404 })
	}
}

/**
 * PATCH: Datei verschieben oder umbenennen
 */
export const PATCH = async (req: Request) => {
	try {
		const { oldPath, newPath } = await req.json()

		const fullOldPath = join(basePath, oldPath)
		const fullNewPath = join(basePath, newPath)

		// Zielverzeichnis sicherstellen
		await fs.mkdir(dirname(fullNewPath), { recursive: true })

		await fs.rename(fullOldPath, fullNewPath)

		return NextResponse.json({ message: 'Datei erfolgreich verschoben' })
	} catch (error) {
		return NextResponse.json(
			{ error: 'Fehler beim Verschieben' },
			{ status: 500 }
		)
	}
}

/**
 * POST: Inhalt einer Datei aktualisieren (Editieren)
 */
export const POST = async (req: Request) => {
	try {
		const { filePath, content } = await req.json()
		const fullPath = join(basePath, filePath)

		await fs.writeFile(fullPath, content, 'utf-8')

		return NextResponse.json({ message: 'Datei erfolgreich gespeichert' })
	} catch (error) {
		return NextResponse.json(
			{ error: 'Fehler beim Speichern' },
			{ status: 500 }
		)
	}
}
