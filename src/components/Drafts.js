import React from 'react';

const Drafts = ({ drafts, editDraft, removeDraft }) => {
    return (
        <ul className="draft-list">
            {drafts.map((draft) => (
                <li key={draft.id} className="draft">
                    <h3 className="draft-title">{draft.title}</h3>
                    <p className="draft-info">
                        Author: {draft.author} | Date Published: {draft.date_published}
                    </p>
                    <p className="draft-content">{draft.content}</p>
                    <button onClick={() => editDraft(draft)} className="edit-button">
                        Edit
                    </button>
                    <button onClick={() => removeDraft(draft.id)} className="remove-button">
                        Remove
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default Drafts;
