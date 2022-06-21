const videoElem = document.getElementById("video");
const startElem = document.getElementById("start");
const stopElem = document.getElementById("stop");

// Options for getDisplayMedia()
var displayMediaOptions = {
    video: {
        cursor: "always",
        width: 640,
        height: 480
    },
    audio: false
    
};

// Set event listeners for the start and stop buttons
// startElem.addEventListener("click", function (evt) {
//     console.log("aiueo");
//     startCapture();
// }, false);
window.onload = function() {
    console.log("はじまったよん")
    startCapture();
}

stopElem.addEventListener("click", function (evt) {
    console.log("aiueo");
    stopCapture();
}, false);

async function startCapture() {
    try {
        videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    } catch (err) {
        console.error("Error: " + err);
    }
}

function stopCapture(evt) {
    let tracks = videoElem.srcObject.getTracks();

    tracks.forEach(track => track.stop());
    videoElem.srcObject = null;
}
