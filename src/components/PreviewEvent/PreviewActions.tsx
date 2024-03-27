import { Button } from '@material-ui/core'

import { ConferenceStatus } from '../../shared/entities'

export interface PreviewActionsProps {
  status: ConferenceStatus
  conferenceId: string
  onOpen: (conferenceId: string) => void
  onPause: (conferenceId: string) => void
  onClose: (conferenceId: string) => void
  onEnter: (conferenceId: string) => void
  onSynchronize: (conferenceId: string) => void
}

export default function PreviewActions({
  status,
  conferenceId,
  onOpen,
  onPause,
  onClose,
  onEnter,
  onSynchronize,
}: PreviewActionsProps): JSX.Element {
  const getCommonButtons = () => (
    <Button
      data-testid="upload-attendees-conference-button"
      onClick={() => onSynchronize(conferenceId)}
    >
      Upload attendees
    </Button>
  )

  if (status === 'created') {
    return (
      <>
        <Button
          data-testid="open-conference-button"
          onClick={() => onOpen(conferenceId)}
        >
          Open
        </Button>
        {getCommonButtons}
      </>
    )
  }

  if (status === 'opened') {
    return (
      <>
        <Button
          data-testid="pause-conference-button"
          onClick={() => onPause(conferenceId)}
        >
          Pause
        </Button>
        <Button
          data-testid="close-conference-button"
          onClick={() => onClose(conferenceId)}
        >
          Close
        </Button>
        <Button
          data-testid="enter-conference-button"
          onClick={() => onEnter(conferenceId)}
        >
          Go!
        </Button>
        {getCommonButtons}
      </>
    )
  }

  if (status === 'paused') {
    return (
      <>
        <Button
          data-testid="unpause-conference-button"
          onClick={() => onOpen(conferenceId)}
        >
          Unpause
        </Button>
        {getCommonButtons}
      </>
    )
  }

  return <></>
}
