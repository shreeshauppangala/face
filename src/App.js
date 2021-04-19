import React, { useState } from 'react'
import Particles from 'react-particles-js'
import Navigation from './Components/Navigation/Navigation'
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import Signin from './Components/Signin/Signin'
import Signup from './Components/Signup/Signup'
import Rank from './Components/Rank/Rank'
import './App.css'

const particlesOptions = {
  particles: {
    number: {
      value: 10,
      density: {
        enable: true,
        value_area: 100
      }
    }
  }
}
const initialStage = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'Signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }

}
const App = () => {
  const [initialState, setInitialState] = useState(initialStage)

  const loadUser = (data) => {
  	setInitialState({
  		...initialState,
      user: {
  			id: data.id,
  			name: data.name,
  			email: data.email,
  			entries: data.entries,
  			joined: data.joined
  		}
  	})
  }

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    	const image = document.getElementById('inputimage')
    	const width = Number(image.width)
    const height = Number(image.height)
    	return {
    		leftCol: clarifaiFace.left_col * width,
    		topRow: clarifaiFace.top_row * height,
    		rightCol: width - (clarifaiFace.right_col * width),
    		bottomRow: height - (clarifaiFace.bottom_row * height)
    	}
  }

  const displayFaceBox = (box) => {
    	console.log(box)
    	setInitialState({ ...initialState, box: box })
  }

  const getBase64 = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setInitialState({
        ...initialState, input: reader.result
      })
    }
    reader.onerror = function (error) {
      console.log('Error: ', error)
    }
  }

  const onInputChange = (event) => {
	  if (event.target.value.includes('http://') ||
	  event.target.value.includes('https://')
	  ) {
      setInitialState({ ...initialState, input: event.target.value })
    } else {
      getBase64(event)
    }
  }

  const onButtonSubmit = () => {
	  setInitialState({ ...initialState, imageUrl: initialState.input })
	  fetch('https://tranquil-temple-83486.herokuapp.com/imageurl', {
  					method: 'post',
  					headers: { 'Content-Type': 'application/json' },
  					body: JSON.stringify({ ...initialState.input })
				  })
				  .then(response => response.json())
  		.then(response => {
  			if (response) {
  				fetch('https://tranquil-temple-83486.herokuapp.com/image', {
  					method: 'put',
  					headers: { 'Content-Type': 'application/json' },
  					body: JSON.stringify({
  						id: initialState.user.id
  					})
  				})
  					.then(response => response.json())
  					.then(count => {
  						setInitialState({ ...initialState, user: { ...initialState.user, entries: count } })
  					})
  					.catch(console.log)
  			}
  			displayFaceBox(calculateFaceLocation(response))
  		})
  		.catch(err => console.log(err))
  }

  const onRouteChange = (route) => {
  	if (route === 'Signout') {
  		setInitialState(initialState)
  	} else if (route === 'home') {
  	   setInitialState({ ...initialState, isSignedIn: true })
  	}
  	setInitialState({ ...initialState, route })
  }
  	return (
  		<div className="App" >
  			<Logo />
  			<Particles className='particles'
  				params={particlesOptions}
  			/>
  			<Navigation isSignedIn={initialState.isSignedIn} onRouteChange={onRouteChange} />
  			{initialState.route === 'home'
  				? <div>
  					<Rank
  						name={ initialState.user.name }
  						entries={ initialState.user.entries } />
  					<ImageLinkForm
  						onInputChange={onInputChange}
  						onButtonSubmit={onButtonSubmit}
  					/>
  					<FaceRecognition box={initialState.box} imageUrl={initialState.imageUrl} />
  				</div>
  				: (
  					initialState.route === 'Signin'
  						? <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
  						: <Signup loadUser={loadUser} onRouteChange={onRouteChange} />
  				)

  			}
  		</div>
  	)
}

export default App
