import React from 'react'
import InventoryContainer from '../containers/InventoryContainer'
import ShadowBox from '../Components/ShadowBox'

const YeastInventoryBox = ShadowBox.extend`
  width:50%;
  margin-top:50px;
`

const YeastInventoryScene = () => {

  const columns = [
    {name: "Yeast Name", type: "text"},
    {name: "Amount", type: "number"}
  ]

  return(
    <YeastInventoryBox>
      <InventoryContainer name="yeast" columns={columns} />
    </YeastInventoryBox>
  )
}

export default YeastInventoryScene