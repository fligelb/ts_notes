import { NoteData, Tag } from "../App"
import NoteForm from "./NoteForm"
import { useNote } from "./NoteLayout"

type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void,
  onAddTag: (data: Tag) => void,
  availableTags: Tag[]
}

const EditNote = ({ onSubmit, onAddTag, availableTags }: EditNoteProps) => {
  const note = useNote();

  return (
    <>
      <h1>Edit Note</h1>
      <NoteForm
        title={note.title}
        textarea={note.textarea}
        tags={note.tags}
        onSubmit={data => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  )
}

export default EditNote