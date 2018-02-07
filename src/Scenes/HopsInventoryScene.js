import React from 'react'
import InventoryContainer from '../containers/InventoryContainer'
import ShadowBox from '../Components/ShadowBox'

const HopsInventoryBox = ShadowBox.extend`
  width:50%;
  margin-top:50px;
`

const HopsInventoryScene = () => {

  const columns = [
    {name: "Hop Name", type: "text"},
    {name: "Amount", type: "number"}
  ]

  return(
    <HopsInventoryBox>
      <InventoryContainer name="hops" columns={columns} />
    </HopsInventoryBox>
  )
}

export default HopsInventoryScene