import React from 'react'
import InventoryContainer from '../containers/InventoryContainer'
import ShadowBox from '../Components/ShadowBox'
import FlexDiv from '../Components/FlexDiv'

const InventoryBox = ShadowBox.extend`
  width:100%;
  margin:10px;
`

const InventoryDiv = FlexDiv.extend`
  width:50%;
  margin-top: 50px;
`

const InventoryScene = () => {

  const maltColumns = [
    {name: "Malt Name", type: "text"},
    {name: "Amount", type: "number"}
  ]

  const yeastColumns = [
    {name: "Yeast Name", type: "text"},
    {name: "Amount", type: "number"}
  ]

  const hopColumns = [
    {name: "Hop Name", type: "text"},
    {name: "Amount", type: "number"}
  ]

  return(
    <InventoryDiv>
      <InventoryBox>
        <InventoryContainer name="malt" columns={maltColumns} />
      </InventoryBox>
      <InventoryBox>
        <InventoryContainer name="yeast" columns={yeastColumns} />
      </InventoryBox>
      <InventoryBox>
        <InventoryContainer name="hops" columns={hopColumns} />
      </InventoryBox>
    </InventoryDiv>
  )
}

export default InventoryScene