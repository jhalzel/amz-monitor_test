import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	sendEmailVerification,
	sendPasswordResetEmail,
	signInAnonymously,
	signInWithEmailAndPassword,
	signInWithPopup,
	updatePassword,
} from 'firebase/auth'
import { auth } from './firebase'

export const doCreateUserWithEmailAndPassWord = async (email, password) => {
	return createUserWithEmailAndPassword(auth, email, password)
}

export const doSignInWithEmailAndPassword = async (email, password) => {
	return signInWithEmailAndPassword(auth, email, password)
}

export const doSignInWithGoogle = async () => {
	const provider = new GoogleAuthProvider()
	const result = await signInWithPopup(auth, provider)
	// result.user - store in firestore maybe
	return result
}

export const doSignInAnonymously = async () => {
	return signInAnonymously(auth)
}

export const doSignOut = () => {
	return auth.signOut()
}

export const doPasswordReset = (email) => {
	return sendPasswordResetEmail(auth, email)
}

export const doPasswordChange = (password) => {
	return updatePassword(auth.currentUser, password)
}

export const doSendEmailVerification = () => {
	return sendEmailVerification(auth.currentUser, {
		url: `${window.location.origin}/home`,
	})
}
