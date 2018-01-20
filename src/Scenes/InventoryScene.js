import React from 'react'
import InventoryContainer from '../containers/InventoryContainer'
import ShadowBox from '../Components/ShadowBox'
import FlexDiv from '../Components/FlexDiv'

const InventoryScene = props => {

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
    <FlexDiv>
      <ShadowBox>
        <InventoryContainer name="malt" columns={maltColumns} />
      </ShadowBox>
      <ShadowBox>
        <InventoryContainer name="yeast" columns={yeastColumns} />
      </ShadowBox>
      <ShadowBox>
        <InventoryContainer name="hops" columns={hopColumns} />
      </ShadowBox>
    </FlexDiv>
  )
}

export default InventoryScene