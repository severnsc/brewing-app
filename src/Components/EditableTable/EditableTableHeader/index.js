import React from 'react'
import PropTypes from 'prop-types'

const EditableTableHeader = ({columnNames}) => {

  return(
    <div>
      {columnNames.map( columnName => {return <div>{columnName}</div>})}
    </div>
  )

}

EditableTableHeader.propTypes = {
  columnNames: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default EditableTableHeader