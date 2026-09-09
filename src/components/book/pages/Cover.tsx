import { useState, useEffect } from 'react';

export default function Cover() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      );
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="book-page cover-page">
      <p className="cover-tagline">
        software engineer crafting digital experiences with intention and care
      </p>

      <h1 className="cover-name">
        MUHAMMAD<br />RIZQI
      </h1>

      <div className="cover-bottom-bar">
        <span className="cover-bottom-left">
          jakarta, indonesia — {time}
        </span>
        <span className="cover-bottom-center">
          open for collaborations
        </span>
        <span className="cover-bottom-right">
          SCROLL
        </span>
      </div>
    </div>
  );
}
