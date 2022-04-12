import React, { useState } from 'react'
import { Button, Alert } from 'react-bootstrap'

export default function Info() {

  const [show, setShow] = useState(false);

  return (
    <>
      <Alert show={show} variant="primary">
        <Alert.Heading>How do I use this site?</Alert.Heading>
        <h5>Slecting an audiofile</h5>
        <p>
          Select an audiofile from your pc by clicking <b>Browse</b> then click submit, the formats that I currently know works are .wav (some mp3 files works as well).
        </p>
        <h5>Mixing</h5>
        <p>
          The filters are automatically attached to your submitted audiofile. You can adjust them
          before starting to record your selected audiofile. To try them out click on the play button and you can adjust them by moving the sliders in the <b>Audio Controls</b> panel.
        </p>
        <h5>Recording</h5>
        <p>
          To start the recording, simply click <b>Record</b>. When you start the recording the audiofile will play. It will start recording from the
          current position of the track.
          Any changes you make with the filters will be recored, as is the same with any jumps you make
          while listening to the file. If you jump back 5 seconds that jump will be included.
          <br />
          This means the result can be longer than the original file.
          Since no changes are made until you start recording,
          try finding out what parts you want to record, what changes you want to make before you start recording.
        </p>

        <h5>Downloading/Uploading</h5>
        <p>
          To download your recorded file simply click <b>Download</b> at the bottom of this page. If you wish to upload it, then click on <b>Upload</b>.
        </p>
        <hr />
        <i>Note: If you are not satisfied you can just simply refresh the page and start over</i>
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Close
            </Button>
        </div>
      </Alert>

      {!show && <Button style={{ display: "flex" }} onClick={() => setShow(true)}>Help</Button>}
    </>
  )
}