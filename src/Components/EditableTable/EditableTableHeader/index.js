import React from 'react'
import PropTypes from 'prop-types'

const EditableTableHeader = ({columnNames}) => {

  return(
    <div>
      {columnNames.map( columnName => {return <div>columnName</div>})}
    </div>
  )

}

export default EditableTableHeader