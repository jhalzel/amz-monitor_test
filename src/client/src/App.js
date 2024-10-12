import { useState, useEffect } from 'react';
import './App.css';
import Login from './pages/auth/login'
import Register from './pages/auth/register'
import Home from './pages/Home'
import { AuthProvider } from './context/authContext'
import { useRoutes } from 'react-router-dom'
import NavBar from './components/NavBar'
import axios from 'axios'

function App() {
	const apiUrl = 'https://amazon-ecom-alarm.onrender.com'

	const [data, setData] = useState(null)
	const [threshold, set_Threshold] = useState(null)
	const [temp_threshold, setTemp_threshold] = useState(
		localStorage.getItem('threshold') || 999.99
	)
	const [last_updated, setLast_updated] = useState('')

	// Function to handle changes in the input field
	const handleThresholdChange = (e) => {
		setTemp_threshold(e.target.value)
	}

	// Function to handle the "Enter" key press
	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			// Update the value of the text box when "Enter" key is pressed
			set_Threshold(e.target.value)
		}
	}

	// Function to handle the button click
	const handleClick = () => {
		// Update the value of the text box when the button is clicked
		set_Threshold(temp_threshold)
	}

	const handleEdit = () => {
		// Update the value of the text box when the button is clicked
		set_Threshold(null)
	}

	const updateFirebaseThreshold = (newThreshold) => {
		// Make a POST request to the API
		axios
			.post(`${apiUrl}/set_firebase_data`, { threshold: newThreshold })
			.then((response) => {
				// Handle the response if needed
				console.log('Threshold updated successfully')
			})
			.catch((error) => {
				// Handle errors
				console.error('Failed to update threshold:', error)
			})
	}

	const retrieveLastUpdated = () => {
		axios
			.get(`${apiUrl}/get_firebase_data`)
			.then((response) => {
				// Parse the Object
				const keys = Object.keys(response.data)
				// Get the last key in the object
				const lastKey = keys[keys.length - 1]
				// Get the value of the last key in the object
				const lastValue = response.data[lastKey]
				// Get the last updated date's value
				const last_updated = lastValue.last_updated[0]
				// Set the last_updated state to the last updated value in the data
				setLast_updated(last_updated)
				console.log('last Updated: ', last_updated)
			})

			.catch((err) => {
				console.log(err)
			})
	}

	useEffect(() => {
		// Function to fetch the data from the API
		const fetchData = async () => {
			// Check current threshold value
			// console.log('threshold: ', threshold)

			// Make a GET request to the API
			axios
				.get(`${apiUrl}/get_firebase_data`)
				.then((response) => {
					// Parse the JSON data
					const rawData = response.data

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
						}

						// Push the data point into the formattedData array
						formattedData.push(dataPoint)
					})

					console.log('formattedData_App.js: ', formattedData)

					setData(formattedData)
				})

				.catch((err) => {
					console.log(err)
				})
		}

		// call function to retrieve last updated value
		retrieveLastUpdated()

		fetchData() // Initial fetch

		const interval = setInterval(fetchData, 300000) // Fetch every 5 minutes (adjust as needed)

		updateFirebaseThreshold(threshold)
		// localStorage.setItem('threshold', threshold);

		return () => clearInterval(interval) // Cleanup function to clear the interval
		// Call the function to update the Firebase database
	}, [threshold])

	const routes = [
		{
			path: '*',
			element: <Login />,
		},
		{
			path: '/',
			element: <Login />,
		},
		{
			path: '/login',
			element: <Login />,
		},
		{
			path: '/home',
			element: (
				<Home data={data} last_updated={last_updated} threshold={threshold} />
			),
		},
		{
			path: '/register',
			element: <Register />,
		},
	]

	let routesElement = useRoutes(routes)

	return (
		<AuthProvider>
			<NavBar name={'Seller Metrics Monitor'} />
			<div className="w-full h-screen flex flex-col">{routesElement}</div>
		</AuthProvider>
	)
}

export default App