import { connect } from 'react-redux'

import {
  toggleTableRowEditing,
  requestCreateAlert,
  requestUpdateAlert,
  toggleButtonVisibility
} from '../actions/actions'

import { 
  getAlertRows
} from '../selectors'

import EditableTable from '../Components/EditableTable'

const mapStateToProps = state => {

  const columns = [
    {name: "Description", type: "text"},
    {name: "Activation time", type: "text"}
  ]

  return{
    tableRows: getAlertRows(state),
    columns,
    name: "alerts"
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addRow: tableRow => {
      dispatch(requestCreateAlert(tableRow))
    },
    setEditing: id => {
      dispatch(toggleTableRowEditing(id))
    },
    saveTableRow: (id, cells) => {
      dispatch(requestUpdateAlert(id, cells))
    },
    toggleButtonVisibility: (id, bool) => {
      dispatch(toggleButtonVisibility(id, bool))
    }
  }
}

const AlertsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditableTable)

export default AlertsContainer