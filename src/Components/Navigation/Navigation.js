import React from 'react'

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
			<nav style={{ display: 'flex', justifyContent: 'flex-end', height: 100 }}>
				<p onClick={() => onRouteChange('Signout')} className='f3 link dim blue underline pa3 pointer'>Sign Out</p>
			</nav>
    )
  } else {
    return (
			<nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<p onClick={() => onRouteChange('Signin')} className='f3 link dim blue underline pa3 pointer'>Sign In</p>
				<p onClick={() => onRouteChange('Signup')} className='f3 link dim blue underline pa3 pointer'>Sign Up</p>
			</nav>
    )
  }
}
export default Navigation
