const communityChats = ["Dog Lovers", "Copenhagen friends", "Y2K Car owners"];
const groupChats = ["Grill party org", "Sneaker freaks", "Music in the city", "School org"];
const onlineContacts = [
  "Mark Larsen",
  "Ethan Reynolds",
  "Ava Thompson",
  "Haarper Mitchell",
  "Pablo Morandi",
  "Isabel Hughes",
];

const avatarFor = (seed) => `https://i.pravatar.cc/40?u=${seed}`;

export default function ChatHoverPanel() {
  return (
    <div className="fixed right-0 top-0 h-full group z-40">
      {/* Invisible hover strip */}
      <div className="absolute right-0 top-0 h-full w-3 cursor-pointer" />

      <div
        className="
          absolute right-3 top-[80px] w-80 max-h-[80vh] overflow-y-auto
          bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl border border-white/60 dark:border-neutral-700
          opacity-0 pointer-events-none translate-x-3
          group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-x-0
          transition-all duration-200
        "
      >
        <div className="p-4 space-y-4 text-sm text-neutral-800 dark:text-gray-200">
          <Section title="Community chats">
            {communityChats.map((c) => (
              <ChatRow key={c} name={c} />
            ))}
          </Section>

          <Section title="Group chats">
            {groupChats.map((c) => (
              <ChatRow key={c} name={c} />
            ))}
          </Section>

          <Section title="Online contacts">
            {onlineContacts.map((c) => (
              <ChatRow key={c} name={c} avatar={avatarFor(c)} online />
            ))}
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
        {title}
      </p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function ChatRow({ name, avatar, online }) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <img
          src={avatar || avatarFor(name)}
          alt={name}
          className="w-8 h-8 rounded-full object-cover"
        />
        {online && (
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border border-white dark:border-neutral-800" />
        )}
      </div>
      <p className="text-[13px]">{name}</p>
    </div>
  );
}
