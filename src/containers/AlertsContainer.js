import { connect } from 'react-redux'

import { 
  addTableRow, 
  toggleTableRowEditing, 
  saveTableRow 
} from '../actions/actions'

import { 
  getAlertRows,
  alertsToBeFired
} from '../selectors'

import EditableTable from '../Components/EditableTable'

const fireAlerts = alerts => {
  alerts.forEach(alert => console.log(alert.description))
}

const mapStateToProps = state => {

  fireAlerts(alertsToBeFired(state))

  const columns = [
    {name: "Description", type: "text"},
    {name: "Trigger time", type: "text"}
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
      dispatch(addTableRow(tableRow))
    },
    setEditing: id => {
      dispatch(toggleTableRowEditing(id))
    },
    saveTableRow: cells => {
      dispatch(saveTableRow(cells))
    }
  }
}

const AlertsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditableTable)

export default AlertsContainer