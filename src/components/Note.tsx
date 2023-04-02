import { Link, useNavigate } from "react-router-dom"
import "../css/Note.css"
import { useNote } from './NoteLayout'
import ReactMarkdown from 'react-markdown'

type NoteProps = {
  onDeleteNote: (id: string) => void
}

export const Note = ({ onDeleteNote }: NoteProps) => {
  const note = useNote()
  const navigate = useNavigate();

  return (
    <div className="note">
      <header>
        <div className="wrapper">
          <span>{note.title}</span>
          {note.tags.length > 0 && (
            <div className="tag-wrapper">
              {note.tags.map(tag => (
                <div className="tag" key={tag.id}>{tag.label}</div>
              ))}
            </div>
          )}
        </div>
        <div className="button-wrapper">
          <Link to={`/${note.id}/edit`} >
            <button>Edit</button>
          </Link>
          <button
            id="danger"
            onClick={() => {
              onDeleteNote(note.id)
              navigate("/")
            }}
          >Delete</button>
          <Link to="..">
            <button>Cancel</button>
          </Link>
        </div>
      </header>
      <hr />
      <ReactMarkdown children={note.textarea} />
    </div>
  )
}
