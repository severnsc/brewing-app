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
  const messageEndpoint = 'http://localhost:3001/messages'
  alerts.forEach(alert => {
    fetch(messageEndpoint, {
      body: JSON.stringify({message: alert.description}),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    })
    .then(res => console.log(res))
    .catch(err => console.error(err))
  })
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