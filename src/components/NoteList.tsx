import '../css/NoteList.css'
import { Link } from "react-router-dom"
import ReactSelect from 'react-select'
import { Note, Tag } from '../App'
import { useMemo, useState } from 'react'
import NoteCard from './NoteCard'
import EditTagsModal from './EditTagsModal'

type NoteListProps = {
  availableTags: Tag[],
  notes: Note[]
  onUpdateTag: (id: string, label: string) => void
  onDeleteTag: (id: string) => void
}

const NoteList = ({ availableTags, notes, onUpdateTag, onDeleteTag }: NoteListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [title, setTitle] = useState("")

  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      return (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) && (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
    })
  }, [title, selectedTags, notes])

  return (
    <>
      <header>
        <h1>Notes</h1>
        <div className="wrapper">
          <Link to="/new">
            <button>Create</button>
          </Link>
          <a href="#openModal">
            <button>Edit</button>
          </a>
        </div>
      </header>
      <div className="inputs">
        <div className="group">
          <label>Title</label>
          <input
            type="text"
            id="title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required />
        </div>
        <div className="group">
          <label>Tags</label>
          <ReactSelect
            value={selectedTags.map(tag => {
              return { label: tag.label, value: tag.id }
            })}
            options={availableTags.map(tag => {
              return { label: tag.label, value: tag.id }
            })}
            onChange={tags => {
              setSelectedTags(tags.map(tag => {
                return { label: tag.label, id: tag.value }
              }))
            }}
            isMulti
          />
        </div>
      </div>
      <div className="notes">
        {filteredNotes.map(note => (
          <div className="note-block" key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </div>
        ))}
      </div>
      <EditTagsModal
        availableTags={availableTags}
        onUpdateTag={onUpdateTag}
        onDeleteTag={onDeleteTag}
      />
    </>
  )
}

export default NoteList