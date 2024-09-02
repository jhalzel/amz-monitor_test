import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { useAuth } from '../../../context/authContext'
import {
	doSignInAnonymously,
	doSignInWithEmailAndPassword,
} from '../../../firebase/auth'

export const onGoogleSignIn = (
	e,
	isSigningIn,
	setIsSigningIn,
	doSignInWithGoogle
) => {
	e.preventDefault()
	if (!isSigningIn) {
		setIsSigningIn(true)
		doSignInWithGoogle().catch((err) => {
			setIsSigningIn(false)
		})
	}
}

const Login = () => {
	const { userLoggedIn } = useAuth()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isSigningIn, setIsSigningIn] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const onSubmit = async (e) => {
		e.preventDefault()
		if (!isSigningIn) {
			setIsSigningIn(true)
			doSignInWithEmailAndPassword(email, password)
		}
	}

	return (
		<div>
			{userLoggedIn && <Navigate to={'/home'} replace={true} />}

			<main className="w-full bg-custom-bg h-screen flex self-center place-content-center place-items-center">
				<div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
					<div className="text-center">
						<div className="mt-2 mb-6">
							<h3 className="text-base-content text-xl font-semibold sm:text-2xl">
								Welcome Back
							</h3>
						</div>
					</div>
					<form onSubmit={onSubmit} className="space-y-5">
						<div>
							<label className="text-sm text-base-content font-bold">
								Email
							</label>
							<input
								type="email"
								autoComplete="email"
								required
								value={email}
								onChange={(e) => {
									setEmail(e.target.value)
								}}
								className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
							/>
						</div>

						<div>
							<label className="text-sm text-base-content font-bold">
								Password
							</label>
							<input
								type="password"
								autoComplete="current-password"
								required
								value={password}
								onChange={(e) => {
									setPassword(e.target.value)
								}}
								className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
							/>
						</div>

						{errorMessage && (
							<span className="text-red-600 font-bold">{errorMessage}</span>
						)}

						<button
							type="submit"
							disabled={isSigningIn}
							className={`w-full px-4 py-2 text-slate-200 font-medium rounded-lg bg- ${
								isSigningIn
									? 'bg-gray-300 cursor-not-allowed'
									: 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'
							}`}>
							{isSigningIn ? 'Signing In...' : 'Sign In'}
						</button>
					</form>
					<p className="text-center text-sm text-base-content">
						Don't have an account?{' '}
						<Link to={'/register'} className="hover:underline font-bold">
							Sign up
						</Link>
					</p>
					{/* —— OR —— */}
					<div className="flex flex-row text-center w-full">
						<div className="border-b-2 mb-2.5 mr-2 w-full"></div>
						<div className="text-sm font-bold w-fit text-base-content">OR</div>
						<div className="border-b-2 mb-2.5 ml-2 w-full"></div>
					</div>
					<button
						disabled={isSigningIn}
						onClick={(e) => {
							onGoogleSignIn(e)
						}}
						className={`w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium  ${
							isSigningIn
								? 'cursor-not-allowed'
								: 'hover:bg-gray-100 transition duration-300 active:bg-gray-100'
						}`}>
						<svg
							className="w-5 h-5"
							viewBox="0 0 48 48"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<g clipPath="url(#clip0_17_40)">
								<path
									d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
									fill="#4285F4"
								/>
								<path
									d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
									fill="#34A853"
								/>
								<path
									d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
									fill="#FBBC04"
								/>
								<path
									d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
									fill="#EA4335"
								/>
							</g>
							<defs>
								<clipPath id="clip0_17_40">
									<rect width="48" height="48" fill="white" />
								</clipPath>
							</defs>
						</svg>
						<span className="text-base-content">
							{isSigningIn ? 'Signing In...' : 'Continue with Google'}
						</span>
					</button>
					<button
						className={`w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium  ${
							isSigningIn
								? 'cursor-not-allowed'
								: 'hover:bg-gray-100 transition duration-300 active:bg-gray-100'
						}`}
						disabled={isSigningIn}
						onClick={(e) => {
							doSignInAnonymously(e)
						}}>
						<svg
							className="w-5 h-5 fill-base-content"
							viewBox="0 0 20 20"
							preserveAspectRatio="xMidYMid meet"
							focusable="false">
							<path
								d="M10 11c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4m0-9C7.79 2 6 3.79 6 6s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4m0 10.9c2.97 0 6.1 1.46 6.1 2.1v1.1H3.9V15c0-.64 3.13-2.1 6.1-2.1m0-9a2.1 2.1 0 110 4.2 2.1 2.1 0 010-4.2"
								fill-opacity=".54"
								fill-rule="evenodd"></path>
						</svg>{' '}
						<span className="text-base-content">Continue as Guest</span>
					</button>
				</div>
			</main>
		</div>
	)
}

export default Login
