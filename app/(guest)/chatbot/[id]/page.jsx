import React from 'react'

const page = ({params}) => {
  return (
    <div>
      dynamic url 
      <br />
      {params.id}
    </div>
  )
}

export default page
