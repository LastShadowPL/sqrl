import React from 'react'
import { State } from '../store'
import { UserState } from '../reducers/user.reducer'
import { RouteComponentProps } from 'react-router-dom'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Posts } from '../components/PostsSection'
import { Modal } from '../reducers/modal.reducer'
import { getUserProfile } from '../actions/user.actions'
import { User } from '../dtos/user.dto';

interface Props extends RouteComponentProps<{ username: string }> {
	me: User
	modals: Modal[]
	user: User
	getUser: (username: string) => any
}

class connectedUser extends React.Component<Props> {
	constructor(props: any) {
		super(props)
	}

	componentDidMount() {
		this.props.getUser(this.props.match.params.username)
	}

	render() {
		return this.props.user&&(
			<div className="profile">
				<header className="profile__header"
					// @ts-ignore
					style={{"--profile-background-url": `url(${this.props.user.BackgroundImageURL})`}}
				>
					<div className="profile__header__info">
						<img src={this.props.user.ProfileImageURL} alt="" className="profile__header__info__img"/>
						<p className="profile__header__info__name">{ this.props.user.Name }</p>
					</div>
				</header>
				<section className="profile__posts">
					<Posts filter={{}} />
				</section>
				{(() =>
					this.props.modals
						.filter(m => m.open && m.component)
						.map((modal, i) => <modal.component key={i} />))()}
			</div>
		)
	}
}

const mapStateToProps = (state: State) => ({
	me: state.user.me,
	modals: state.modal,
	user: state.user.profiled
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
	getUser: (username: string) =>
		getUserProfile(username)(dispatch),
})
// @ts-ignore
export default connect(mapStateToProps,mapDispatchToProps)(connectedUser)
