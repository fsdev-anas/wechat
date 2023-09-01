import React from 'react'

const Paragraph = ({title,className,children}) => {
  return (
    <p className={className}>{title} {children}</p>
  )
}

export default Paragraph