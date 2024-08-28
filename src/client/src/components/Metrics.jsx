import React from 'react'

export default function Metrics({ data }) {
	return (
		<div className="stats grid sm:grid-rows-4 md:grid-rows-2 lg:grid-rows-2 gap-2 shadow max-w-[100vw]">
			<div className="stat gap-1 text-center shadow max-w-100px">
				<div className="stat-title text-center">Total Sales</div>
				<div className="stat-value">{data.total_sales}</div>
				{/* <div className="stat-desc">21% more than last month</div> */}
			</div>

			<div className="stat gap-1 text-center shadow">
				<div className="stat-title text-center">Total Order Count</div>
				<div className="stat-value">{data.total_order_count}</div>
				{/* <div className="stat-desc">21% more than last month</div> */}
			</div>

			<div className="stat gap-1 text-center shadow">
				<div className="stat-title text-center">Merchant Fulfilled Sales</div>
				<div className="stat-value">{data.fbm_sales}</div>
				{/* <div className="stat-desc">21% more than last month</div> */}
			</div>

			<div className="stat gap-1 text-center shadow">
				<div className="stat-title text-center">Amazon Fulfilled Sales</div>
				<div className="stat-value">{data.fbm_sales}</div>
				{/* <div className="stat-desc">21% more than last month</div> */}
			</div>

			<div className="stat gap-1 text-center shadow">
				<div className="stat-title text-center">FBA Pending Sales</div>
				<div className="stat-value">{data.fba_pending_sales}</div>
				{/* <div className="stat-desc">21% more than last month</div> */}
			</div>

			<div className="stat gap-1 text-center shadow">
				<div className="stat-title text-center">FBM Pending Sales</div>
				<div className="stat-value">{data.fbm_pending_sales}</div>
				{/* <div className="stat-desc">21% more than last month</div> */}
			</div>

			<div className="stat gap-1 text-center shadow">
				<div className="stat-title text-center">Total Pending Sales</div>
				<div className="stat-value">{data.order_pending_count}</div>
				{/* <div className="stat-desc">21% more than last month</div> */}
			</div>

			<div className="stat gap-1 text-center shadow">
				<div className="stat-title text-center">Shipped Orders</div>
				<div className="stat-value">{data.shipped_order_count}</div>
				{/* <div className="stat-desc">21% more than last month</div> */}
			</div>

			{/*<div className="App-link">

					<div className="data-box">
						<h7>Shipped Order Count:</h7>
						<span className="App-link-values">{data.shipped_order_count}</span>
					</div> */}
		</div>
	)
}
