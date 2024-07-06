import { cloneElement } from 'react'

const FlowNode = (props) => {
  const { inputs } = props

  return (
    <div style={{ background: '#717EC3', borderRadius: '10px' }}>
      <div style={{ padding: '10px', color: 'white' }}>Column new</div>
      <div style={{ marginTop: '20px' }}>
        {inputs.map((port) =>
          cloneElement(port, {
            style: { width: '50px', height: '25px', background: '#1B263B' }
          })
        )}
      </div>
    </div>
  )
}

export default FlowNode
