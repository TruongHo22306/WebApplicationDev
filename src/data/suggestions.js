import actor1 from "../assets/actor1.png";
import actor2 from "../assets/actor2.png";
import actor3 from "../assets/actor3.jpg";
import actor4 from "../assets/actor4.jpg";
import actor5 from "../assets/actor5.jpg";
import bgSU3 from "../assets/bgSU3.png";
import barcaWallpaper from "../assets/wp15305517-barca-2025-wallpapers.jpg";
import xedua1 from "../assets/xedua1.jpg";
import xedua2 from "../assets/xedua2.jpg";
import xedua3 from "../assets/xedua3.jpg";
import bs1 from "../assets/bs1.jpg";
import bs2 from "../assets/bs2.jpg";
import bs3 from "../assets/bs3.jpg";
import bs4 from "../assets/bs4.jpg";
import bs5 from "../assets/bs5.jpg";

export const suggestions = [
  {
    name: "Brancaccio David",
    location: "California",
    avatar: actor1,
    stats: { posts: 3, followers: 210, following: 197 },
    posts: [
      {
        id: "thy-1",
        content: "Testing new brush packs for neon lettering.",
        createdAt: "2h ago",
        privacy: "Public",
        pinned: true,
        attachments: {
          imageUrl:
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
          imageName: "neon-letter.jpg",
          fileName: "",
          location: "California",
        },
        stats: { likes: 128, comments: 9, shares: 3, reposts: 1 },
      },
      {
        id: "thy-2",
        content: "Quick teaser for tomorrow's livestream.",
        createdAt: "Yesterday",
        privacy: "Followers",
        pinned: false,
        attachments: {
          imageUrl: "",
          imageName: "",
          fileName: "",
          location: "",
        },
        stats: { likes: 76, comments: 4, shares: 1, reposts: 0 },
      },
       {
        id: "thy-3",
        content: "Did you check out my latest design tutorial?",
        createdAt: "Yesterday",
        privacy: "Followers",
        pinned: false,
        attachments: {
          imageUrl: barcaWallpaper,
          imageName: "",
          fileName: "",
          location: "Ele Volke",
        },
        stats: { likes: 76, comments: 4, shares: 1, reposts: 0 },
      },
    ],
  },
  {
    name: "Chris Hamilton",
    location: "Sibiu, Romania",
    avatar: actor2,
    stats: { posts: 12, followers: 12_300, following: 480 },
    posts: [
      {
        id: "anghelina-1",
        content: "City light studies from the old town square.",
        createdAt: "1d ago",
        privacy: "Public",
        pinned: true,
        attachments: {
          imageUrl:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
          imageName: "old-town.jpg",
          fileName: "",
          location: "Sibiu",
        },
        stats: { likes: 412, comments: 38, shares: 12, reposts: 6 },
      },
      {
        id: "anghelina-2",
        content: "Palette test for a new mural series.",
        createdAt: "3d ago",
        privacy: "Friends",
        pinned: false,
        attachments: {
          imageUrl: bgSU3,
          imageName: "palette.jpg",
          fileName: "",
          location: "",
        },
        stats: { likes: 289, comments: 21, shares: 4, reposts: 2 },
      },
    ],
  },
  {
    name: "Ho Ngoc Ha",
    location: "Ho Chi Minh City, Vietnam",
    avatar: actor3,
    stats: { posts: 45, followers: 8900, following: 340 },
    posts: [
      {
        id: "mais-1",
        content: "Wireframes for a travel booking flow.",
        createdAt: "4h ago",
        privacy: "Public",
        pinned: true,
        attachments: {
          imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
          imageName: "travel-flow.jpg",
          fileName: "",
          location: "Kyiv",
        },
        stats: { likes: 210, comments: 12, shares: 3, reposts: 1 },
      },
      {
        id: "mais-2",
        content: "Preparing assets for next week's client review.",
        createdAt: "2d ago",
        privacy: "Followers",
        pinned: false,
        attachments: {
          imageUrl: "",
          imageName: "",
          fileName: "review-notes.pdf",
          location: "",
        },
        stats: { likes: 95, comments: 6, shares: 1, reposts: 0 },
      },
      {
        id: "mais-3",
        content: "Studio run-through before the live performance.",
        createdAt: "3d ago",
        privacy: "Public",
        pinned: false,
        attachments: {
          imageUrl:
            "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
          imageName: "studio-runthrough.jpg",
          fileName: "",
          location: "Ho Chi Minh City",
        },
        stats: { likes: 420, comments: 38, shares: 12, reposts: 5 },
      },
      {
        id: "mais-4",
        content: "New photoset from the latest brand shoot.",
        createdAt: "5d ago",
        privacy: "Public",
        pinned: false,
        attachments: {
          imageUrl:
            "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80",
          imageName: "brand-shoot.jpg",
          fileName: "",
          location: "District 1",
        },
        stats: { likes: 680, comments: 54, shares: 21, reposts: 9 },
      },
      {
        id: "mais-5",
        content: "Short recap from last night's event.",
        createdAt: "1w ago",
        privacy: "Followers",
        pinned: false,
        attachments: {
          imageUrl:
            "src/assets/bgSU2.png",
          imageName: "event-recap.jpg",
          fileName: "",
          location: "",
        },
        stats: { likes: 510, comments: 31, shares: 14, reposts: 6 },
      },
    ],
  },
  {
    name: "Louis Hamilton",
    location: "Bremen, Germany",
    avatar: actor4,
    stats: { posts: 103, followers: 21_000, following: 540 },
    posts: [
      {
        id: "vera-1",
        content: "Morning light portrait series, session one.",
        createdAt: "30m ago",
        privacy: "Public",
        pinned: true,
        attachments: {
          imageUrl: xedua1,
          imageName: "portrait-series.jpg",
          fileName: "",
          location: "Bremen",
        },
        stats: { likes: 860, comments: 44, shares: 16, reposts: 7 },
      },
      {
        id: "vera-2",
        content: "Studio checklist for the new backdrop setup.",
        createdAt: "2d ago",
        privacy: "Friends",
        pinned: false,
        attachments: {
          imageUrl: xedua2,
          imageName: "",
          fileName: "studio-checklist.docx",
          location: "",
        },
        stats: { likes: 240, comments: 10, shares: 4, reposts: 1 },
      },
      {
        id: "louis-3",
        content: "Race weekend prep: dialing in balance for high-speed corners.",
        createdAt: "5h ago",
        privacy: "Public",
        pinned: false,
        attachments: {
          imageUrl:
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
          imageName: "race-prep.jpg",
          fileName: "",
          location: "Trackside",
        },
        stats: { likes: 910, comments: 58, shares: 22, reposts: 9 },
      },
      {
        id: "louis-4",
        content: "Post-qualifying debrief: lessons learned and next steps.",
        createdAt: "1d ago",
        privacy: "Public",
        pinned: false,
        attachments: {
          imageUrl:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
          imageName: "qualifying-debrief.jpg",
          fileName: "",
          location: "Garage",
        },
        stats: { likes: 780, comments: 41, shares: 18, reposts: 6 },
      },
      {
        id: "louis-5",
        content: "Night run under the lights. Pace feels strong.",
        createdAt: "3d ago",
        privacy: "Followers",
        pinned: false,
        attachments: {
          imageUrl: xedua3,
          imageName: "night-run.jpg",
          fileName: "",
          location: "Street Circuit",
        },
        stats: { likes: 640, comments: 29, shares: 12, reposts: 5 },
      },
    ],
  },
  {
    name: "Mr.Reptile",
    location: "Houston, Texas",
    avatar: actor5,
    stats: { posts: 64, followers: 15_800, following: 610 },
    posts: [
      {
        id: "josh-1",
        content: "Scrim recap and draft notes for next week.",
        createdAt: "5h ago",
        privacy: "Public",
        pinned: true,
        attachments: {
          imageUrl: bs1,
          imageName: "scrim-recap.jpg",
          fileName: "",
          location: "Elk Grove",
        },
        stats: { likes: 330, comments: 18, shares: 6, reposts: 2 },
      },
      {
        id: "josh-2",
        content: "Highlight clip from last night's match.",
        createdAt: "1d ago",
        privacy: "Public",
        pinned: false,
        attachments: {
          imageUrl: bs2,
          imageName: "highlight.jpg",
          fileName: "",
          location: "",
        },
        stats: { likes: 512, comments: 26, shares: 9, reposts: 4 },
      },
      {
        id: "reptile-3",
        content: "New arena setup test, latency feels crisp.",
        createdAt: "3h ago",
        privacy: "Public",
        pinned: false,
        attachments: {
          imageUrl: bs3,
          imageName: "arena-setup.jpg",
          fileName: "",
          location: "Houston",
        },
        stats: { likes: 284, comments: 17, shares: 6, reposts: 2 },
      },
      {
        id: "reptile-4",
        content: "Patch notes day. Working on new loadout routes.",
        createdAt: "2d ago",
        privacy: "Followers",
        pinned: false,
        attachments: {
          imageUrl: bs4,
          imageName: "",
          fileName: "loadout-notes.txt",
          location: "",
        },
        stats: { likes: 198, comments: 12, shares: 4, reposts: 1 },
      },
      {
        id: "reptile-5",
        content: "Best clip from the scrim block.",
        createdAt: "4d ago",
        privacy: "Public",
        pinned: false,
        attachments: {
          imageUrl: bs5,
          imageName: "scrim-clip.jpg",
          fileName: "",
          location: "",
        },
        stats: { likes: 376, comments: 23, shares: 8, reposts: 3 },
      },
    ],
  },
];
