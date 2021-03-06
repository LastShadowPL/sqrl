import {
	IsString,
	IsUrl,
	IsMongoId,
	IsEmail,
	IsInstance
} from "class-validator"
import mongoose from 'mongoose'
import { Post } from "./post.dto";

// export class Name {
// 	@IsString() readonly First: string
// 	@IsString() readonly Last: string
// 
// 	constructor(First: string, Last: string) {
// 		this.First = First
// 		this.Last = Last
// 	}
// }

export class User {
	@IsMongoId() readonly _id: mongoose.Schema.Types.ObjectId
	@IsString() readonly Name: string
	@IsString() readonly Username: string
	@IsString() readonly Password: string
	@IsEmail() readonly Email: string
	@IsUrl() readonly ProfileImageURL: string
	@IsUrl() readonly BackgroundImageURL: string
	@IsInstance(User, {each: true}) readonly Followers: mongoose.Schema.Types.ObjectId[]
	@IsInstance(Post, {each: true}) readonly LikedPosts: Post[]

	constructor(
		_id: mongoose.Schema.Types.ObjectId,
		Name: string,
		Username: string,
		Password: string,
		Email: string,
		ProfileImageURL: string,
		BackgroundImageURL: string,
		Followers: mongoose.Schema.Types.ObjectId[],
		LikedPosts: Post[]
	) {
		this._id = _id
		this.Name = Name
		this.Username = Username
		this.Password = Password 
		this.Email = Email
		this.ProfileImageURL = ProfileImageURL
		this.BackgroundImageURL = BackgroundImageURL
		this.Followers = Followers
		this.LikedPosts = LikedPosts
	}
}
