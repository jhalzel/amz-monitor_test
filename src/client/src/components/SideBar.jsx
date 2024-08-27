import React from 'react'

export default function SideBar() {
	return (
		<>
			<input id="my-drawer" type="checkbox" className="drawer-toggle" />
			{/* <div className="drawer-content"> */}
			{/* Page content here */}
			{/* <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
					Open drawer
				</label> */}
			<label
				htmlFor="my-drawer"
				className="btn btn-link group h-7 w-14 rounded-lg border-2">
				<div class="grid justify-items-center gap-1.5">
					<span class="h-1 w-8 rounded-full bg-neutral-content  transition group-hover:rotate-45 group-hover:translate-y-2.5"></span>

					<span class="h-1 w-8 rounded-full bg-neutral-content  group-hover:scale-x-0 transition"></span>

					<span class="h-1 w-8 rounded-full bg-neutral-content   group-hover:-rotate-45 group-hover:-translate-y-2.5"></span>
				</div>
			</label>
			{/* </div> */}
			<div className="drawer-side">
				<label
					htmlFor="my-drawer"
					aria-label="close sidebar"
					className="drawer-overlay"></label>
				<ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 mt-16">
					{/* Sidebar content here */}
					<li>
						<a>Sidebar Item 1</a>
					</li>
					<li>
						<a>Sidebar Item 2</a>
					</li>
				</ul>
			</div>
		</>
	)
}
