import "./css/App.css"

import { Routes, Route, Navigate } from "react-router-dom"
import NewNote from "./components/NewNote"
import { useLocalStorage } from "./useLocalStorage";
import { useMemo } from "react";
import { v4 as uuidV4 } from 'uuid'
import NoteList from "./components/NoteList";
import { NoteLayout } from "./components/NoteLayout";
import { Note } from "./components/Note";
import EditNote from "./components/EditNote";

export type Note = {
  id: string;
} & NoteData

export type RawNote = {
  id: string,
} & RawNoteData

export type RawNoteData = {
  title: string,
  textarea: string,
  tagIds: string[]
}

export type NoteData = {
  title: string,
  textarea: string,
  tags: Tag[]
}

export type Tag = {
  id: string,
  label: string
}


export const App = () => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("notes", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("tags", [])

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags])

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) }
      ]
    })
  }

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map(tag => tag.id) }
        } else {
          return note;
        }
      })
    })
  }

  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag])
  }

  function onDeleteNote(id: string) {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })
  }

  function onUpdateTag(id: string, label: string) {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return { ...tag, label }
        } else {
          return tag;
        }
      })
    })
  }

  function onDeleteTag(id: string) {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id)
    })
  }

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<NoteList
          availableTags={tags}
          notes={notesWithTags}
          onUpdateTag={onUpdateTag}
          onDeleteTag={onDeleteTag}
        />} />
        <Route path="/new" element={<NewNote
          onSubmit={onCreateNote}
          onAddTag={addTag}
          availableTags={tags}
        />} />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />} >
          <Route index element={<Note onDeleteNote={onDeleteNote} />} />
          <Route path="edit" element={<EditNote
            onSubmit={onUpdateNote}
            onAddTag={addTag}
            availableTags={tags}
          />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}
