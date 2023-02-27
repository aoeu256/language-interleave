//
let subsUrl = ytInitialPlayerResponse.captions.playerCaptionsTracklistRenderer.captionTracks[0].baseUrl;
let subs = await (await fetch(subsUrl)).text();
let xml = new DOMParser().parseFromString(subs,"text/xml");
let textNodes = [...xml.getElementsByTagName('text')];

let time2Node = {}
let subsText = textNodes.map(x => x.textContent).join("\n").replaceAll('&#39;',"'");
//textNodes.map(x => for(let i=0; i<x.getAttribute("dur"); i+=0.02) time2Node[i+x.getAttribute("start")] = x

let curtrack = 0;

//
ytplayer = document.getElementById("movie_player");
ytplayer.getCurrentTime();

var msg = new SpeechSynthesisUtterance();
msg.text = textNodes[0].textContent;
msg.rate = ytplayer.getPlaybackRate();
window.speechSynthesis.speak(msg);

setInterval(function() {
  var endtime = textNodes[curtrack].getAttribute("dur") + textNodes[curtrack].getAttribute("start");
  if（ytplayer.getCurrentTime() >= endtime) {
    curtrack += 1;
    
  }
}, 100）
