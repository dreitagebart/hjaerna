import { createTheme } from '@mantine/core'

import { colors } from './colors'
import { sansSerifFont } from './fonts'

export const theme = createTheme({
	primaryColor: 'mauve',
	colors,
	fontFamily: sansSerifFont.style.fontFamily,
	headings: {
		fontFamily: sansSerifFont.style.fontFamily
	}
})
