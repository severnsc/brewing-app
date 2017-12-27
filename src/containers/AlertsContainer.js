import { connect } from 'react-redux'

import { 
  requestCreateAlert,
  requestUpdateAlert,
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
    saveTableRow: cells => {
      dispatch(requestUpdateAlert(cells))
    }
  }
}

const AlertsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditableTable)

export default AlertsContainer