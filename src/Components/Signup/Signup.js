import React, { useState } from 'react'
import Tilt from 'react-tilt'

const Signup = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onNameChange = (event) => {
  	setName(event?.target?.value)
  }

  const onEmailChange = (event) => {
  	setEmail(event?.target?.value)
  }

  const onPasswordChange = (event) => {
  	setPassword(event.target.value)
  }

  const onSubmitSignIn = () => {
  	fetch('https://tranquil-temple-83486.herokuapp.com/Signup', {
  		method: 'post',
  		headers: { 'Content-Type': 'application/json' },
  		body: JSON.stringify({
  			email: email,
  			password: password,
  			name: name
  		})

  	})
  		.then(Response => Response.json())
  		.then(user => {
  			if (user.id) {
  				props.loadUser(user)
  				props.onRouteChange('home')
  			}
  		})
  }

	  const { onRouteChange } = props
  	return (
  		<article className="w-25-l mw6 center">
			   <Tilt className='Tilt' options={{ max: 25 }}>
  			<main className="pa4 black-80">
  				<div className="measure">
  					<fieldset id="Signup" className="ba b--transparent ph0 mh0">
  						<legend className="f1 fw6 ph0 mh0">Sign Up</legend>
  						<div className="mt3">
  							<label className="db fw6 lh-copy f6" htmlFor="Name">Name</label>
  							<input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" placeholder='Enter Your Name' type="text" name="Name" id="Name"
  							onChange={onNameChange} />
  						</div>
  						<div className="mt3">
  							<label className="db fw6 lh-copy f6" htmlFor="Email-address">Email</label>
  							<input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" placeholder='Enter Your Email' type="text" name="Email" id="Email"
  							onChange={onEmailChange} />
  						</div>
  						<div className="mv3">
  							<label className="db fw6 lh-copy f6" htmlFor="Password">Password</label>
  							<input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" placeholder='Create A Password' type="Password" name="Password" id="Password"
  							onChange={onPasswordChange} />
  						</div>
  					</fieldset>
  					<div className="">
  						<input onClick={onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Signup" />
  					</div>
					   <div className="lh-copy mt3">
              <p onClick={() => onRouteChange('Signin')} className="f6 link dim black db pointer">Sign In</p>
            </div>
  				</div>
  			</main>
			   </Tilt>
  		</article>
  	)
}

export default Signup
