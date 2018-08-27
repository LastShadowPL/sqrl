import { User } from '../dtos/user.dto'
import { PostsState } from '../reducers/post.reducer'
import { LooseObject } from '../types';

export interface P {
	authors: User[]
	posts: PostsState
	isOpen: boolean
	getPosts: (apiURL: string, conditions: string) => any
	getAuthors: (apiURL: string, conditions: string) => any
	openPost: (_id: string) => any
	filter?: LooseObject
}
