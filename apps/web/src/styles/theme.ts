import { createTheme } from '@mantine/core'

import { colors } from './colors'
import { sansSerifFont } from './fonts'

export const theme = createTheme({
	primaryColor: 'lavender',
	colors,
	fontFamily: sansSerifFont.style.fontFamily,
	headings: {
		fontFamily: sansSerifFont.style.fontFamily
	}
})
