/*
    Use this to share auth data between components
    without having to explicitly pass auth data through
    every level of the tree
*/

import React from 'react'

const UserContext = React.createContext({
    userData: null,
})

export default UserContext
