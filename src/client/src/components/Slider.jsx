import React, { useState } from 'react'

function RangeSlider({ value }) {
	// const [range, setRange] = useState(value)

	// const handleChange = (e) => {
	// 	setRange(e.target.value)
	// }

	return (
		<div className="p-5">
			<input type="range" min="0" max="100" value={value} className="range"  />
			<p>Value: {value}</p>
		</div>
	)
}

export default RangeSlider
