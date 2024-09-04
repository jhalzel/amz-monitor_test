import React from 'react'
import NavBar from '../components/NavBar'
import Badge from '../components/Badge'
import Metrics from '../components/Metrics'
import Chart from '../components/Chart'
import { formatNiceDate } from '../utils/formatting'

function Home({ data, threshold, last_updated }) {
	return (
		<div className="min-h-full">
			<div className="flex flex-row-reverse">
				<Badge
					name={`Last Updated: ${data ? formatNiceDate(last_updated) : 'N/A'}`}
				/>
			</div>

			{/* Input for FBM Sales Threshold */}

			{data ? (
				<>
					<Metrics data={data} />
					<Chart threshold={threshold} />
				</>
			) : (
				<p>Loading...</p>
			)}
		</div>
	)
}

export default Home
