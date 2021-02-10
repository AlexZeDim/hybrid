const video = document.querySelector('video');

if (!navigator.getDisplayMedia && !navigator.mediaDevices.getDisplayMedia) {
    const error = 'Your browser does NOT support the getDisplayMedia API.';
    document.querySelector('h1').innerHTML = error;

    document.querySelector('video').style.display = 'none';
    document.getElementById('btn-start-recording').style.display = 'none';
    document.getElementById('btn-stop-recording').style.display = 'none';
    throw new Error(error);
}

function invokeGetDisplayMedia(success, error) {
    let displaymediastreamconstraints = {
        video: true
    };

    if(navigator.mediaDevices.getDisplayMedia) {
        navigator.mediaDevices.getDisplayMedia(displaymediastreamconstraints).then(success).catch(error);
    }
    else {
        navigator.getDisplayMedia(displaymediastreamconstraints).then(success).catch(error);
    }
}

function captureScreen(callback) {
    invokeGetDisplayMedia(function(screen) {
        addStreamStopListener(screen, function() {
            document.getElementById('btn-stop-recording').click();
        });
        callback(screen);
    }, function(error) {
        console.error(error);
        alert('Unable to capture your screen. Please check console logs.\n' + error);
    });
}

function stopRecordingCallback() {
    video.src = video.srcObject = null;
    video.src = URL.createObjectURL(recorder.getBlob());

    recorder.screen.stop();
    recorder.destroy();
    recorder = null;

    document.getElementById('btn-start-recording').disabled = false;
}

let recorder; // globally accessible

document.getElementById('btn-start-recording').onclick = function() {
    this.disabled = true;
    captureScreen(function(screen) {
        video.srcObject = screen;

        recorder = RecordRTC(screen, {
            // audio, video, canvas, gif
            type: 'video',

            // audio/webm
            // video/mp4
            // video/webm;codecs=vp9
            // video/webm;codecs=vp8
            // video/webm;codecs=h264
            // video/x-matroska;codecs=avc1
            // video/mpeg -- NOT supported by any browser, yet
            // audio/wav
            // audio/ogg  -- ONLY Firefox
            // demo: simple-demos/isTypeSupported.html
            mimeType: 'video/webm',

            // MediaStreamRecorder, StereoAudioRecorder, WebAssemblyRecorder
            // CanvasRecorder, GifRecorder, WhammyRecorder
            recorderType: MediaStreamRecorder,

            // disable logs
            disableLogs: true,

            // get intervals based blobs
            // value in milliseconds
            timeSlice: 1000,

            // requires timeSlice above
            // returns blob via callback function
            ondataavailable: function(blob) {},

            // auto stop recording if camera stops
            checkForInactiveTracks: false,

            // requires timeSlice above
            onTimeStamp: function(timestamp) {},

            // both for audio and video tracks
            bitsPerSecond: 128000,

            // only for audio track
            audioBitsPerSecond: 128000,

            // only for video track
            videoBitsPerSecond: 128000,

            // used by CanvasRecorder and WhammyRecorder
            // it is kind of a "frameRate"
            frameInterval: 90,

            // if you are recording multiple streams into single file
            // this helps you see what is being recorded
            previewStream: function(stream) {},

            // used by CanvasRecorder and WhammyRecorder
            // you can pass {width:640, height: 480} as well
            video: HTMLVideoElement,

            // used by CanvasRecorder and WhammyRecorder
            canvas: {
                width: 1920,
                height: 1080
            },

            // used by StereoAudioRecorder
            // the range 22050 to 96000.
            sampleRate: 96000,

            // used by StereoAudioRecorder
            // the range 22050 to 96000.
            // let us force 16khz recording:
            desiredSampRate: 96000,

            // used by StereoAudioRecorder
            // Legal values are (256, 512, 1024, 2048, 4096, 8192, 16384).
            bufferSize: 16384,

            // used by StereoAudioRecorder
            // 1 or 2
            numberOfAudioChannels: 2,

            // used by WebAssemblyRecorder
            frameRate: 30,

            // used by WebAssemblyRecorder
            bitrate: 128000,

            // used by MultiStreamRecorder - to access HTMLCanvasElement
            elementClass: 'multi-streams-mixer'
        });

        recorder.startRecording();

        // release screen on stopRecording
        recorder.screen = screen;

        document.getElementById('btn-stop-recording').disabled = false;
    });
};

document.getElementById('btn-stop-recording').onclick = function() {
    this.disabled = true;
    recorder.stopRecording(stopRecordingCallback);
};

function addStreamStopListener(stream, callback) {
    stream.addEventListener('ended', function() {
        callback();
        callback = function() {};
    }, false);
    stream.addEventListener('inactive', function() {
        callback();
        callback = function() {};
    }, false);
    stream.getTracks().forEach(function(track) {
        track.addEventListener('ended', function() {
            callback();
            callback = function() {};
        }, false);
        track.addEventListener('inactive', function() {
            callback();
            callback = function() {};
        }, false);
    });
}
