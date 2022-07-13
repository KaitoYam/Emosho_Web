const videoElem = document.getElementById("video");
const startElem = document.getElementById("start");
const stopElem = document.getElementById("stop");
const test = document.getElementById("test");


// Options for getDisplayMedia()
var displayMediaOptions = {
    video: true,
    audio: false
};

// Set event listeners for the start and stop buttons
startElem.addEventListener("onclick", function (evt) {
    console.log("startボタン押したよん");
    console.log(test)
    startCapture();
}, false);

stopElem.addEventListener("onclick", function (evt) {
    console.log("aiueo");
    stopCapture();
}, false);

test.addEventListener("onclick", function(evt) {
    console.log("testtesttest");
});

async function startCapture(evt) {
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
window.onload = function() {
    console.log("はじまったよん")
    console.log("aaaaaa")
    startCapture();
    console.log(startElem)
    console.log(test)
}

