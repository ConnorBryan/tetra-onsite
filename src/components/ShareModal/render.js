import React from 'react';
import Modal from 'react-modal';
import { truncate } from 'src/utils';
import Spinner from 'src/components/Spinner';
import Collaborator from 'src/models/Collaborator';
import Participant from 'src/models/Participant';
import Meeting from 'src/models/Meeting';
import TextInput from 'src/components/form/TextInput';
import Button from 'src/components/Button';
import ClipboardButton from 'react-clipboard.js';
import './styles.scss';

// TODO (Nik): we should probably use classnames for this? https://github.com/reactjs/react-modal#using-css-classes
const shareModalStyle = {
  content: {
    width: '100%',
    maxWidth: '500px',
    boxSizing: 'border-box',
    margin: '100px auto',
    padding: '50px',
    background: 'white',
    outlineWidth: '0',
    borderRadius: '10px',
    boxShadow:
      '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
  },
};

type CollaboratorRowProps = {
  collaborator: Collaborator | Participant,
  onClick?: () => void,
};
function CollaboratorRow({ collaborator, onClick }: CollaboratorRowProps) {
  return (
    <div
      className={
        onClick != null
          ? 'collaboratorRow selectCollaboratorRow row'
          : 'collaboratorRow row'
      }
      onClick={onClick}
    >
      <div
        style={onClick != null ? { backgroundColor: '#b2b2b2' } : {}}
        className="collaboratorCirc"
      >
        {collaborator.getDisplayLetter()}
      </div>
      <div className="collaboratorDesc">
        <span>
          {collaborator.getDisplayName()}
        </span>
      </div>
      <div display-if={onClick != null} className="selectCollaboratorBtn">
        <div>Invite</div>
      </div>
    </div>
  );
}

type ShareLinkProps = {
  meeting: Meeting,
  isCopied: boolean,
  setIsCopied: boolean => void,
};
function ShareLink({ meeting, isCopied, setIsCopied }: ShareLinkProps) {
  return (
    <div className="shareLinkContainer" display-if={meeting}>
      <div className="subTitle">Copy share Link:</div>
      <div className="formRow">
        <TextInput
          className="shareLinkInput"
          name="shareLink"
          value={meeting != null ? truncate(meeting.getShareUrl(), 40) : ''}
          onChange={() => {}}
        />
        <ClipboardButton
          className="shareLinkBtn"
          data-clipboard-text={meeting.getShareUrl()}
          onSuccess={() => setIsCopied(true)}
        >
          <span className="material-icons">
            {isCopied ? 'check' : 'content_copy'}
          </span>
        </ClipboardButton>
      </div>
    </div>
  );
}

type CollaboratorFormType = {
  submitted: boolean,
  value: string,
  error: string,
  isLoading: boolean,
};

type CollaboratorFormProps = {
  selectedCollaborator: Participant,
  collaboratorForm: CollaboratorFormType,
  onCollaboratorChange: ({ value: string }) => void,
  onCollaboratorBlur: () => void,
  submitCollaboratorForm: () => void,
};
function CollaboratorForm({
  selectedCollaborator,
  collaboratorForm: { isLoading, value, error },
  onCollaboratorChange,
  onCollaboratorBlur,
  submitCollaboratorForm,
}: CollaboratorFormProps) {
  return (
    <div>
      <Spinner display-if={isLoading} color="red" className="spinner" />

      <div display-if={!isLoading} className="collaboratorForm">
        <div className="subTitle" display-if={!isLoading}>
          Add Collaborators:
        </div>
        <div className="formRow">
          <TextInput
            className="collaboratorInput"
            name="emailOrPhoneNumber"
            value={
              selectedCollaborator != null
                ? selectedCollaborator.getDisplayName()
                : value
            }
            placeholder="Enter an email or phone number..."
            onChange={onCollaboratorChange}
            onBlur={onCollaboratorBlur}
          />
          <Button
            icon="person_add"
            size="medium"
            className="addCollaboratorBtn"
            onClick={submitCollaboratorForm}
          />
        </div>
        <div className="collaboratorFormError" display-if={error != null}>
          {error}
        </div>
      </div>
    </div>
  );
}

type ShareModalProps = {
  meeting: Meeting,
  isOpen: boolean,
  setIsOpen: boolean => void,

  isCopied: boolean,
  setIsCopied: boolean => void,

  suggestedCollaborators: Array<Participant>,
  collaborators: Array<Collaborator>,
  selectedCollaborator: Participant,
  onSelectCollaborator: Participant => void,

  collaboratorForm: CollaboratorFormType,
  onCollaboratorChange: ({ value: string }) => void,
  onCollaboratorBlur: () => void,
  submitCollaboratorForm: () => void,
};
export default function ShareModal({
  meeting,
  isOpen,
  setIsOpen,

  isCopied,
  setIsCopied,

  suggestedCollaborators,
  collaborators,
  selectedCollaborator,
  onSelectCollaborator,

  collaboratorForm,
  onCollaboratorChange,
  onCollaboratorBlur,
  submitCollaboratorForm,
}: ShareModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      style={shareModalStyle}
      onRequestClose={() => setIsOpen(false)}
      contentLabel="Share Your Notes"
    >
      <div className="row">
        <h1 className="title">Share Your Notes</h1>
      </div>
      <div className="pageContents">
        <ShareLink
          meeting={meeting}
          isCopied={isCopied}
          setIsCopied={setIsCopied}
        />

        <div
          display-if={collaborators != null && collaborators.length != 0}
          className="subTitle"
        >
          Collaborators:
        </div>
        <div className="collaboratorList">
          {collaborators.map((collaborator, key) => {
            return <CollaboratorRow collaborator={collaborator} key={key} />;
          })}
        </div>

        <CollaboratorForm
          selectedCollaborator={selectedCollaborator}
          collaboratorForm={collaboratorForm}
          onCollaboratorChange={onCollaboratorChange}
          onCollaboratorBlur={onCollaboratorBlur}
          submitCollaboratorForm={submitCollaboratorForm}
        />

        <div
          className="subTitle"
          display-if={
            suggestedCollaborators != null && suggestedCollaborators.length != 0
          }
        >
          On this call:
        </div>
        <div className="collaboratorList">
          {suggestedCollaborators.map((suggestedCollaborator, key) => {
            return (
              <CollaboratorRow
                collaborator={suggestedCollaborator}
                isClickable={true}
                onClick={() => onSelectCollaborator(suggestedCollaborator)}
                key={key}
              />
            );
          })}
        </div>
      </div>
    </Modal>
  );
}
