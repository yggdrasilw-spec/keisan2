// Display names are kept separate from learning conditions and saved reward IDs.
// Official creature names supplied by the author, in learning-condition order.
var HUNTER_CREATURE_NAMES = {
  mix_20: 'プリズム・スタッグ',
  mix_all: 'アストラル・ドラゴン',
  easy_20: 'ユニコーン',
  easy_all: 'ヨルムンガンド',
  ten_all: 'マンティコア',
  hard_20: 'アジ・ダハーカ（光）',
  hard_all: 'アジ・ダハーカ（闇）',
  no_bottom_01: 'フェニックス',
  no_bottom_02: 'グリフォン',
  no_bottom_03: 'ケルベロス',
  no_bottom_04: 'ペガサス',
  no_bottom_05: 'キマイラ',
  no_bottom_06: 'スフィンクス',
  no_bottom_07: 'クラーケン',
  no_bottom_08: 'リヴァイアサン',
  no_bottom_09: 'バジリスク',
  no_top_01: '青龍（せいりゅう）',
  no_top_02: '白虎（びゃっこ）',
  no_top_03: '朱雀（すざく）',
  no_top_04: '玄武（げんぶ）',
  no_top_05: '麒麟（きりん）',
  no_top_06: '黄龍（こうりゅう）',
  no_top_07: '九尾の狐（きゅうびのきつね）',
  no_top_08: '龍',
  no_top_09: '鬼',
  borrow_bottom_01: 'ヒュドラ',
  borrow_bottom_02: 'メドゥーサ',
  borrow_bottom_03: '天狗（てんぐ）',
  borrow_bottom_04: '鵺（ぬえ）',
  borrow_bottom_05: '饕餮（とうてつ）',
  borrow_bottom_06: '白澤（はくたく）',
  borrow_bottom_07: 'ミノタウロス',
  borrow_bottom_08: 'マーメイド',
  borrow_bottom_09: 'ケンタウロス',
  borrow_top_11: 'ファイヤードレイク',
  borrow_top_12: 'フェンリル',
  borrow_top_13: 'ケツァルコアトル',
  borrow_top_14: 'クエレブレ',
  borrow_top_15: 'ティアマト',
  borrow_top_16: 'タラスク',
  borrow_top_17: 'ニーズヘッグ',
  borrow_top_18: 'ファフニール'
};
function hunterCreatureName(def) {
  if (def.challenge && typeof HUNTER_SPEED_CREATURES !== 'undefined' && HUNTER_SPEED_CREATURES[def.key]) return HUNTER_SPEED_CREATURES[def.key][0];
  return HUNTER_CREATURE_NAMES[def.key] || 'あたらしい幻獣';
}

function hunterMasterLabel(def) {
  if (def.challenge) return def.desc.replace(/\n/g, ' ');
  if (def.axis) return (def.kind === 'borrow' ? 'くりさがりあり・' : 'くりさがりなし・') + def.num + (def.axis === 'top' ? 'からひく' : 'をひく');
  return def.title.replace(/\n/g, ' ').replace(/メダル/g, '');
}
