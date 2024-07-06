import 'beautiful-react-diagrams/styles.css'
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams'
import FlowNode from './FlowNode'
import { useEffect } from 'react'

const initialSchema = createSchema({
  nodes: [
    {
      id: 'node-1',
      content: 'Node 1',
      coordinates: [150, 60],
      outputs: [{ id: 'port-1', alignment: 'right' }]
    },
    {
      id: 'node-custom',
      coordinates: [250, 60],
      render: FlowNode,
      inputs: [{ id: 'custom-port-1', alignment: 'left' }]
    }
  ],
  links: [{ input: 'port-1', output: 'custom-port-1', label: 'Hello' }]
})

export default function BoardFlow() {
  // create diagrams schema
  const [schema, { onChange, connect }] = useSchema(initialSchema)

  useEffect(() => {
    // console.log(schema)
  }, [schema])

  return (
    <div style={{ height: '22.5rem' }}>
      <Diagram schema={schema} onChange={onChange} />
    </div>
  )
}
