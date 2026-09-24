// Additional inventory. IDs must stay stable to preserve purchases.
var HUNTER_EXTRA_SHOP_ITEMS = [
  {
    "id": "hunter_rope",
    "name": "冒険のロープ",
    "ico": "🪢",
    "desc": "がけや谷をこえる、丈夫なロープ。",
    "price": 8,
    "category": "explore"
  },
  {
    "id": "hunter_canteen",
    "name": "泉の水とう",
    "ico": "🫙",
    "desc": "きれいな水を持ち歩く、旅の必需品。",
    "price": 11,
    "category": "explore"
  },
  {
    "id": "hunter_tent",
    "name": "木かげのテント",
    "ico": "⛺",
    "desc": "森の夜を安心してすごせる小さな家。",
    "price": 14,
    "category": "explore"
  },
  {
    "id": "hunter_spyglass",
    "name": "遠見の望遠鏡",
    "ico": "🔭",
    "desc": "遠くの空を飛ぶ幻獣を見つけよう。",
    "price": 17,
    "category": "explore"
  },
  {
    "id": "hunter_notebook",
    "name": "足あと手帳",
    "ico": "📓",
    "desc": "不思議な足あとを見つけたら書きとめよう。",
    "price": 20,
    "category": "explore"
  },
  {
    "id": "hunter_quill",
    "name": "記録の羽ペン",
    "ico": "🪶",
    "desc": "冒険の思い出を地図に書きこむペン。",
    "price": 23,
    "category": "explore"
  },
  {
    "id": "hunter_flint",
    "name": "火おこし石",
    "ico": "🪨",
    "desc": "たき火をともす、火花の出る石。",
    "price": 26,
    "category": "explore"
  },
  {
    "id": "hunter_cookpot",
    "name": "旅人のなべ",
    "ico": "🍲",
    "desc": "仲間と温かいごはんを分け合おう。",
    "price": 29,
    "category": "explore"
  },
  {
    "id": "hunter_rations",
    "name": "木の実のおべんとう",
    "ico": "🧺",
    "desc": "長い道のりの元気をくれる木の実。",
    "price": 32,
    "category": "explore"
  },
  {
    "id": "hunter_sleeping_bag",
    "name": "ふわふわ寝ぶくろ",
    "ico": "🛌",
    "desc": "寒い夜もあたたかく眠れるよ。",
    "price": 35,
    "category": "explore"
  },
  {
    "id": "hunter_gloves",
    "name": "岩のぼり手ぶくろ",
    "ico": "🧤",
    "desc": "岩場をしっかりつかめる手ぶくろ。",
    "price": 38,
    "category": "explore"
  },
  {
    "id": "hunter_raincoat",
    "name": "葉っぱの雨がっぱ",
    "ico": "🍃",
    "desc": "大きな葉っぱで作った雨の日の服。",
    "price": 41,
    "category": "explore"
  },
  {
    "id": "hunter_whistle",
    "name": "森の合図笛",
    "ico": "🪈",
    "desc": "迷ったときは仲間に合図を送ろう。",
    "price": 44,
    "category": "explore"
  },
  {
    "id": "hunter_shovel",
    "name": "おたからスコップ",
    "ico": "🪏",
    "desc": "土の中にかくれた宝物を探す道具。",
    "price": 47,
    "category": "explore"
  },
  {
    "id": "hunter_fishing_rod",
    "name": "星つりざお",
    "ico": "🎣",
    "desc": "夜の湖で光る魚をつってみよう。",
    "price": 50,
    "category": "explore"
  },
  {
    "id": "hunter_snowshoes",
    "name": "雪わたりのくつ",
    "ico": "🎿",
    "desc": "深い雪でも軽やかに歩けるくつ。",
    "price": 53,
    "category": "explore"
  },
  {
    "id": "hunter_raft",
    "name": "木のいかだ",
    "ico": "🛶",
    "desc": "静かな川をわたる小さな船。",
    "price": 56,
    "category": "explore"
  },
  {
    "id": "hunter_saddle",
    "name": "相棒のくら",
    "ico": "🐎",
    "desc": "幻獣の背中に乗って遠くへ出発。",
    "price": 59,
    "category": "explore"
  },
  {
    "id": "hunter_flag",
    "name": "ハンターの旗",
    "ico": "🚩",
    "desc": "冒険の拠点に立てる仲間のしるし。",
    "price": 62,
    "category": "explore"
  },
  {
    "id": "hunter_moon_leaf",
    "name": "月しずくの葉",
    "ico": "🌿",
    "desc": "月明かりの下でしずくを集める葉。",
    "price": 15,
    "category": "material"
  },
  {
    "id": "hunter_sun_seed",
    "name": "ひだまりの種",
    "ico": "🌻",
    "desc": "植えると小さな光の花がさく種。",
    "price": 19,
    "category": "material"
  },
  {
    "id": "hunter_starlight_sand",
    "name": "星くずの砂",
    "ico": "✨",
    "desc": "暗い場所で星のようにきらめく砂。",
    "price": 23,
    "category": "material"
  },
  {
    "id": "hunter_rain_pearl",
    "name": "雨の真珠",
    "ico": "🫧",
    "desc": "雨あがりの泉で見つかる丸い宝石。",
    "price": 27,
    "category": "material"
  },
  {
    "id": "hunter_wind_flower",
    "name": "風まちの花",
    "ico": "🌼",
    "desc": "風がふくたび、やさしく歌う花。",
    "price": 31,
    "category": "material"
  },
  {
    "id": "hunter_frost_berry",
    "name": "こおりの実",
    "ico": "🫐",
    "desc": "雪山で育つ、ひんやりした青い実。",
    "price": 35,
    "category": "material"
  },
  {
    "id": "hunter_ember_nut",
    "name": "ほのおの木の実",
    "ico": "🌰",
    "desc": "手に持つとほんのり温かい木の実。",
    "price": 39,
    "category": "material"
  },
  {
    "id": "hunter_rainbow_mushroom",
    "name": "にじいろキノコ",
    "ico": "🍄",
    "desc": "見る向きによって色が変わるキノコ。",
    "price": 43,
    "category": "material"
  },
  {
    "id": "hunter_cloud_cotton",
    "name": "雲のわた",
    "ico": "☁️",
    "desc": "空からふわりと落ちてきた軽いわた。",
    "price": 47,
    "category": "material"
  },
  {
    "id": "hunter_sea_glass",
    "name": "海色ガラス",
    "ico": "🩵",
    "desc": "波にみがかれた、すきとおるかけら。",
    "price": 51,
    "category": "material"
  },
  {
    "id": "hunter_echo_shell",
    "name": "こだまの貝がら",
    "ico": "🐚",
    "desc": "耳にあてると遠い海の音が聞こえる。",
    "price": 55,
    "category": "material"
  },
  {
    "id": "hunter_glow_moss",
    "name": "ひかりゴケ",
    "ico": "🌱",
    "desc": "洞窟を緑色に照らす小さな植物。",
    "price": 59,
    "category": "material"
  },
  {
    "id": "hunter_forest_honey",
    "name": "精霊のはちみつ",
    "ico": "🍯",
    "desc": "森の花の香りがつまった甘い宝物。",
    "price": 63,
    "category": "material"
  },
  {
    "id": "hunter_amber_drop",
    "name": "こはくのしずく",
    "ico": "🟠",
    "desc": "古い森の記憶をとじこめた樹液の石。",
    "price": 67,
    "category": "material"
  },
  {
    "id": "hunter_night_ink",
    "name": "夜空のインク",
    "ico": "🖋️",
    "desc": "星図を書くための、青く光るインク。",
    "price": 71,
    "category": "material"
  },
  {
    "id": "hunter_silver_thread",
    "name": "月の銀糸",
    "ico": "🧵",
    "desc": "月明かりをより合わせた細い糸。",
    "price": 75,
    "category": "material"
  },
  {
    "id": "hunter_rainbow_feather",
    "name": "にじの羽",
    "ico": "🪶",
    "desc": "空をわたる鳥が残した七色の羽。",
    "price": 79,
    "category": "material"
  },
  {
    "id": "hunter_ancient_wood",
    "name": "古木のえだ",
    "ico": "🪵",
    "desc": "長い年月を生きた大樹からの贈り物。",
    "price": 83,
    "category": "material"
  },
  {
    "id": "hunter_spring_crystal",
    "name": "泉の結晶",
    "ico": "💎",
    "desc": "清らかな水の力が集まった結晶。",
    "price": 87,
    "category": "material"
  },
  {
    "id": "hunter_wind_bell",
    "name": "風よびのすず",
    "ico": "🔔",
    "desc": "鳴らすと木々をゆらす風が集まる。",
    "price": 35,
    "category": "relic"
  },
  {
    "id": "hunter_moon_mirror",
    "name": "月うつしの鏡",
    "ico": "🪞",
    "desc": "昼でも月を映し出す不思議な鏡。",
    "price": 41,
    "category": "relic"
  },
  {
    "id": "hunter_star_key",
    "name": "星のとびらの鍵",
    "ico": "🗝️",
    "desc": "星の模様がある、とびらを開く鍵。",
    "price": 47,
    "category": "relic"
  },
  {
    "id": "hunter_water_orb",
    "name": "水のオーブ",
    "ico": "🔵",
    "desc": "水面に小さな道を作る青い宝玉。",
    "price": 53,
    "category": "relic"
  },
  {
    "id": "hunter_fire_orb",
    "name": "炎のオーブ",
    "ico": "🔴",
    "desc": "消えない小さな炎を宿した宝玉。",
    "price": 59,
    "category": "relic"
  },
  {
    "id": "hunter_earth_orb",
    "name": "大地のオーブ",
    "ico": "🟤",
    "desc": "足もとの大地の声が聞こえる宝玉。",
    "price": 65,
    "category": "relic"
  },
  {
    "id": "hunter_wind_orb",
    "name": "風のオーブ",
    "ico": "🟢",
    "desc": "草原の風をとじこめた緑の宝玉。",
    "price": 71,
    "category": "relic"
  },
  {
    "id": "hunter_light_orb",
    "name": "光のオーブ",
    "ico": "🟡",
    "desc": "暗い道を明るく照らす光の宝玉。",
    "price": 77,
    "category": "relic"
  },
  {
    "id": "hunter_shadow_orb",
    "name": "影のオーブ",
    "ico": "🟣",
    "desc": "木かげのひみつを映し出す宝玉。",
    "price": 83,
    "category": "relic"
  },
  {
    "id": "hunter_spell_scroll",
    "name": "召喚の巻物",
    "ico": "📜",
    "desc": "幻獣を呼ぶ古い言葉が書かれた巻物。",
    "price": 89,
    "category": "relic"
  },
  {
    "id": "hunter_storm_ring",
    "name": "いかずちの指輪",
    "ico": "💍",
    "desc": "雷雲の力が宿る、きらめく指輪。",
    "price": 95,
    "category": "relic"
  },
  {
    "id": "hunter_frost_pendant",
    "name": "氷のペンダント",
    "ico": "🧊",
    "desc": "真夏でもとけない氷でできた首かざり。",
    "price": 101,
    "category": "relic"
  },
  {
    "id": "hunter_flower_wand",
    "name": "花さかせの杖",
    "ico": "🌷",
    "desc": "歩いた道に小さな花をさかせる杖。",
    "price": 107,
    "category": "relic"
  },
  {
    "id": "hunter_dream_pillow",
    "name": "夢わたりのまくら",
    "ico": "🌙",
    "desc": "幻獣の夢をいっしょに見られるまくら。",
    "price": 113,
    "category": "relic"
  },
  {
    "id": "hunter_time_sandglass",
    "name": "星砂のすなどけい",
    "ico": "⌛",
    "desc": "空の星と同じ速さで砂が落ちる時計。",
    "price": 119,
    "category": "relic"
  },
  {
    "id": "hunter_echo_harp",
    "name": "こだまのハープ",
    "ico": "🎶",
    "desc": "森の仲間が集まってくる音色の楽器。",
    "price": 125,
    "category": "relic"
  },
  {
    "id": "hunter_cloud_carpet",
    "name": "雲のじゅうたん",
    "ico": "🧶",
    "desc": "地面から少しだけ浮かぶじゅうたん。",
    "price": 131,
    "category": "relic"
  },
  {
    "id": "hunter_portal_lantern",
    "name": "道しるべの灯",
    "ico": "🏮",
    "desc": "帰り道を忘れても拠点へ導く灯り。",
    "price": 137,
    "category": "relic"
  },
  {
    "id": "hunter_contract_book",
    "name": "幻獣との約束の書",
    "ico": "📖",
    "desc": "仲間になった幻獣との約束を記す本。",
    "price": 143,
    "category": "relic"
  },
  {
    "id": "hunter_azure_scale",
    "name": "青き守護のうろこ",
    "ico": "🐉",
    "desc": "東の空を守る幻獣からの贈り物。",
    "price": 100,
    "category": "legend"
  },
  {
    "id": "hunter_white_fang",
    "name": "白き守護のきば",
    "ico": "🦷",
    "desc": "雪のように白く輝く、守護のしるし。",
    "price": 115,
    "category": "legend"
  },
  {
    "id": "hunter_scarlet_plume",
    "name": "紅き守護の羽",
    "ico": "🪶",
    "desc": "夕焼けの色をした、温かい羽。",
    "price": 130,
    "category": "legend"
  },
  {
    "id": "hunter_black_shell",
    "name": "玄き守護のこうら",
    "ico": "🐢",
    "desc": "長い時を生きた守り手の宝物。",
    "price": 145,
    "category": "legend"
  },
  {
    "id": "hunter_golden_horn",
    "name": "黄金のつの",
    "ico": "🦌",
    "desc": "森の王者が残した、黄金のかけら。",
    "price": 160,
    "category": "legend"
  },
  {
    "id": "hunter_sea_crown",
    "name": "深海の王冠",
    "ico": "👑",
    "desc": "海の底の王国で作られた小さな冠。",
    "price": 175,
    "category": "legend"
  },
  {
    "id": "hunter_sky_chalice",
    "name": "天空のさかずき",
    "ico": "🏆",
    "desc": "雲の上から届いた、星を映す器。",
    "price": 190,
    "category": "legend"
  },
  {
    "id": "hunter_world_seed",
    "name": "世界樹の種",
    "ico": "🌳",
    "desc": "いつか空まで育つと伝わる大きな種。",
    "price": 205,
    "category": "legend"
  },
  {
    "id": "hunter_meteor_shard",
    "name": "流星のかけら",
    "ico": "☄️",
    "desc": "夜空をかけぬけた星の落とし物。",
    "price": 220,
    "category": "legend"
  },
  {
    "id": "hunter_aurora_cloth",
    "name": "オーロラの布",
    "ico": "🌌",
    "desc": "空の光を織りこんだ、ゆらめく布。",
    "price": 235,
    "category": "legend"
  },
  {
    "id": "hunter_sun_medallion",
    "name": "太陽の紋章",
    "ico": "☀️",
    "desc": "夜明けの勇気をくれる金色の紋章。",
    "price": 250,
    "category": "legend"
  },
  {
    "id": "hunter_moon_medallion",
    "name": "月の紋章",
    "ico": "🌙",
    "desc": "静かな夜を見守る銀色の紋章。",
    "price": 265,
    "category": "legend"
  },
  {
    "id": "hunter_seven_star_map",
    "name": "七つ星の地図",
    "ico": "🗺️",
    "desc": "七つの秘境への道が記された地図。",
    "price": 280,
    "category": "legend"
  },
  {
    "id": "hunter_prism_crystal",
    "name": "七色の召喚石",
    "ico": "🔮",
    "desc": "すべての色が集まる特別な水晶。",
    "price": 295,
    "category": "legend"
  },
  {
    "id": "hunter_royal_seal",
    "name": "幻獣王の印",
    "ico": "🔱",
    "desc": "幻獣たちに信頼された者のしるし。",
    "price": 310,
    "category": "legend"
  },
  {
    "id": "hunter_eternal_flame",
    "name": "とこしえの灯火",
    "ico": "🕯️",
    "desc": "どんな嵐の中でも消えない灯り。",
    "price": 325,
    "category": "legend"
  },
  {
    "id": "hunter_first_contract",
    "name": "はじまりの契約",
    "ico": "📜",
    "desc": "最初のハンターが残した大切な約束。",
    "price": 340,
    "category": "legend"
  },
  {
    "id": "hunter_celestial_compass",
    "name": "天空の羅針盤",
    "ico": "🧭",
    "desc": "まだ地図にない世界への道を示す。",
    "price": 355,
    "category": "legend"
  },
  {
    "id": "hunter_bond_gem",
    "name": "きずなの宝玉",
    "ico": "💠",
    "desc": "仲間との思い出がつまった最高の宝物。",
    "price": 370,
    "category": "legend"
  }
];
