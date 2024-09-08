import React, { useState, useEffect } from 'react'
// import { useSelector } from 'react-redux'
import axios from 'axios'
import Badge from './Badge'
import {
	BarChart,
	LineChart,
	Line,
	Bar,
	Area,
	AreaChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts'
import '../App.css'

export const Chart = ({ threshold }) => {
	// Initialize the Y-axis range state
	const [yMax, setYMax] = useState(500)

	const handleRangeChange = (e) => {
		setYMax(Number(e.target.value))
	}

	// const threshold = useSelector((state) => state.target.fbm_threshold)
	const [json_data, setJson_data] = useState([])
	const [original_data, setOriginal_data] = useState([])
	const [selectedView, setSelectedView] = useState('default')
	const [selectedChart, setSelectedChart] = useState('default')
	const [chartName, setChartName] = useState('')

	const apiUrl = 'https://amazon-ecom-alarm.onrender.com'
	// const apiUrl = 'http://127.0.0.1:5000/';

	const handleSelectChange = (e) => {
		setSelectedView(e.target.value)
	}

	const handleChartChange = (event) => {
		const selectedValue = event.target.value
		console.log('Selected Chart:', selectedValue)
		setSelectedChart(selectedValue)
	}

	const filter_dates = (e, data) => {
		// Set the selectedView state
		// console.log(e.target.value);

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
				// Filter data to only show the last 7 days
				filteredData = data.filter((item) => {
					const itemDate = new Date(item.date)
					console.log('itemDate: ', itemDate >= last7Days)
					return itemDate >= last7Days
				})
				break
			case 'Monthly View':
				console.log('Monthly View')
				// Filter data to only show the last 30 days
				filteredData = data.filter((item) => {
					const itemDate = new Date(item.date)
					return itemDate >= last30Days
				})
				break
			case '90 Day View':
				console.log('90 Day View')
				// Filter data to only show the last 90 days
				filteredData = data.filter((item) => {
					const itemDate = new Date(item.date)
					return itemDate >= last90Days
				})
				break
			default:
				console.log('default')
				// Filter data to only show the last 7 days
				filteredData = data.filter((item) => {
					const itemDate = new Date(item.date)
					return itemDate >= last30Days
				})
		}

		console.log('filtered data (Chart.jsx): ', filteredData)

		setJson_data(filteredData)
	}

	// Fetch the data from the API
	useEffect(() => {
		// Function to fetch the data from the API
		const fetchData = async () => {
			axios
				.get(`${apiUrl}/get_firebase_data`)
				.then((response) => {
					console.log('response: ', response.data)
					// Parse the JSON data
					const rawData = response.data

					console.log(rawData)
					// Initialize an empty array to store the formatted data
					const formattedData = []

					// Loop through the rawData
					Object.keys(rawData).forEach((key) => {
						const dataPoint = {
							date: rawData[key].date,
							fba_sales: [rawData[key].fba_sales],
							fbm_sales: [rawData[key].fbm_sales],
							fba_pending_sales: [rawData[key].fba_pending_sales],
							fbm_pending_sales: [rawData[key].fbm_pending_sales],
							total_order_count: [rawData[key].total_order_count],
							order_pending_count: [rawData[key].order_pending_count],
							shipped_order_count: [rawData[key].shipped_order_count],
							// threshold: [rawData[key].threshold]
							// threshold: threshold,
						}

						// Push the data point into the formattedData array
						formattedData.push(dataPoint)
						console.log('formattedData_Chart.jsx: ', formattedData)
					})

					setOriginal_data(filter_dates(selectedView, formattedData))
				})
				.catch((err) => {
					console.log(err)
				})
		}

		fetchData() // Initial fetch

		const interval = setInterval(fetchData, 300000) // Fetch every 5 minutes (adjust as needed)

		return () => clearInterval(interval) // Cleanup function to clear the interval
	}, [original_data, selectedView, selectedChart])

	return (
		<>
			<div className="flex justify-center p-4 py-8 shadow">
				<h3 className="flex self-center pr-4 font-semibold text-center px-4">
					Chart View:
				</h3>
				<select
					value={selectedChart}
					className="bg-custom-bg rounded-lg px-2 py-1 cursor-pointer"
					onChangeCapture={(e) => handleChartChange(e)}>
					<option value="default">Choose Chart</option>
					<option value="Line Chart (Sales)">Line Chart</option>
					<option value="Bar Chart (Orders)">Bar Chart</option>
					<option value="Area Chart (Sales)">Area Chart</option>
					{/* default to weekly */}
				</select>
			</div>

			<>
				<div className="mx-8 my-6">
					{selectedChart !== 'default' && (
						<div className="grid grid-rows-2 min-h-fit items-center">
							<h1 className="text-center justify-self-center text-3xl font-semibold">
								{selectedChart}
							</h1>

							<div className="flex justify-center mt-2">
								<h3 className="px-4 py-1 font-semibold text-center">
									Adjust Timeline:
								</h3>
								<select
									value={selectedView}
									className="bg-custom-bg rounded-lg py-1.5 cursor-pointer
												text-center min-w-[9rem]"
									onChangeCapture={handleSelectChange}>
									<option value="default">Choose Range</option>
									<option value="Weekly View">Weekly View</option>
									<option value="Monthly View">Monthly View</option>
									<option value="90 Day View">90 Day View</option>
									{/* default to weekly */}
								</select>
							</div>
						</div>
					)}
					{(selectedChart === 'Area Chart (Sales)' && (
						<>
							<ResponsiveContainer width="100%" height={400}>
								<AreaChart
									data={json_data}
									width="100%"
									height={400}
									margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="date" />
									<YAxis />
									<Tooltip />
									<Legend />
									<Area
										type="monotone"
										dataKey="fbm_sales"
										stackId="1"
										stroke="#8884d8"
										fill="#8884d8"
									/>
									<Area
										type="monotone"
										dataKey="fba_sales"
										stackId="2"
										stroke="#82ca9d"
										fill="#82ca9d"
									/>
									<Area
										type="monotone"
										dataKey="fba_pending_sales"
										stackId="3"
										stroke="#ffc658"
										fill="#ffc658"
									/>
								</AreaChart>
							</ResponsiveContainer>
						</>
					)) ||
						(selectedChart === 'Line Chart (Sales)' && (
							<>
								<div className="relative flex justify-center">
									<div className="min-w-full">
										<ResponsiveContainer
											width="100%"
											height={400}
											className="my-6">
											<LineChart
												data={json_data}
												width="100%"
												height={400}
												margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
												<CartesianGrid strokeDasharray="3 3" />

												<XAxis
													dataKey="date"
													tick={{ fontSize: 12, fill: '#61dafb' }}
													tickFormatter={(value) => `${value}`}
												/>
												<YAxis
													// domain={[0, 'dataMax']}
													domain={[0, yMax]}
													tick={{ fontSize: 15, fill: '#61dafb' }}
													tickFormatter={(value) => `$${value}`}
												/>
												<Tooltip
													contentStyle={{ backgroundColor: '#282c34' }}
													formatter={(value, name) => [value, `${name}`]}
												/>
												<Legend />
												<Line
													type="monotone"
													dataKey="fbm_sales"
													stroke="#82ca9d"
												/>
												<Line
													type="monotone"
													dataKey="threshold"
													stroke="red"
													dot={false} // Remove dots if you don't want them on the threshold line
												/>
												<Line
													type="monotone"
													dataKey="fba_sales"
													stroke="#8884d8"
												/>
												<Line
													type="monotone"
													dataKey="fba_pending_sales"
													stroke="#065535"
												/>
											</LineChart>
										</ResponsiveContainer>
									</div>
									<div className="absolute top-36 -left-32 -ml-2 -rotate-90 text-center">
										{/* Slider to adjust yMax */}
										<Badge
											name={`Adjust Y-Axis Max: ${yMax}`}
											className="font-bold hover:bg-amber-100"
										/>
										<input
											type="range"
											min={100}
											max="1000"
											value={yMax}
											className="range range-xs "
											onChange={handleRangeChange}
										/>
									</div>
								</div>
							</>
						)) ||
						(selectedChart === 'Bar Chart (Orders)' && (
							<>
								{/* <h1 className="flex justify-center text-xl font-semibold">
									Order Count Chart
								</h1> */}
								<ResponsiveContainer width="100%" height={400}>
									<BarChart
										data={json_data}
										margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
										<XAxis
											dataKey="date"
											tick={{ fontSize: 12, fill: '#61dafb' }}
											tickFormatter={(value) => `${value}`}
										/>
										<YAxis tick={{ fontSize: 15, fill: '#61dafb' }} />
										<Tooltip
											contentStyle={{ backgroundColor: '#282c34' }}
											formatter={(value, name) => [value, `${name}`]}
										/>
										<Legend />
										<Bar
											dataKey="total_order_count"
											stackId="b"
											fill="#ffc658"
										/>
										<Bar
											dataKey="order_pending_count"
											stackId="b"
											fill="#ffe4e1"
										/>
										<Bar
											dataKey="shipped_order_count"
											stackId="b"
											fill="green"
										/>
									</BarChart>
								</ResponsiveContainer>
							</>
						)) ||
						(selectedChart === 'default' && (
							<div className="bg-custom-bg flex justify-center p-20 rounded-xl">
								<h2 className="text-2xl font-semibold ">
									Select a Chart View...
								</h2>
							</div>
						))}
				</div>
			</>
		</>
	)
}

export default Chart
