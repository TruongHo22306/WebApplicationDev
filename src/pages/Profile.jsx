import { useState } from "react";
import {
  FiMail,
  FiGlobe,
  FiMapPin,
  FiBookOpen,
  FiUsers,
  FiImage,
  FiMessageCircle,
} from "react-icons/fi";
import { FaYoutube, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Uploader from "../components/Uploader";
import FeedPost from "../components/FeedPost";

const coverUrl =
  "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1400&q=80";
const avatarUrl = "https://i.pravatar.cc/160?img=14";

export default function Profile() {
  const socialLinks = [
    {
      name: "YouTube",
      href: "https://youtube.com",
      bg: "bg-[#e9eafe]",
      color: "text-[#5b6cff]",
      icon: <FaYoutube size={18} />,
    },
    {
      name: "GitHub",
      href: "https://github.com",
      bg: "bg-[#e9f6ff]",
      color: "text-[#1f6feb]",
      icon: <FaGithub size={18} />,
    },
    {
      name: "X",
      href: "https://twitter.com",
      bg: "bg-[#ffe9f0]",
      color: "text-[#e04c86]",
      icon: <FaXTwitter size={18} />,
    },
  ];

  const initialPosts = [
    {
      id: "profile-post-1",
      author: "Mathew Anderson",
      avatar: "https://i.pravatar.cc/100?img=14",
      content:
        "Sezawu himov tol re deb lasica ihdefru oze cu acu han ap wa ejo. Sa fa nivefudu kogzapo cap wieddep vod gim hosjov gat fumus luhudnypi so jaf.",
      createdAt: "15 min ago",
      privacy: "Public",
      attachments: {
        imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
        imageName: "mountain-road.jpg",
        fileName: "",
        location: "",
      },
      stats: { likes: 120, comments: 12, shares: 5, reposts: 3 },
    },
    {
      id: "profile-post-2",
      author: "Mathew Anderson",
      avatar: "https://i.pravatar.cc/100?img=14",
      content: "New sketch explorations for a dashboard hero layout.",
      createdAt: "1h ago",
      privacy: "Friends",
      attachments: {
        imageUrl: "",
        imageName: "",
        fileName: "wireframe.pdf",
        location: "NYC Studio",
      },
      stats: { likes: 48, comments: 4, shares: 2, reposts: 1 },
    },
  ];

  const [posts, setPosts] = useState(initialPosts);

  const handleCreatePost = ({ content, privacy, attachments }) => {
    setPosts((prev) => [
      {
        id: `profile-post-${Date.now()}`,
        author: "You",
        avatar: "https://i.pravatar.cc/100?img=7",
        content,
        createdAt: "Just now",
        privacy,
        attachments,
        stats: { likes: 0, comments: 0, shares: 0, reposts: 0 },
      },
      ...prev,
    ]);
  };

  return (
    <div className="min-h-screen bg-[#f5f6fb] text-neutral-900">
      <div className="max-w-6xl mx-auto py-8 px-6 space-y-6">

        {/* COVER & HEADER */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="h-56 bg-gradient-to-r from-[#c6b5ff] to-[#9db8ff] relative">
            <img
              src={coverUrl}
              alt="Cover"
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute left-1/2 -bottom-14 -translate-x-1/2">
              <img
                src={avatarUrl}
                alt="Avatar"
                className="w-28 h-28 rounded-full border-4 border-white shadow-md"
              />
            </div>
          </div>

          <div className="pt-16 pb-8 px-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex flex-col items-center text-center space-y-1">
                <h1 className="text-2xl font-semibold">Mathew Anderson</h1>
                <p className="text-sm text-neutral-500">Designer</p>
              </div>

              <div className="flex items-center justify-center gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-10 h-10 rounded-full ${link.bg} ${link.color} flex items-center justify-center hover:opacity-80 transition`}
                    title={link.name}
                  >
                    {link.icon}
                  </a>
                ))}
                <button className="px-4 py-2 rounded-full bg-[#5b6cff] text-white font-semibold hover:opacity-90">
                  Add to Story
                </button>
              </div>
            </div>

            {/* STATS */}
            <div className="mt-6 grid grid-cols-3 md:grid-cols-6 gap-4 text-center">
              <Stat label="Posts" value="938" />
              <Stat label="Followers" value="3,586" />
              <Stat label="Following" value="2,659" />
              <Stat label="Profile" value="Profile" active />
              <Stat label="Followers" value="Followers" />
              <Stat label="Friends" value="Friends" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT: INTRO */}
          <div className="bg-white rounded-2xl shadow-sm p-6 h-fit space-y-4">
            <h3 className="text-lg font-semibold">Introduction</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Hello, I am Mathew Anderson. I love making websites and graphics. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <div className="space-y-3 text-sm text-neutral-700">
              <InfoRow icon={<FiBookOpen />} text="Sir, P P Institute Of Science" />
              <InfoRow icon={<FiMail />} text="xyzjonathan@gmail.com" />
              <InfoRow icon={<FiGlobe />} text="www.xyz.com" />
              <InfoRow icon={<FiMapPin />} text="New York, USA - 100001" />
            </div>
          </div>

          {/* RIGHT: COMPOSER + FEED */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
              <Uploader onSend={handleCreatePost} />
            </div>

            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl shadow-sm p-3">
                <FeedPost
                  author={post.author}
                  avatar={post.avatar}
                  content={post.content}
                  createdAt={post.createdAt}
                  privacy={post.privacy}
                  attachments={post.attachments}
                  stats={post.stats}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, active }) {
  return (
    <div
      className={`rounded-xl px-3 py-3 ${
        active ? "bg-[#eef0ff] text-[#5b6cff] font-semibold shadow-inner" : "bg-neutral-50"
      }`}
    >
      <p className="text-lg">{value}</p>
      <p className="text-xs text-neutral-500 mt-1">{label}</p>
    </div>
  );
}

function InfoRow({ icon, text }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[#5b6cff]">{icon}</span>
      <span>{text}</span>
    </div>
  );
}
