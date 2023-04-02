import { Tag } from "../App"
import "../css/EditTagsModal.css"

type EditTagsModalProps = {
  availableTags: Tag[]
  onUpdateTag: (id: string, label: string) => void
  onDeleteTag: (id: string) => void
}

const EditTagsModal = ({ availableTags, onUpdateTag, onDeleteTag }: EditTagsModalProps) => {
  return (
    <div id="openModal" className="modal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title">Tags</h3>
            <a href="#close" title="Close" className="close">×</a>
          </div>
          <div className="modal-body">
            {availableTags.map(tag => (
              <div className="block" key={tag.id} >
                <input
                  type="text"
                  required
                  defaultValue={tag.label}
                  onChange={e => onUpdateTag(tag.id, e.target.value)}
                />
                <button onClick={() => onDeleteTag(tag.id)}>&times;</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditTagsModal