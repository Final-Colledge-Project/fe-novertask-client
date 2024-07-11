import { useMemo } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import usePermission from '~/hooks/usePermission'
import { IDescription } from '~/services/types'

interface IProps {
  defaultValue: IDescription
  onChange: (value: IDescription) => void
  maxLength?: number
}

export default function RichText(props: IProps) {
  const { defaultValue, onChange, maxLength } = props
  const userPermissionOnBoard = usePermission()
  const canEditCard = () => userPermissionOnBoard?.card.update

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
          [{ color: [] }, { background: [] }],
          [{ size: ['small', false, 'large', 'huge'] }],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' }
          ],
          [{ align: [false, 'center', 'right', 'justify'] }],
          ['link'],
          ['clean']
        ]
      }
    }
  }, [])

  const formats = useMemo(
    () => [
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'code-block',
      'list',
      'bullet',
      'indent',
      'link',
      'color',
      'background',
      'size',
      'align'
    ],
    []
  )

  const handleChange = (content, _delta, _source, editor) => {
    // TODO: save both Delta object + showed text to database
    // setValue(content)
    // setShowedText(editor.getText())
    onChange({
      content: editor.getText(),
      formatter: content
    })
  }

  // useEffect(() => {
  //   onChange({
  //     content: showedText,
  //     formatter: value
  //   })
  // }, [value])

  return (
    <div style={{ minHeight: '300px' }} id="quill-rich-text-container">
      <ReactQuill
        style={{
          height: '250px',
          maxHeight: '300px'
        }}
        theme="snow"
        value={defaultValue?.formatter}
        placeholder="Add some content..."
        onChange={handleChange}
        readOnly={!canEditCard()}
        formats={formats}
        modules={modules}
        bounds={'#quill-rich-text-container'}
      />
    </div>
  )
}
