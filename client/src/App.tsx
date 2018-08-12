import React from "react"
import Nav from "./components/Nav"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import Home from "./routes/Home";
import Login from "./routes/Login";
import { getCookies } from "./functions/getCookies"
import { State } from "./store";
import { Dispatch } from "redux";
import { loginWIthID } from "./actions/user.actions";
import { User } from "./dtos/user.dto";
import Register from "./routes/Register";

interface Props {
	loginWithID: (_id: string) => any
	user: User
}

class App extends React.PureComponent<Props> {
	constructor(props: Props) {
		super(props)
	}

	render() {
		const supportsHistory = 'pushState' in window.history
		const { UserID: _id } = getCookies()
		if(_id && !this.props.user) {
			this.props.loginWithID(_id)
		}

		return (
			<Router forceRefresh={!supportsHistory}>
				<div className="app">
					<Nav />
					<Switch>
						<Route path="/" exact component={Home}/>
						<Route path="/login" component={Login}/>
						<Route path="/register" component={Register}/>
						<Route path="*" render={() => <Redirect to="/"/>}/>
					</Switch>
				</div>
			</Router>
		)
	}
}

const mstp = (state: State) => ({
	user: state.user.me
})

const mdtp = (dispatch: Dispatch) => ({
	loginWithID: (_id: string) => dispatch(loginWIthID(`${location.origin}/graphql`, _id)),
})

export default connect(mstp, mdtp)(App)