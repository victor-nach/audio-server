navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
  console.log('user accepted');
  const mediaRecorder = new MediaRecorder(stream);
  console.log(mediaRecorder.state); // inactive
  mediaRecorder.start();
  console.log(mediaRecorder.state); // recording


  // when receiving stream, it's till you stop it that the data becomes available
  setTimeout(() => { mediaRecorder.stop(); }, 5000);

  let chunks = [];

  // this function gets called when the mediaRecorder.stop() is called
  // that is the point at which the data now becomes availble
  mediaRecorder.ondataavailable = (e) => {
    // e.data is the sound itself, we the push this into the chunks array
    console.log(e.data);
    chunks.push(e.data);
    console.log('data is available');
  };

  mediaRecorder.onstop = async () => {
    console.log('recording stop');

    // save the chunks inside a blob
    // new Blob expects an array as first parameter, it's looking for an array of blob parts
    const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });


    const fd = new FormData();
    fd.append('firstName', 'John');
    fd.append('second', 'ooooh');
    // wnen sending a sound blob, the first parameter stands as the field name
    // in the same way you have field names for normal form fields can be accessed with req.file.fieldName
    // the third name is used as the originalFileName `req.file.originalFileName`
    fd.append('soundBlob', blob, 'fileName.wav');

    const response = await fetch('/send_file', {
      method: 'POST',
      // make sure not to add any content type or header
      //   or to stringify json
      body: fd,
    });

    const result = await response.json();

    console.log(result);

    // empty the chunks
    chunks = [];

    const downloadUrl = window.URL.createObjectURL(blob);
    document.write(downloadUrl);
  };
}).catch((err) => {
  console.log('err:', err);
});
