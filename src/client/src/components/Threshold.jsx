import React from 'react'

export default function Threshold({ threshold }) {
	return (
		<div>
			{!threshold ? (
				<>
					<h7 className="Sales_threshold_title">
						FBM Sales Threshold: {threshold}{' '}
					</h7>
					<div className="Sales_threshold1">
						{/* Use the value prop to bind the input field to the state */}
						<input
							type="text"
							id="threshold"
							name="threshold"
							placeholder="FBM Sales Threshold"
							value={temp_threshold}
							onChange={handleThresholdChange}
							onKeyDown={handleKeyPress}
						/>
						<button onClick={handleClick}>Update</button>
					</div>
				</>
			) : (
				<div className="Sales_threshold2">
					<h7 className="Sales_threshold_title">
						FBM Sales Threshold: <span className="threshold">${threshold}</span>{' '}
					</h7>
					<button onClick={handleEdit}>Edit</button>
				</div>
			)}
		</div>
	)
}
