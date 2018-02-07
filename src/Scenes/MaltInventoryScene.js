import React from 'react'
import InventoryContainer from '../containers/InventoryContainer'
import ShadowBox from '../Components/ShadowBox'

const MaltInventoryBox = ShadowBox.extend`
  width:50%;
  margin-top:50px;
`

const MaltInventoryScene = () => {

  const columns = [
    {name: "Malt Name", type: "text"},
    {name: "Amount", type: "number"}
  ]

  return(
    <MaltInventoryBox>
      <InventoryContainer name="malt" columns={columns} />
    </MaltInventoryBox>
  )
}

export default MaltInventoryScene