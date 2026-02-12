import {
	colorsTuple,
	type DefaultMantineColor,
	type MantineColorsTuple
} from '@mantine/core'

type ExtendedCustomColors =
	| 'crust'
	| 'base'
	| 'mauve'
	| 'red'
	| 'green'
	| 'sky'
	| 'sapphire'
	| 'blue'
	| 'lavender'
	| 'text'
	| 'subtext1'
	| DefaultMantineColor

declare module '@mantine/core' {
	export interface MantineThemeColorsOverride {
		colors: Record<ExtendedCustomColors, MantineColorsTuple>
	}
}

export const colors = {
	crust: colorsTuple('#11111b'),
	base: colorsTuple('#1e1e2e'),
	mauve: colorsTuple('#cba6f7'),
	red: colorsTuple('#f38ba8'),
	green: colorsTuple('#a6e3a1'),
	sky: colorsTuple('#89dceb'),
	sapphire: colorsTuple('#74c7ec'),
	blue: colorsTuple('#89b4fa'),
	lavender: colorsTuple('#b4befe'),
	text: colorsTuple('#cdd6f4'),
	subtext1: colorsTuple('#cdd6f4')
}
