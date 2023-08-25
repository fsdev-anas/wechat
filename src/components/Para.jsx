import React from 'react'

const Para = ({className,title,children}) => {
    return (
      <p className={className}>{title}{children}</p>
    )
  }

export default Para