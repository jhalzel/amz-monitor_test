import { useEffect, useState } from 'react'

export default function Metrics({ data }) {
	const [selectedView, setSelectedView] = useState('default')
	const [filteredData, setFilteredData] = useState(0)

	const handleSelectChange = (e) => {
		setSelectedView(e.target.value)
	}

	const filter_dates = (e, data) => {
		// Get current date
		const today = new Date()

		// Get the last 7 days
		const last7Days = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate() - 7
		)
		// Get the last 30 days
		const last30Days = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate() - 30
		)
		// Get the last 90 days
		const last90Days = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate() - 90
		)

		// Create a variable to store the filtered data
		let filteredData = []

		// case and switch statement to filter data based on button clicked
		switch (e) {
			case 'Weekly View':
				console.log('Weekly View')
				filteredData = data.filter((item) => new Date(item.date) >= last7Days)
				break
			case 'Monthly View':
				console.log('Monthly View')
				filteredData = data.filter((item) => new Date(item.date) >= last30Days)
				break
			case '90 Day View':
				console.log('90 Day View')
				// Filter data to only show the last 90 days
				filteredData = data.filter((item) => new Date(item.date) >= last90Days)
				break
			default:
				console.log('default')
				// Filter data to only show the last 7 days
				filteredData = data.filter((item) => new Date(item.date) >= last30Days)
		}

		const summedData = {
			fba_pending_sales: 0,
			fbm_pending_sales: 0,
			fba_sales: 0,
			fbm_sales: 0,
			order_pending_count: 0,
			shipped_order_count: 0,
			total_order_count: 0,
		}

		filteredData.forEach((i) => {
			summedData['fba_pending_sales'] += Number.parseInt(
				i['fba_pending_sales'][0]
			)
			summedData['fba_sales'] += Number.parseInt(i['fba_sales'][0])
			summedData['fbm_sales'] += Number.parseInt(i['fbm_sales'][0])
			summedData['order_pending_count'] += Number.parseInt(
				i['order_pending_count'][0]
			)
			summedData['shipped_order_count'] += Number.parseInt(
				i['shipped_order_count'][0]
			)
			summedData['total_order_count'] += Number.parseInt(
				i['total_order_count'][0]
			)
			summedData['fbm_pending_sales'] += Number.parseInt(
				i['fbm_pending_sales'][0]
			)
		})

		console.log('summedData: ', summedData)
		setFilteredData(summedData)
		console.log('filtered data (App.js): ', summedData)
	}

	useEffect(() => {
		filter_dates(selectedView, data)
	}, [selectedView, data])

	return (
		<>
			<div className="flex justify-center py-2 shadow">
				<h3 className="flex self-center pr-4 font-semibold text-center px-4">
					Adjust Timeline:
				</h3>
				<select
					value={selectedView}
					className="bg-custom-bg rounded-lg px-2 py-1 cursor-pointer"
					onChange={handleSelectChange}>
					{/* <option value="">Choose Range</option> */}
					<option value="Weekly View">Weekly Sales</option>
					<option value="default">Monthly Sales</option>
					<option value="90 Day View">90 Day Sales</option>
				</select>
			</div>

			<div className="stats grid sm:grid-rows-4 md:grid-rows-2 lg:grid-rows-2 gap-2 shadow max-w-[100vw]">
				<div className="stat gap-1 text-center shadow max-w-100px">
					<div className="stat-title text-center">Total Sales</div>
					<div className="stat-value">
						{Number(filteredData['fba_sales']) +
							Number(filteredData['fbm_sales'])}
					</div>
					{/* <div className="stat-desc">21% more than last month</div> */}
				</div>

				<div className="stat gap-1 text-center shadow">
					<div className="stat-title text-center">Total Order Count</div>
					<div className="stat-value">{filteredData.total_order_count}</div>
					{/* <div className="stat-desc">21% more than last month</div> */}
				</div>

				<div className="stat gap-1 text-center shadow">
					<div className="stat-title text-center">Merchant Fulfilled Sales</div>
					<div className="stat-value">{filteredData.fbm_sales}</div>
					{/* <div className="stat-desc">21% more than last month</div> */}
				</div>

				<div className="stat gap-1 text-center shadow">
					<div className="stat-title text-center">Amazon Fulfilled Sales</div>
					<div className="stat-value">{filteredData.fba_sales}</div>
					{/* <div className="stat-desc">21% more than last month</div> */}
				</div>

				<div className="stat gap-1 text-center shadow">
					<div className="stat-title text-center">FBA Pending Sales</div>
					<div className="stat-value">{filteredData['fba_pending_sales']}</div>
					{/* <div className="stat-desc">21% more than last month</div> */}
				</div>

				<div className="stat gap-1 text-center shadow">
					<div className="stat-title text-center">FBM Pending Sales</div>
					<div className="stat-value">{filteredData.fbm_pending_sales}</div>
					{/* <div className="stat-desc">21% more than last month</div> */}
				</div>

				<div className="stat gap-1 text-center shadow">
					<div className="stat-title text-center">Total Pending Sales</div>
					<div className="stat-value">{filteredData.order_pending_count}</div>
					{/* <div className="stat-desc">21% more than last month</div> */}
				</div>

				<div className="stat gap-1 text-center shadow">
					<div className="stat-title text-center">Shipped Orders</div>
					<div className="stat-value">{filteredData.shipped_order_count}</div>
					{/* <div className="stat-desc">21% more than last month</div> */}
				</div>

				{/*<div className="App-link">

					<div className="data-box">
						<h7>Shipped Order Count:</h7>
						<span className="App-link-values">{data.shipped_order_count}</span>
					</div> */}
			</div>
		</>
	)
}
