import { compose, withHandlers, withProps, withState } from 'recompose';
import { withRouter } from 'react-router';
import withData from 'src/utils/WithData';
import { withTetraUser } from 'src/utils/Auth';
import {
  appearsValidPhoneNumber,
  formatNationalPhoneNumber,
  formatPhoneNumber,
} from 'src/utils/PhoneUtil';
import { getEmailError } from 'src/utils/FormValidators';
import {
  addMeetingCollaborator,
  getMeetingCollaborators,
  getMeetingParticipants,
} from 'src/services/MeetingService';
import {
  formatEmailErrors,
  formatPhoneNumberErrors,
  formatNonFieldErrors,
} from 'src/utils/ResponseErrorFormatters';
import ShareModal from './render';

export default compose(
  // Create a custom collaborator form where the value is either an email or a phone number
  withState('collaboratorForm', 'setCollaboratorForm', {
    submitted: false,
    value: '',
    error: null,
    isLoading: false,
  }),
  // Create state to store all collaborators, suggestedCollaborators and the selected collaborator
  withState('collaborators', 'setCollaborators', []),
  withState('suggestedCollaborators', 'setSuggestedCollaborators', []),
  withState('selectedCollaborator', 'setSelectedCollaborator', null),
  // Get the meeting participants for collaborator recomendations
  withRouter,
  withTetraUser(),
  withData(
    ({
      tetraUser,
      setCollaborators,
      setSuggestedCollaborators,
      match: { params: { code } },
    }) => {
      return Promise.all([
        getMeetingCollaborators(code),
        getMeetingParticipants(code),
      ]).then(([collaborators, participants]) => {
        const suggestedCollaborators = participants.filter(participant => {
          // Find any collaborator either a matching email address or phone number
          var matchingCollaborator = collaborators.find(collaborator => {
            const suggestEmail =
              participant.email == null ||
              participant.email != collaborator.email;
            const suggestPhone =
              participant.phoneNumber == null ||
              participant.phoneNumber != collaborator.phoneNumber;
            return !suggestEmail || !suggestPhone;
          });

          // If no collaborators match, suggest this participant to be a collaborator
          const isSelf =
            participant.email == tetraUser.email ||
            participant.phoneNumber == tetraUser.phoneNumber;
          return matchingCollaborator == null && !isSelf;
        });

        setSuggestedCollaborators(suggestedCollaborators);
        setCollaborators(collaborators);
      });
    }
  ),
  withProps(
    ({
      meeting,
      setCollaboratorForm,
      setCollaborators,
      setSelectedCollaborator,
    }) => ({
      addCollaborator: ({
        email,
        phoneNumber,
        collaboratorForm,
        collaborators,
      }) => {
        setCollaboratorForm({ ...collaboratorForm, isLoading: true });

        addMeetingCollaborator({ code: meeting.code, email, phoneNumber })
          .then(collaborator => {
            // Update collaborators
            collaborators.unshift(collaborator);
            setCollaborators(collaborators);

            // Unset selected participant
            setSelectedCollaborator(null);

            // Unset the collaborator form
            setCollaboratorForm({
              submitted: true,
              value: '',
              error: null,
              isLoading: false,
            });
          })
          .catch(e => {
            let formErrorMessage =
              'There was an error adding this collaborator';

            if (e.response && e.response.data) {
              const errors = e.response.data;

              if (errors.email) {
                formErrorMessage = formatEmailErrors(errors.email);
              }

              if (errors.phone_number) {
                formErrorMessage = formatPhoneNumberErrors(errors.phone_number);
              }

              if (errors.non_field_errors) {
                formErrorMessage = formatNonFieldErrors(
                  errors.non_field_errors
                );
              }
            }

            setCollaboratorForm({
              ...collaboratorForm,
              isLoading: false,
              error: formErrorMessage,
            });
          });
      },
    })
  ),
  // Create form handlers
  withHandlers({
    onCollaboratorChange: ({
      selectedCollaborator,
      setSelectedCollaborator,
      suggestedCollaborators,
      setSuggestedCollaborators,
      collaboratorForm,
      setCollaboratorForm,
    }) => evt => {
      // Update form with as you type phone number formatting
      if (appearsValidPhoneNumber(evt.value)) {
        setCollaboratorForm({
          ...collaboratorForm,
          value: formatNationalPhoneNumber(evt.value),
        });
      } else {
        setCollaboratorForm({
          ...collaboratorForm,
          value: evt.value,
        });
      }

      // Update selected collaborator
      const newlySelectedCollaborator = suggestedCollaborators.find(
        suggestedCollaborator => {
          const matchingEmail = evt.value == suggestedCollaborator.email;
          const matchingPhone =
            appearsValidPhoneNumber(evt.value) &&
            formatPhoneNumber(evt.value) == suggestedCollaborator.phoneNumber;
          return matchingEmail || matchingPhone;
        }
      );

      // Select collaborator
      const remainingSuggestedCollaborators = suggestedCollaborators.filter(
        suggestedCollaborator =>
          suggestedCollaborator != newlySelectedCollaborator
      );
      if (selectedCollaborator != null) {
        remainingSuggestedCollaborators.unshift(selectedCollaborator);
      }
      setSelectedCollaborator(newlySelectedCollaborator);
      setSuggestedCollaborators(remainingSuggestedCollaborators);

      if (newlySelectedCollaborator != null) {
        setCollaboratorForm({
          submitted: false,
          value: newlySelectedCollaborator.getUniqueName(),
          error: null,
          isLoading: null,
        });
      }
    },
    onCollaboratorBlur: ({ collaboratorForm, setCollaboratorForm }) => () => {
      const emailOrPhoneNumber = collaboratorForm.value;
      if (
        !appearsValidPhoneNumber(emailOrPhoneNumber) &&
        getEmailError(emailOrPhoneNumber) != null
      ) {
        setCollaboratorForm({
          ...collaboratorForm,
          error: 'Expected an email address or a phone number.',
        });
      }
    },
    submitCollaboratorForm: ({
      collaborators,
      collaboratorForm,
      selectedCollaborator,
      addCollaborator,
    }) => () => {
      const emailOrPhoneNumber =
        selectedCollaborator != null
          ? selectedCollaborator.getUniqueName()
          : collaboratorForm.value;
      var email = null;
      var phoneNumber = null;
      if (appearsValidPhoneNumber(emailOrPhoneNumber)) {
        phoneNumber = formatPhoneNumber(emailOrPhoneNumber);
      } else {
        email = emailOrPhoneNumber;
      }

      addCollaborator({
        email,
        phoneNumber,
        collaboratorForm,
        collaborators,
      });
    },
    onSelectCollaborator: ({
      suggestedCollaborators,
      setSuggestedCollaborators,
      collaborators,
      collaboratorForm,
      addCollaborator,
    }) => selectedCollaborator => {
      // Select collaborator
      const remainingSuggestedCollaborators = suggestedCollaborators.filter(
        suggestedCollaborator => suggestedCollaborator != selectedCollaborator
      );
      setSuggestedCollaborators(remainingSuggestedCollaborators);

      addCollaborator({
        email: selectedCollaborator.email,
        phoneNumber: selectedCollaborator.phoneNumber,
        collaboratorForm,
        collaborators,
      });
    },
  }),
  // Reset modal state on close
  withState('isCopied', 'setIsCopied', false),
  withProps(
    ({
      suggestedCollaborators,
      setSuggestedCollaborators,
      selectedCollaborator,
      setSelectedCollaborator,
      setCollaboratorForm,
      isOpen,
      setIsOpen,
      setIsCopied,
    }) => ({
      setIsOpen: shouldBeOpen => {
        if (isOpen) {
          // Reset state of copy button
          setIsCopied(false);

          // Reset the suggested collaborator list and the collaborator
          if (selectedCollaborator != null) {
            suggestedCollaborators.push(selectedCollaborator);
            setSelectedCollaborator(null);
            setSuggestedCollaborators(suggestedCollaborators);
          }

          // Reset form state
          setCollaboratorForm({
            submitted: false,
            value: '',
            error: null,
            isLoading: null,
          });
        }

        setIsOpen(shouldBeOpen);
      },
    })
  )
)(ShareModal);
