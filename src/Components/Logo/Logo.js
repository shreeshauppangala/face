import React from 'react'
import Tilt from 'react-tilt'
import Face from './Face.png'
import './Logo.css'

const Logo = () => {
  return (
			<Tilt className="Tilt br2" options={{ max: 80 }} style={{ height: 150, width: 150 }}>
				<div className= "pa3">
					<img alt="Logo" src={Face} />
				</div>
			</Tilt>
  )
}

export default Logo
