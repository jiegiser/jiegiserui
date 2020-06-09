import React from 'react'

const styles: React.CSSProperties = {
  textAlign: 'center'
}
const CenterDecorator = (storyFn: any) => (
<div style={styles}>{storyFn()}</div>
)
export default CenterDecorator
