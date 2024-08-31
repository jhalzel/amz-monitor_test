// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyD_w0t_XNcZIOWXxZT3BdrYFuyuuSP4ANg',
	authDomain: 'notifier-6d1a0.firebaseapp.com',
	databaseURL: 'https://notifier-6d1a0-default-rtdb.firebaseio.com',
	projectId: 'notifier-6d1a0',
	storageBucket: 'notifier-6d1a0.appspot.com',
	messagingSenderId: '916193586926',
	appId: '1:916193586926:web:a17b916892e083d2e70dff',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { app, auth }
