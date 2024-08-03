import {
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  OnConnect,
  ReactFlow,
  useEdgesState,
  useNodesState
} from '@xyflow/react'
import { useCallback, useMemo } from 'react'

import '@xyflow/react/dist/style.css'
import { TextInputNode } from './component/node/TextInputNode'

const initialNodes = [
  {
    id: '1',
    type: 'TextInputNode',
    position: { x: 50, y: 50 },
    data: { text: 'foo bar' }
  },
  {
    id: '2',
    type: 'TextInputNode',
    position: { x: 300, y: 50 },
    data: {}
  }
]

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const nodeTypes = useMemo(
    () => ({
      TextInputNode: TextInputNode
    }),
    []
  )

  const onConnect: OnConnect = useCallback(
    (params) => {
      setEdges((eds) => addEdge(params, eds))
    },
    [setEdges]
  )

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  )
}
