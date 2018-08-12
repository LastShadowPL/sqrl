import { Post, Comment } from "../dtos/post.dto"
import { Dispatch } from "redux"
import { sendQuery } from "../functions/sendQuery"

export const POSTS_ARE_LOADING = "POSTS_ARE_LOADING"
export const POSTS_ERRORED = "POSTS_ERRORED"
export const POSTS_LOADED = "POSTS_LOADED"

export const POST_IS_LOADING = "POST_LOADING"
export const POST_OPEN = "POST_OPEN"
export const POST_LOADED = "POST_LOADED"
export const POST_ERRORED = "POST_ERRORED"

export const postsAreLoading = (yayOrNay: boolean) => ({
  type: POSTS_ARE_LOADING,
  areLoading: yayOrNay
})

export const postsErrored = (error: Error | null) => ({
  type: POSTS_ERRORED,
  error
})

export const postsLoaded = (posts: Post[]) => ({
  type: POSTS_LOADED,
  posts
})

export const postOpen = (_id: string) => ({
  type: POST_OPEN,
  _id
})

export const postIsLoading = (yayOrNay: boolean) => ({
  type: POST_IS_LOADING,
  isLoading: yayOrNay
})

export const postLoaded = (post: Post) => ({
  type: POST_LOADED,
  post
})

export const postErrored = (error: Error | null) => ({
  type: POST_ERRORED,
  error
})
// Functions ---------------------------------------

/**
 * 
 * @param apiURL {string}
 * @param conditions {string}
 * @example getPosts("https://localhost:8000/graphql", `Likes: 2, Limit: 20`)
 */
export const getPosts = (apiURL: string, conditions: string) => 
  [apiURL, conditions].some(x => typeof x === "undefined") 
    // @ts-ignore because of "this" binding
    ? getPosts.bind(this, ...[apiURL, conditions, limit, skip]) 
    : (dispatch: Dispatch) => {

    dispatch(postsAreLoading(true))
    sendQuery(`
      {
        Posts(${conditions}) {
          _id
          Author
          Date
          Content
          Likes
          ImageURL
          Edited
        }
      }
    `, {}, apiURL)
				.then(res => res.json())
				.then(posts => dispatch(postsLoaded(posts.data.Posts)))
				.catch(err => dispatch(postsErrored(new Error(err))))
        .finally(() => dispatch(postsAreLoading(false)))
        
  }

export const openPost = (_id: string, posts: Post[] = []) => (dispatch: Dispatch) => {
  dispatch(postIsLoading(true))
  let post: Post | undefined
  // Check if is in the posts
  post = posts.find(cPost => String(cPost._id) === _id)
  if(post) {
    return dispatch(postLoaded(post))
  }

  // GET from the api
  sendQuery(`
    query {
      Post(_id: "${_id}") {
        _id
        Author
        Date
        Content
        Likes
        ImageURL
        Edited
      }
    }
  `)
    .then(r => r.json())
    .then(({data}: {data: { Post: Post | null}}) => {
      if(data.Post) { // Server found it
        return post = data.Post
      }

      throw new Error("Post not found")
      
    })
    /**Fetching Comments for the post */
    .then(post => { 
      let postWithComments = post
      sendQuery(`
        query {
          Comments(Post: "${String(post._id)}") {
            _id
            Author
            Date
            Content
            Post
          }
        }
      `)
      .then(r => r.json())
      .then(({data}: {data: { Comments: Comment[] | null }}) =>
        data.Comments || []
      )
      .then(comments => {
        postWithComments.Comments = comments
      })
      .catch((err: Error | string) => dispatch(postErrored(new Error("Failed fetching comments. " + err ))))
    })
    .catch(err => dispatch(postErrored(err)))
    .finally(() => dispatch(postIsLoading(false)))
}
