import React from 'react'
import Tilt from 'react-tilt'
import './Img.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
		<div>
			<p className='f1 b underline' style={{ color: '#e25b4587' }}>
				{'This will detect faces'}
			</p>
				<Tilt className='Tilt' options={{ max: 10 }}>
				  <div className='form center w-70 pa3 br3 shadow-5'>
						<input className='f3 w-60 center' placeholder='Paste The Image URL' type='text' onChange={onInputChange}/>
						<p className='b f4 center'>OR</p>
						<input className='center pa3' type="file" name="Image" onChange={onInputChange} />
						<button className='grow pa4 pv2 dib white bg-light-red'onClick={onButtonSubmit}>Detect</button>
				  </div>
				</Tilt>
		</div>
  )
}

export default ImageLinkForm
