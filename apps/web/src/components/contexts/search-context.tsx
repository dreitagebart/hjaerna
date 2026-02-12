import {
	createContext,
	type Dispatch,
	type SetStateAction,
	useContext
} from 'react'

type Thought = {
	title: string
	markdown: string
}

type SearchCtx = {
	search: string
	setSearch: Dispatch<SetStateAction<string>>
	thoughts: Array<Thought>
	setThoughts: Dispatch<SetStateAction<Array<Thought>>>
}

const SearchContext = createContext<SearchCtx>({
	search: '',
	setSearch: () => null,
	thoughts: [],
	setThoughts: () => null
})

export const SearchContextProvider = SearchContext.Provider

export const useSearch = () => {
	return useContext(SearchContext)
}
