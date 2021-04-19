import React, { useState } from 'react'
import Tilt from 'react-tilt'

const Signin = (props) => {
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')

  const onEmailChange = (event) => {
    setSignInEmail(event.target.value)
  }

  const onPasswordChange = (event) => {
    setSignInPassword(event.target.value)
  }

  const onSubmitSignIn = () => {
    fetch('https://tranquil-temple-83486.herokuapp.com/Signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          props.loadUser(user)
          props.onRouteChange('home')
        }
      })
  }

  const { onRouteChange } = props
  return (
      <article className=" w-25-l mw6 center">
         <Tilt className='Tilt centre' options={{ max: 25 }}>
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="Signup" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  placeholder='Enter Your Email'
                  name="email-address"
                  id="email-address"
                  onChange={onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  placeholder='Enter Your Password'
                  name="password"
                  id="password"
                  onChange={onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p onClick={() => onRouteChange('Signup')} className="f6 link dim black db pointer">Sign Up</p>
            </div>
          </div>
        </main>
         </Tilt>
      </article>
  )
}

export default Signin
