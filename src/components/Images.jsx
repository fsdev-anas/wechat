import React from 'react'

const Images = ({src,alt,className}) => {
  return (
    <img src={src} alt={alt} className={className} />
  )
}

export default Images