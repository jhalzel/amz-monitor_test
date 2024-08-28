import React from 'react'
import ThemeController from './ThemeController'
import SideBar from './SideBar'

function NavBar({ name }) {
	return (
		<div className="navbar bg-neutral text-neutral-content justify-between items-center w-full sm:px-4  max-w-[100vw]">
			<SideBar className="flex-none" />
			<button className="btn btn-ghost xs:text-md sm:text-xl md:text-2xl">
				{name}
			</button>
			<ThemeController className="flex-none" />
		</div>
	)
}

export default NavBar
