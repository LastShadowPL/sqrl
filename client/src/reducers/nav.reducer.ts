import { 
  NAV_SECTION_OPEN, 
  NAV_SECTION_CLOSE,
  NAV_SECTION_SWITCH 
} from "../actions/nav.action"
import { Action } from "redux"

interface NavItem {
	name: string
	href: string
} 

export interface NavButton {
  modal: string
  name: string
  icon: string
}

export interface NavLink {
  icon: string
  href: string
}

export interface Section {
	icon: string
	items: NavItem[]
	open: boolean
}



export interface NavState {
	sections: {
		[name: string]: Section
  },
  links: NavLink[]
  modals: NavButton[]
}

export const InitialNavState: NavState = {
  sections: {
    Menu: {
      icon: "/svg/menu.svg",
      items: [
        {name: "home", href: "/"}
      ],
      open: false
    }
  },
  links: [
    { href: "/followers", icon: "/svg/people.svg" },
    { href: "/me", icon: "/svg/person.svg" }
  ],
  modals: [
    { 
      name: "search", 
      icon: "/svg/search.svg", 
      modal: ""
    },
    { 
      name: "add", 
      icon: "/svg/add.svg",
      modal: "AddPost"
    }
  ]
}

interface NavAction extends Action {
  section: string
  modal: string
}
export function navReducer(nav: NavState = InitialNavState, action: NavAction) {
	switch (action.type) {
		case NAV_SECTION_OPEN: {
			const sc = Object.assign({}, nav.sections)
			for (const sName in sc) {
				sc[sName].open = !!(sName === action.section)
			}
			return {
        ...nav,
				sections: sc
			}
		}

		case NAV_SECTION_CLOSE: {
			const sc = Object.assign({}, nav.sections)
			sc[action.section].open = false
			return {
        ...nav,
				sections: sc
			}
    }
    
    case NAV_SECTION_SWITCH: {
      const sc = Object.assign({}, nav.sections)
			sc[action.section].open = !sc[action.section].open
			return {
        ...nav,
				sections: sc
			}
    }

		default: return nav
  }
}
