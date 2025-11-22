
import { BlogPost, Book, Reaction, PortfolioItem, InspirationItem, Fragment } from '../types/index';

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: {
      en: 'The Architecture of Silence',
      'zh-CN': '寂静的建筑学',
      'zh-TW': '寂靜的建築學',
      ja: '沈黙の建築',
      ko: '침묵의 건축'
    },
    date: '2024-10-30',
    sortDate: '2024-10-30',
    category: 'Reflection',
    excerpt: {
      en: 'We build walls not to keep the world out, but to keep the quiet in.',
      'zh-CN': '我们砌墙，不是为了将世界拒之门外，而是为了将宁静留在心间。',
      'zh-TW': '我們砌牆，不是為了將世界拒之門外，而是為了將寧靜留在心間。',
      ja: '壁を作るのは、世界を遮断するためではなく、静寂を守るためだ。',
      ko: '우리는 세상을 막기 위해서가 아니라, 고요함을 지키기 위해 벽을 쌓는다.'
    },
    tags: ['architecture', 'silence', 'zen', 'memory'],
    content: {
      en: `In the empty spaces between our thoughts, there lies a structure more rigid than steel. We build walls not to keep the world out, but to keep the quiet in. The wooden arch is not merely a support for the roof; it is hands clasped in prayer. Today I walked through the tea garden, observing how moss claims the stone. It is a gentle conquest. Moss does not break; it covers. Roots do not shatter; they embrace until the stone yields.`,
      'zh-CN': `在思绪的空隙中，存在着一种比钢铁更坚固的结构。我们砌墙，不是为了将世界拒之门外，而是为了将宁静留在心间。木拱不仅仅是屋顶的支撑；它是合十祈祷的双手。今天我走过茶园，观察苔藓如何占据石头。那是一种温柔的征服。苔藓不会破碎；它覆盖。根须不会粉碎；它们拥抱，直到石头屈服。`,
      'zh-TW': `在思緒的空隙中，存在著一種比鋼鐵更堅固的結構。我們砌牆，不是為了將世界拒之門外，而是為了將寧靜留在心間。木拱不僅僅是屋頂的支撐；它是合十祈禱的雙手。今天我走過茶園，觀察苔蘚如何佔據石頭。那是一種溫柔的征服。苔蘚不會破碎；它覆蓋。根鬚不會粉碎；它們擁抱，直到石頭屈服。`,
      ja: `思考の隙間には、鋼鉄よりも強固な構造が存在する。壁を作るのは、世界を遮断するためではなく、静寂を守るためだ。木製のアーチは単なる屋根の支えではない。それは祈りのために組まれた手だ。今日、茶庭を歩きながら、苔がどのように石を覆うかを観察した。それは穏やかな征服だ。苔は壊さず、包み込む。根は砕かず、石が降参するまで抱擁する。`,
      ko: `생각의 틈새에는 강철보다 더 단단한 구조가 존재한다. 우리는 세상을 막기 위해서가 아니라, 고요함을 지키기 위해 벽을 쌓는다. 나무 아치는 단지 지붕을 지탱하는 것이 아니라, 기도하듯 맞잡은 손이다. 오늘 나는 차 정원을 거닐며 이끼가 어떻게 돌을 덮는지 관찰했다. 그것은 부드러운 정복이다. 이끼는 깨뜨리지 않고 덮는다. 뿌리는 부수지 않고 돌이 굴복할 때까지 감싸 안는다.`
    },
  },
  {
    id: '2',
    title: 'Simplicity and Ink',
    date: '2024-10-15',
    sortDate: '2024-10-15',
    category: 'Philosophy',
    excerpt: 'Every word written is an attempt to capture the fleeting moment.',
    tags: ['writing', 'simplicity', 'time', 'flow'],
    content: `To write is to flow with the river of time. The ink dries, the paper holds the memory. We persist not out of rebellion, but out of harmony. A sentence is order. A paragraph is a garden path.`,
  },
  {
    id: '3',
    title: 'Notes on "The Book of Tea"',
    date: '2024-09-22',
    sortDate: '2024-09-22',
    category: 'Personal Essays',
    excerpt: 'Okakura understood that tea is a religion of the art of life.',
    tags: ['reading notes', 'tea', 'aesthetics', 'culture'],
    content: `The tea room is an oasis in the dreary waste of existence here in the city. It is a sanctuary where one can find comfort in the appreciation of the imperfect. We are all guests in this life, sipping from the cup of the present.`,
  }
];

export const INITIAL_LIBRARY_BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Stranger',
    author: 'Albert Camus',
    coverUrl: 'https://placehold.co/300x450/e5e5e5/0F0F0F?text=The+Stranger',
    dateFinished: 'Winter 2023',
    sortDate: '2025-01-15',
    category: 'Fiction',
    tags: ['absurdism', 'existentialism', 'classics', 'sun'],
    reflection: {
        en: "A haunting portrayal of detachment. Meursault is not a monster because he kills, but because he refuses to weep at his mother's funeral.",
        'zh-CN': "一幅令人难忘的疏离画像。默尔索之所以被视为怪物，不是因为他杀了人，而是因为他在母亲的葬礼上拒绝哭泣。",
    },
    quotes: [
        { en: "Maman died today. Or maybe yesterday, I don't know.", 'zh-CN': "今天，妈妈死了。也许是昨天，我不知道。" },
    ]
  },
  {
    id: '2',
    title: 'Snow Country',
    author: 'Yasunari Kawabata',
    coverUrl: 'https://placehold.co/300x450/d6d3d1/0F0F0F?text=Snow+Country',
    dateFinished: 'Autumn 2023',
    sortDate: '2025-01-10',
    category: 'Fiction',
    tags: ['beauty', 'loneliness', 'nature', 'japan'],
    reflection: "A wasted effort, perhaps, but a beautiful one. The snow covers everything in a blanket of silence.",
    quotes: ["The train came out of the long tunnel into the snow country.", "Everything is a symbol of the passage of time."]
  },
  {
    id: '3',
    title: 'Meditations',
    author: 'Marcus Aurelius',
    coverUrl: 'https://placehold.co/300x450/f5f5f4/0F0F0F?text=Meditations',
    dateFinished: 'Spring 2024',
    sortDate: '2025-02-01',
    category: 'Philosophy',
    tags: ['stoicism', 'discipline', 'nature', 'impermanence'],
    reflection: "The private notes of an emperor trying to be a good man in a chaotic world. It is a reminder that the only thing we truly possess is the present moment.",
    quotes: ["You have power over your mind - not outside events.", "The soul becomes dyed with the color of its thoughts."]
  },
  {
    id: '4',
    title: 'In Praise of Shadows',
    author: 'Junichiro Tanizaki',
    coverUrl: 'https://placehold.co/300x450/292524/FAFAF7?text=Shadows',
    dateFinished: 'Summer 2023',
    sortDate: '2025-02-15',
    category: 'Art & Aesthetics',
    tags: ['architecture', 'aesthetics', 'shadows', 'light'],
    reflection: "An essay on Japanese aesthetics, finding beauty not in the thing itself but in the patterns of shadows, the light and the darkness, that one thing against another creates.",
    quotes: ["Were it not for shadows, there would be no beauty.", "We find beauty not in the thing itself but in the patterns of shadows."]
  },
];

export const INITIAL_REACTIONS: Reaction[] = [
  {
    id: '1',
    title: 'Stalker',
    creator: 'Andrei Tarkovsky',
    type: 'Film',
    category: 'Film',
    dateExperienced: '2024-11-01',
    sortDate: '2024-11-01',
    imageUrl: 'https://placehold.co/600x340/e5e5e5/57534e?text=Stalker',
    summary: 'A guide leads two men through an area known as the Zone to find a room that grants wishes.',
    reflection: 'The dampness of the Zone seeps through the screen. Tarkovsky captures the texture of decay like no other.',
  },
  {
    id: '2',
    title: 'Water Lilies',
    creator: 'Claude Monet',
    type: 'Art',
    category: 'Visual Art',
    dateExperienced: '2024-10-20',
    sortDate: '2024-10-20',
    imageUrl: 'https://placehold.co/600x340/e5e5e5/57534e?text=Water+Lilies',
    summary: 'A series of approximately 250 oil paintings by French Impressionist Claude Monet.',
    reflection: 'The reflection of the sky in the water. There is no horizon, only the depth of the pond and the light playing on the surface.',
  },
];

export const INITIAL_PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: '1',
    title: 'Void Construct',
    description: 'A generative art series exploring negative space and digital decay.',
    year: '2024',
    sortDate: '2024-05-01',
    category: 'Visual Work',
    tools: ['Processing', 'GLSL', 'Audio'],
    thumbnailUrl: 'https://placehold.co/500x500/e5e5e5/57534e?text=Void+Construct',
    reflection: 'This project began as an attempt to visualize silence. By removing pixels iteratively based on noise algorithms, I created structures that seem to be dissolving in real-time.',
  }
];

export const INITIAL_INSPIRATION_ITEMS: InspirationItem[] = [
  {
    id: '1',
    type: 'Quote',
    category: 'Quotes',
    content: 'In the midst of winter, I found there was, within me, an invincible summer.',
    source: 'Albert Camus',
    notes: 'Resilience as an inherent trait, not an acquired skill.',
    why: 'Reminds me that the cold is external.',
    sortDate: '2024-01-10',
    tags: ['resilience', 'camus', 'winter']
  }
];

export const INITIAL_FRAGMENTS: Fragment[] = [
  { id: '1', content: 'The shadow is not the absence of light, but the presence of an obstacle.', date: '2024-11-12', sortDate: '2024-11-12', category: 'Thoughts', tags: ['shadow', 'physics'] },
  { id: '2', content: 'We are ghosts driving meat-skeletons made of stardust.', date: '2024-11-10', sortDate: '2024-11-10', category: 'Thoughts', tags: ['humanity', 'absurd'] },
];
