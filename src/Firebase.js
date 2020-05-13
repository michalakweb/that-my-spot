import * as firebase from "firebase/app"
import "firebase/analytics"
import "firebase/firestore"

const config = {
	apiKey: "AIzaSyC01mkNiMjiTH4BNFwTMHOvPKOOhK4Vcso",
	authDomain: "queue-a0c31.firebaseapp.com",
	databaseURL: "https://queue-a0c31.firebaseio.com",
	projectId: "queue-a0c31",
	storageBucket: "queue-a0c31.appspot.com",
	messagingSenderId: "225102581384",
	appId: "1:225102581384:web:247c59a5c64ffc258bd93d",
	measurementId: "G-SPTFYRNHWB"
}

firebase.initializeApp(config)
firebase.analytics()

export const db = firebase.firestore()
