import { combineReducers, Action } from "redux"
import {
  USER_ERRORED,
  USER_LOADED,
  USER_UNLOADED,
  USER_PROFILED_LOADED
} from "../actions/user.actions"
import { User } from "../dtos/user.dto"

export interface UserState {
  me: null | User
  error: null | Error,
  profiled: null | User
}

export const InitialUserState: UserState = {
  me: null,
  error: null,
  profiled: null
}

interface ErrorAction extends Action {
	error: Error | null
}
function errorReducer(error: Error | null = null, action: ErrorAction) {
  switch(action.type) {
    case USER_ERRORED: return action.error
    default: return error
  }
}

interface UserAction extends Action {
  user: User | null
}
function _userReducer(user: User | null = null, action: UserAction) {
  switch(action.type) {
    case USER_LOADED: return action.user
    case USER_UNLOADED: return null
    default: return user
  }
}

function profiledReducer(user: User | null = null, action: UserAction) {
  switch(action.type) {
    case USER_PROFILED_LOADED: {
      return action.user
    }

    default: return user
  }
}

export const userReducer = combineReducers<UserState>({
  error: errorReducer,
  me: _userReducer,
  profiled: profiledReducer
})
