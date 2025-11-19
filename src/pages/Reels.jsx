import React, { useRef, useEffect } from "react";
import ReelsActions from "../components/ReelsActions";

export default function Reels({ darkMode }) {
  const videoRefs = useRef([]);

  // Auto play / pause when scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) video.play().catch(() => {});
          else video.pause();
        });
      },
      { threshold: 0.6 }
    );

    videoRefs.current.forEach((v) => v && observer.observe(v));

    return () => observer.disconnect();
  }, []);

  const reelsData = [
    {
      id: 1,
      src: "https://videos.pexels.com/video-files/854260/854260-hd_1920_1080_30fps.mp4",
      username: "alex.morgan",
      caption: "Morning vibes 🌅",
      likes: 12400,
      comments: 521,
      shares: 320,
    },
    {
      id: 2,
      src: "https://videos.pexels.com/video-files/2795741/2795741-hd_1920_1080_30fps.mp4",
      username: "travel.earth",
      caption: "Vietnam is beautiful 🇻🇳",
      likes: 31100,
      comments: 1204,
      shares: 980,
    },
    {
      id: 3,
      src: "https://videos.pexels.com/video-files/853427/853427-hd_1920_1080_30fps.mp4",
      username: "foodie",
      caption: "Best burger ever 🤤🍔",
      likes: 8932,
      comments: 212,
      shares: 140,
    },
  ];

  return (
    <div
      className={
        "flex w-full min-h-screen justify-center py-5 transition-all " +
        (darkMode ? "bg-black text-white" : "bg-[#f7f5f4] text-black")
      }
    >
      <div className="w-[500px] space-y-14">

        {reelsData.map((reel, index) => (
          <div
            key={reel.id}
            className="relative rounded-xl overflow-hidden shadow-xl 
                       bg-black mx-auto h-[700px] flex"
          >
            {/* VIDEO */}
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={reel.src}
              className="w-full h-full object-cover"
              loop
              muted
              playsInline
            ></video>

            {/* Floating actions (like, comment, share...) */}
            <ReelsActions
              likes={reel.likes}
              comments={reel.comments}
              shares={reel.shares}
            />

            {/* BOTTOM INFO */}
            <div className="absolute bottom-5 left-5 text-white drop-shadow-lg">
              <h3 className="font-semibold">@{reel.username}</h3>
              <p className="text-sm opacity-90">{reel.caption}</p>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}
