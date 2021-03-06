import React, { FormEvent, FormEventHandler } from "react"
import { Redirect, Link } from "react-router-dom"
import { State } from "../store"
import { Dispatch } from "redux"
import { connect } from "react-redux"
import { registerUser, setError } from "../actions/user.actions"
import { UserState } from "../reducers/user.reducer"
import { FormPart } from "../components/FormPart"
import FormError from "../components/FormError";

interface Props {
	user: UserState
	register: (Username: string, Password: string, Email: string, Name: string) => any
	setError: (error: Error | null) => any
}
const connectedRegister = ({ user, register, setError }: Props) => {
	const handleReg: FormEventHandler = (e: FormEvent) => {
		e.preventDefault()
		const Username  = (e.currentTarget.querySelector("#username")         as any).value
		const Password  = (e.currentTarget.querySelector("#password")         as any).value
		const cPassword = (e.currentTarget.querySelector("#confirm-password") as any).value
		const Email     = (e.currentTarget.querySelector("#email")            as any).value
		const Name      = (e.currentTarget.querySelector("#full-name")        as any).value

		if (!Username || !Password || !Email || !Name) {
			return setError(new Error("You didn't fill all the fields"))
		}

		if(Password !== cPassword) {
			return setError(new Error("Passwords don't match"))
		}

		register(Username, Password, Email, Name)
	}

	const clearError = () => {
		setError(null)
	}

	if (user.me) return <Redirect to="/" exact />
	return (
		<div className="bg">
			<main className="sign sign--reg">
				<FormError />
				<h1 className="sign__title">Register</h1>
				<form action="" className="sign__form" onSubmit={ handleReg }>
					<FormPart label="username" type="text" name="username" id="username"/>
					<FormPart label="password" type="password" name="password" id="password"/>
					<FormPart label="confirm password" type="password" name="confirm-password" id="confirm-password"/>
					<FormPart label="e-mail" type="email" name="email" id="email"/>
					<FormPart label="full name" type="text" name="full-name" id="full-name"/>

					<input className="sign__form__submit" type="submit" value="Register" />
				</form>
				<p className="sign__txt">
					Already have an account?{" "}
					<Link onClick={ clearError } to="/login" className="sign__txt__link">
						{" "}
						Login!
					</Link>
				</p>
			</main>
		</div>
	)
}

const mState = (state: State) => ({
	user: state.user
})

const mDispatch = (dispatch: Dispatch) => ({
	register: (Username: string, Password: string, Email: string, Name: string) =>
		Username &&
		Password &&
		Email &&
		Name &&
		registerUser(`${location.origin}/graphql`, Username, Password, Email, Name)(dispatch),
	setError: (error: Error | null) => setError(error)(dispatch)
})

export default connect(
	mState,
	mDispatch
)(connectedRegister)
