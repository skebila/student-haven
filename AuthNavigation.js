/**@author Steven Kebila
* Import the functions you need from the SDKs you need
*/

import React, { useEffect, useState } from 'react'
import { SignedInStack, SignedOutStack } from './components/Navigation'
import {firebase} from './firebase'

const AuthNavigation = () => {
    const [currentUser, setCurrentUser] = useState(null)
    
    const userHandler = user => 
        user ? setCurrentUser(user) : setCurrentUser(null)

    useEffect(() => 
        firebase.auth().onAuthStateChanged(user => userHandler(user)),    
        []
    )
    return <>
        {
            currentUser ? <SignedInStack /> : <SignedOutStack />
        }
    </>
}

export default AuthNavigation