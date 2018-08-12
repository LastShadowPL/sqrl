import { combineReducers, Action } from "redux"
import {
	POSTS_ARE_LOADING,
	POSTS_ERRORED,
	POSTS_LOADED,
	POST_OPEN
} from "../actions/post.actions"
import { Post, Comment } from "../dtos/post.dto";

interface IOpenPost {
	post: Post
	comments: Comment[]
}

export interface PostsState {
	error: Error | null
	loading: boolean
	list: Post[],
	currentPost: IOpenPost | null
}

export const InitialPostsState: PostsState = {
	error: null,
	loading: false,
	list: [],
	currentPost: null
}

interface ErrorAction extends Action {
	error: Error
}
function errorReducer(error = null, action: ErrorAction) {
	switch(action.type) {
		case POSTS_ERRORED: return action.error
		default: return error
	}
}

interface LoadingAction extends Action {
	areLoading: boolean
}
function loadingReducer(areLoading: boolean = false, action: LoadingAction) {
	switch(action.type) {
		case POSTS_ARE_LOADING: return action.areLoading
		default: return areLoading
	}
}

interface PostsAction extends Action {
	posts: Post[]
}
function _postsReducer(posts: Post[] = [], action: PostsAction) {
	switch (action.type) {
		case POSTS_LOADED: return [
			...posts, ...action.posts.filter(post => 
				!posts.some(statePost => post._id === statePost._id)
			)
		]

		default: return posts
	}
}

interface CurrentPostAction extends Action {
	_id: string
}
function currentPostReducer(lastPost: IOpenPost, action: CurrentPostAction) {
	switch(action.type) {
		// Load comments
		case POST_OPEN: {
			// Get post
			
			// Load comments
			// return post
		}

		default: return lastPost
	}
}

// @ts-ignore
export const postsReducer = combineReducers<PostsState>({
	error: errorReducer,
	loading: loadingReducer,
	list: _postsReducer,
	currentPost: currentPostReducer
})