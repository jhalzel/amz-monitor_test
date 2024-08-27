import React from 'react'
import ThemeController from './ThemeController'
import SideBar from './SideBar'

function NavBar({ name }) {
	return (
		<div className="navbar bg-neutral text-neutral-content flex justify-between">
			<SideBar />
			<button className="btn btn-ghost text-xl">{name}</button>
			<ThemeController />
		</div>
	)
}

export default NavBar
