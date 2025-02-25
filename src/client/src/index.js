import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/authContext'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<AuthProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</AuthProvider>
		<style>
			@import
			url('https://fonts.googleapis.com/css2?family=Gugi&family=Sarpanch:wght@500&display=swap');
		</style>
	</React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
