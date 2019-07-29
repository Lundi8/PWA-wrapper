console.log('LOAD VIDEOPLAYER');
(() => {
  let video = document.querySelector('video');
  // console.log(video);

  let isPlaying = video.paused;
  let isVolume = video.volume;
  let isFullscreen = false;
  let currentTime = video.currentTime;
  let watchCurrentTime;
  let l = window.innerWidth;
  let h = window.innerHeight;
  let hVideo = video.getBoundingClientRect().height;
  let ratio = l / h;

  let videoControlsWrapper = document.getElementById('videoControlsWrapper');
  let ctrPlay = document.getElementById('ctrlPlay');
  let ctrVolume = document.getElementById('ctrlVolume');
  let ctrlFullscreen = document.getElementById('ctrlFullscreen');
  let progressBarIn = document.getElementById('progressBarIn');
  let progressBarOut = document.getElementById('progressBarOut');
  // let porgressBarDot = document.getElementById('porgressBarDot');

  //
  //
  // INIT VIDEO AND ICON
  (() => {
    if (video.paused) {
      ctrPlay.src = './src/svg/baseline_play_arrow_white_18dp.png';
    } else {
      ctrPlay.src = './src/svg/baseline_pause_white_18dp.png';
    }

    if (video.muted) {
      ctrVolume.src = './src/svg/baseline_volume_off_white_18dp.png';
    } else {
      ctrVolume.src = './src/svg/baseline_volume_up_white_18dp.png';
    }
  })();

  //
  //
  // INIT CONTROL BAR
  let setWrapperPostion = ratio => {
    hVideo = video.getBoundingClientRect().height;

    if (ratio > 1.6) {
      videoControlsWrapper.className = 'videoControlsWrapperIn';
      videoControlsWrapper.style.marginTop = 0;
    } else {
      videoControlsWrapper.className = 'videoControlsWrapperOut';
      let middle =
        (window.innerHeight - hVideo) / 2 -
        videoControlsWrapper.getBoundingClientRect().height / 2;
      videoControlsWrapper.style.marginTop = `${middle}px`;
    }
  };
  setWrapperPostion(ratio);

  let myTimeOut;
  let setWrapperOpacity = ratio => {
    if (ratio > 1.6) {
      videoControlsWrapper.style.opacity = 1;
      myTimeOut = setTimeout(() => {
        videoControlsWrapper.style.opacity = 0;
      }, 4000);
    } else {
      clearTimeout(myTimeOut);
      videoControlsWrapper.style.opacity = 1;
    }
  };
  setWrapperOpacity(ratio);

  let setPorgressBar = () => {
    currentTime = (video.currentTime * progressBarOut.clientWidth) / video.duration;
    progressBarIn.style.width = `${currentTime}px`;
    let posY = currentTime > 8 ? currentTime : 8;
    progressBarDot.style.left = `${posY - 8}px`;
  };

  //
  //
  // VIDEO LISTENER
  video.addEventListener('loadeddata', () => {
    setWrapperPostion(ratio);
  });

  video.addEventListener('click', () => {
    clearTimeout(myTimeOut);
    setWrapperOpacity(ratio);
  });
  video.addEventListener('mousemove', () => {
    console.log('mousemove')
    clearTimeout(myTimeOut);
    setWrapperOpacity(ratio);
  });

  video.addEventListener('play', e => {
    ctrPlay.src = './src/svg/baseline_pause_white_18dp.png';
    watchCurrentTime = setInterval(setPorgressBar, 500);
  });

  video.addEventListener('pause', () => {
    ctrPlay.src = './src/svg/baseline_play_arrow_white_18dp.png';
    clearInterval(watchCurrentTime);
  });

  video.addEventListener('volumechange', e => {
    if (e.target.volume) {
      ctrVolume.src = './src/svg/baseline_volume_up_white_18dp.png';
    } else {
      ctrVolume.src = './src/svg/baseline_volume_off_white_18dp.png';
    }
  });

  //
  //
  // VIDEO CONTROLLERS
  ctrPlay.addEventListener('click', () => {
    isPlaying = isPlaying ? false : true;
    if (!isPlaying) {
      video.play();
    } else {
      video.pause();
    }
  });

  ctrVolume.addEventListener('click', () => {
    isVolume = isVolume ? false : true;
    if (isVolume) {
      video.volume = 1;
    } else {
      video.volume = 0;
    }
  });

  ctrlFullscreen.addEventListener('click', () => {
    isFullscreen = isFullscreen ? false : true;
    if (isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
      ctrlFullscreen.src = './src/svg/baseline_fullscreen_exit_white_18dp.png';
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      ctrlFullscreen.src = './src/svg/baseline_fullscreen_white_18dp.png';
    }
  });

  window.addEventListener('resize', function(e) {
    l = window.innerWidth;
    h = window.innerHeight;
    ratio = l / h;
    setWrapperPostion(ratio);
    setWrapperOpacity(ratio);
  });
})();

(() => {
  window.addEventListener('load', () => {
    let downloadProgress = document.getElementById('downloadContainer');
    downloadProgress.style.display = 'block';

    let setDownloadProgressOn = (loaded, total) => {
      downloadProgress.children[0].innerText = `Downloading... ${loaded} / ${total} ko`;
    };
    let setDownloadProgressOff = () => {
      downloadProgress.children[0].innerText = '';
      downloadProgress.style.display = 'none';
    };

    const video = { name: 'PROD663_MASTER_V1' };

    // Create an instance of a db object for us to store our database in
    let db;

    function init() {
      // Loop through the video names one by one
      let objectStore = db.transaction('videos_os').objectStore('videos_os');
      let request = objectStore.get(video.name);
      request.onsuccess = function() {
        // If the result exists in the database (is not undefined)
        if (request.result) {
          // Grab the videos from IDB and display them using displayVideo()

          console.log('fetching videos from IDB', request.result.mp4, request.result.name);
          setDownloadProgressOff();

          displayVideo(request.result.mp4, video.name);
        } else {
          // Fetch the videos from the network
          console.log('fetching videos from network');

          fetchVideoFromNetwork(video);
        }
      };
    }

    // Define the fetchVideoFromNetwork() function
    function fetchVideoFromNetwork(video) {
      // Fetch the MP4 and WebM versions of the video using the fetch() function,
      // then expose their response bodies as blobs
      // let mp4Blob = fetch('src/' + video.name + '.mp4').then(response => response.blob());
      let mp4Blob = fetch('src/' + video.name + '.mp4')
        .then(response => {
          if (!response.ok) {
            throw Error(response.status + ' ' + response.statusText);
          }

          if (!response.body) {
            throw Error('ReadableStream not yet supported in this browser.');
          }

          const contentLength = response.headers.get('content-length');
          if (!contentLength) {
            throw Error('Content-Length response header unavailable');
          }

          const total = parseInt(contentLength, 10);
          let loaded = 0;

          return new Response(
            new ReadableStream({
              start(controller) {
                const reader = response.body.getReader();

                read();
                function read() {
                  reader
                    .read()
                    .then(({ done, value }) => {
                      if (done) {
                        controller.close();
                        return;
                      }
                      loaded += value.byteLength;
                      // console.log({ loaded, total });
                      setDownloadProgressOn(loaded, total)
                      controller.enqueue(value);
                      read();
                    })
                    .catch(error => {
                      console.error(error);
                      controller.error(error);
                    });
                }
              },
            })
          );
        })
        .then(response => response.blob());

      // Only run the next code when both promises have fulfilled
      Promise.all([mp4Blob]).then(function(values) {
        // display the video fetched from the network with displayVideo()
        console.log('>>>', values);
        setDownloadProgressOff();
        displayVideo(values[0], video.name);

        // store it in the IDB using storeVideo()
        storeVideo(values[0], video.name);
      });
    }

    // Define the storeVideo() function
    function storeVideo(mp4Blob, name) {
      // Open transaction, get object store; make it a readwrite so we can write to the IDB
      let objectStore = db.transaction(['videos_os'], 'readwrite').objectStore('videos_os');
      // Create a record to add to the IDB
      let record = {
        mp4: mp4Blob,
        // webm: webmBlob,
        name: name,
      };

      // Add the record to the IDB using add()
      let request = objectStore.add(record);

      request.onsuccess = function() {
        console.log('Record addition attempt finished');
      };

      request.onerror = function() {
        console.log(request.error);
      };
    }

    // Define the displayVideo() function
    function displayVideo(mp4Blob, title) {
      // Create object URLs out of the blobs
      let mp4URL = URL.createObjectURL(mp4Blob);
      // let webmURL = URL.createObjectURL(webmBlob);

      let video = document.querySelector('video');
      let source = document.createElement('source');
      source.src = mp4URL;
      source.type = 'video/mp4';
      video.appendChild(source);
    }

    // Open our database; it is created if it doesn't already exist
    // (see onupgradeneeded below)
    let request = window.indexedDB.open('videos_db', 1);

    // onerror handler signifies that the database didn't open successfully
    request.onerror = function() {
      console.log('Database failed to open');
    };

    // onsuccess handler signifies that the database opened successfully
    request.onsuccess = function() {
      // Store the opened database object in the db variable. This is used a lot below
      db = request.result;
      console.log('Database opened succesfully');
      init();
    };

    // Setup the database tables if this has not already been done
    request.onupgradeneeded = function(e) {
      // Grab a reference to the opened database
      let db = e.target.result;

      // Create an objectStore to store our videos in (basically like a single table)
      // including a auto-incrementing key
      let objectStore = db.createObjectStore('videos_os', { keyPath: 'name' });

      // Define what data items the objectStore will contain
      objectStore.createIndex('mp4', 'mp4', { unique: false });

      console.log('Database setup complete');
    };
  });
})();
