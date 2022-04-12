import React, { Component } from 'react';

class About extends Component {
    render() {
        return (
            <div style={{ maxWidth: "800px", margin: "0 auto", border: "1px solid #ececec", borderRadius: "10px", padding: "20px" }}>
                <h2>About This Site</h2>
                <hr />
                <h4>How to use this site.</h4>
                <p>To edit an audio file you go to the page <b>Submit</b>. <br />
                For more information while you are on that page you can click the <b>Help </b>
                 button in the top left corner.
                </p>
                <h4>Mixing audio</h4>
                <p>To start of, select an audiofile from your computer by clicking on <b>Browse</b> <i>(preferably select a wav file, some mp3 files do not work) </i>
                 and press submit.
                Once you have done so you can listen to your audio file by clicking on the play button in the audio player at the top. Now you can change certain
                effects by adjusting the sliders. This allows you to try and find out what changes you would like to make
                before actually starting to record. <br />
                </p>
                <div style={{ margin: "0 auto", border: "1px solid #ececec", borderRadius: "10px", maxWidth: "300px", textAlign: "left" }}>
                    <h5 style={{ textAlign: "center" }}>You can change the following</h5>
                    <ul>
                        <li>Volume</li>
                        <li>Stereo Panning</li>
                        <li>Base Filter (Lowshelf filter)</li>
                        <li>Treble (Highshelf Filter)</li>
                    </ul>
                </div>
                <h4>Recording</h4>
                <p>
                When you know what filters you want to apply and edit you press on <b>Record</b>.
                This will start the recording, it will start recording from the time that you are currently at in the audio player.
                Any changes you make to the effects will be included, you can adjust the filters while you are recording. What you hear is what you get. <br/>
                So if you decide to pause the audio before it finishes this will be included in the result. <br/>
                This allows you to jump and pause if you would like to include this in your result. <br/>
                To stop the recording simply click the same button that you used to start the recording. Or wait for the audio to finish.
                When it reaches the end it will automatically stop the recording.
                </p>
                <h4>Uploading/Downloading</h4>
                <p>
                Once you have have stopped the recording (or it has finished) the result will be presented in the audio player at the bottom.
                Now you can listen to it, if you wish to download the result then click <b>Download</b>. <br/>
                If you wish to upload the result then enter a filename. You will be redirected to the page where your submitted audio file is.
                </p>
                <h4>Toplist/Voting</h4>
                <p>
                To see the 5 highest rated audio files go to the page <b>Toplist</b>.
                To listen to any of them simply click <b>Listen</b>.
                To vote on an audio file you click either <b>Like</b> or <b>Dislike</b>.
                You can only on one audio file once every 24 hours. 
                </p>
            </div>
        );
    }
}

export default About;