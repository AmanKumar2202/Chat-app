import React, { useState } from 'react';

const VoiceUploader = ({ onTranscribe }) => {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [chunks, setChunks] = useState([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);

    recorder.ondataavailable = (e) => {
      setChunks(prev => [...prev, e.data]);
    };

    recorder.onstop = async () => {
      const blob = new Blob(chunks, { type: 'audio/webm' });
      const formData = new FormData();
      formData.append('audio', blob, 'voice.webm');

      try {
        const res = await fetch('/api/transcribe', {
          method: 'POST',
          body: formData
        });
        const data = await res.json();
        onTranscribe(data.text);
      } catch (err) {
        console.error('Upload failed:', err);
      }

      setChunks([]);
    };

    recorder.start();
    setMediaRecorder(recorder);
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    setRecording(false);
  };

  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={recording ? stopRecording : startRecording}
        className={`px-4 py-2 rounded-lg text-white ${
          recording ? 'bg-red-500' : 'bg-blue-500'
        }`}
      >
        {recording ? 'Stop' : 'Record Voice'}
      </button>
    </div>
  );
};

export default VoiceUploader;
