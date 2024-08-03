import type { Node, NodeProps } from '@xyflow/react'
import { Handle, Position, useHandleConnections, useNodesData, useReactFlow } from '@xyflow/react'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'

type TextInputNodeProps = Node<{ text: string }, 'text'>

export const TextInputNode = ({ data, id }: NodeProps<TextInputNodeProps>) => {
  const textInputConnections = useHandleConnections({
    type: 'target',
    id: 'text-input'
  })

  const textInputNodeData = useNodesData(textInputConnections?.[0]?.source)

  const { updateNodeData } = useReactFlow()
  const [text, setText] = useState(data.text)

  useEffect(() => {
    if (textInputNodeData?.data?.text) {
      setText(textInputNodeData?.data?.text as string)
    }
  }, [textInputNodeData, setText])

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setText(event.target.value)
      updateNodeData(id, { text })
    },
    [id, text, updateNodeData]
  )

  return (
    <div style={{ padding: 10, border: '1px solid #777', borderRadius: 5 }}>
      <Handle type="target" position={Position.Left} id="text-input" />
      <Handle type="source" position={Position.Right} id="text-output" />
      <input type="text" value={text} onChange={onChange} />
    </div>
  )
}
