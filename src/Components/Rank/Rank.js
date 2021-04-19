import React from 'react'

const Rank = ({ name, entries }) => {
  return (
		<div>
			<div className='Black f3'>
				{`${name} your current Count is`}
			</div>
			<div className='Black f1'>{entries}
		    </div>
		</div>

  )
}

export default Rank
