import React from 'react'

const TableHeaderTitle = ({title, subContent}) => {
  return (
    <div className='header-container'>
        <p className='header-container-left'>{title}</p>
        {
          subContent &&
        <p className='header-container-right'>{subContent}</p>
        }
    </div>
  )
}

export default TableHeaderTitle