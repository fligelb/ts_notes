import React from 'react'
import { Link } from 'react-router-dom'
import { Tag } from '../App'

type SimplifiedNote = {
  id: string
  title: string
  tags: Tag[]
}

const NoteCard = ({ id, title, tags }: SimplifiedNote) => {
  return (
    <Link to={`/${id}`}>
      <div className="note-card">
        <div className="wrapper">
          <h2>{title}</h2>
          {tags.length > 0 && (
            <div className="tag-wrapper">
              {tags.map(tag => (
                <div className="tag" key={tag.id}>{tag.label}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default NoteCard