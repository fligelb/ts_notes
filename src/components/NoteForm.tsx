import "../css/NoteForm.css"

import CreatableSelect from 'react-select/creatable';
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useRef, useState } from "react";
import { v4 as uuidV4 } from 'uuid'

import { NoteData, Tag } from '../App'

type NoteFormProps = {
  onSubmit: (data: NoteData) => void,
  onAddTag: (data: Tag) => void,
  availableTags: Tag[]
} & Partial<NoteData>

const NoteForm = ({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  textarea = "",
  tags = []
}: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    let text = textareaRef.current!.value
    selectedTags.map(tag => {
      text = text.replaceAll('#' + tag.label, '**' + tag.label + '**')
      text = text.replaceAll(tag.label, '**' + tag.label + '**')
    })

    onSubmit({
      title: titleRef.current!.value,
      textarea: text,
      tags: selectedTags
    })

    navigate("..")
  }

  function addTagsFromText(text: string) {
    const newTags = text.match(/(^|\s)#([\wа-яА-Яa-zA-Z0-9]+)/g)
    if (newTags === null) return;
    else {
      const trimmedTags = newTags.map(function (str) { return str.trim().substring(1) })
      const finalTags = trimmedTags.filter(label =>
        selectedTags.every(tag => tag.label !== label) &&
        availableTags.every(tag => tag.label !== label)
      ).map(label => {
        const newTag = { id: uuidV4(), label }
        onAddTag(newTag)
        return newTag
      })
      setSelectedTags(currentTags => [...currentTags, ...finalTags])
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="inputs">
        <div className="group">
          <label>Title</label>
          <input
            type="text"
            id="title-input"
            ref={titleRef}
            required
            defaultValue={title}
          />
        </div>
        <div className="group">
          <label>Tags</label>
          <CreatableSelect
            onCreateOption={label => {
              const newTag = { id: uuidV4(), label }
              onAddTag(newTag)
              setSelectedTags(prev => [...prev, newTag])
            }}
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
      <textarea
        rows={25}
        ref={textareaRef}
        required
        defaultValue={textarea}
      />
      <div className="buttons-container">
        <button type="submit" onClick={() => addTagsFromText(textareaRef.current!.value)}>Save</button>
        <Link to="..">
          <button type="button">Cancel</button>
        </Link>
      </div>
    </form>
  )
}

export default NoteForm