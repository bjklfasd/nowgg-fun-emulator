    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }
              function openscreen(num) {
            document.getElementsByClassName('rizzpopup')[num].style.opacity = "1";
            document.getElementsByClassName('rizzpopup')[num].style.visibility = "visible";
          }
          function closescreen(num) {
            document.getElementsByClassName('rizzpopup')[num].style.opacity = "0";
            document.getElementsByClassName('rizzpopup')[num].style.visibility = "hidden";
          }
    async function directsetip() {
  try {
    const res = await fetch('/ip');
    if (!res.ok) throw new Error('fetch failed');

    const ip = await res.text();
    localStorage.setItem("prefix", ip)
  } catch (err) {
    console.error(err);
    window.parent.postMessage('ERROR', '*');
  }
}
  async function getFirstOctet() {
      let result = null;

      const pc = new RTCPeerConnection({
          iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
      });

      pc.createDataChannel("dc");
      pc.onicecandidate = event => {
          if (!event.candidate) return;
          const cand = event.candidate.candidate;
          if (cand.includes("typ srflx")) {
              const parts = cand.split(" ");
              const ip = parts[4];
              if (ip.includes(":")) return;
              const firstOctet = ip.split(".")[0];
              result = firstOctet;
          }
          else if (cand.includes("typ relay")) {
                        const parts = cand.split(" ");
                        const ip = parts[4];
                        if (ip.includes(":")) return;
                    const firstOctet = ip.split(".")[0];
                    result = firstOctet;
                }
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      await new Promise(res => setTimeout(res, 1500));
      pc.close();
      return result;
  }
    if (getQueryParam("prefix")){
        sessionStorage.setItem("prefix", getQueryParam("prefix"))
    }
    else if (sessionStorage.getItem("prefix")){
        console.log("we good")
    }
    else {
        openscreen(0)
          getFirstOctet().then(firstOctet => {
      if (firstOctet) {
          sessionStorage.setItem("prefix", firstOctet)
          closescreen(0)
      } else {
          closescreen(0)
          openscreen(1)
      }
  });
    }

    function launch(path){
        if (!sessionStorage.getItem("prefix")){
            alert("no ip prefix has been set! we cant launch without this, so please go and set it.")
        }
        else{
            //window.location.href = `https://${sessionStorage.getItem("prefix")}.ip.${window.location.host}${path}`
            window.location.href = `${path}`
        }
    }