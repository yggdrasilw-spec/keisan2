// Short, child-friendly field notes. Adventure descriptions are original game lore.
var HUNTER_LORE = {
 mix_20:['虹角の幻獣','このゲームだけのオリジナル幻獣。水晶の角に、森・炎・雷の三つの光を集める白い鹿です。','いろいろなひき算を20問マスターしたハンターの前に現れます。問題が変わっても、落ち着いて考える力のしるしです。'],
 mix_all:['星めぐりの幻獣','このゲームだけのオリジナル幻獣。星空の翼と銀色の体をもち、色とりどりの水晶と空を旅する竜です。','ばらばらコースの全問をマスターすると仲間になります。すべてのひき算をきわめたハンターを、新しい冒険へ案内します。'],
 easy_20:['一角の幻獣','額に一本の角をもつ、馬に似た幻獣。ユニコーンという名前には「一つの角」という意味があります。','森の奥で出会える、やさしい案内役。小さな一歩を重ねるハンターを見守ります。'],
 easy_all:['世界をめぐる大蛇','北欧の神話に登場する大きな蛇。世界をぐるりと取り巻くほどの大きさだと語られています。','長い体は、最後まで続けた練習のしるし。遠くまで進む勇気をくれます。'],
 ten_all:['複合の幻獣','人の顔、ライオンの体、危険な尾をもつと伝えられる幻獣。翼のある姿で描かれることもあります。','いろいろな力を組み合わせる名人。「10のまとまり」を使いこなすハンターの仲間です。'],
 hard_20:['光の竜','アジ・ダハーカはイランの神話に登場する怪物。この図鑑の「光」と「闇」は、ゲーム独自の姿です。','光をまとった姿は、くりさがりに挑む勇気のしるし。難しい問題にも道を照らします。'],
 hard_all:['闇の竜','アジ・ダハーカは複数の頭をもつ怪物として語られます。「闇」は、このゲームでの呼び名です。','静かな闇の中で力を蓄える竜。くりさがりを最後まできわめたハンターを認めます。'],
 no_bottom_01:['再生の鳥','フェニックスは、死と再生の物語で知られる伝説の鳥。不死鳥とも呼ばれます。','まちがえても、もう一度。新しい挑戦に向かう翼です。'],
 no_bottom_02:['空と大地の幻獣','ワシの頭や翼と、ライオンの体を合わせた幻獣。グリフォン、グリフィンなどの名前で呼ばれます。','空から問題を見渡し、落ち着いて答えを見つける相棒です。'],
 no_bottom_03:['冥界の番犬','ギリシャ神話に登場する番犬。三つの頭をもつ姿がよく知られています。','三つの頭で、数字・ひく数・答えをしっかり確認します。'],
 no_bottom_04:['翼のある馬','ギリシャ神話の翼をもつ馬。空をかける白い馬としてよく描かれます。','軽やかな一歩が、大きな飛躍につながります。'],
 no_bottom_05:['混ざり合う幻獣','ギリシャ神話のキマイラは、ライオン・ヤギ・蛇の特徴を合わせた怪物です。','ちがう考え方を組み合わせるのが得意。自分に合う解き方を探しましょう。'],
 no_bottom_06:['なぞの守り手','人の頭とライオンの体をもつ姿で知られます。ギリシャの物語では、なぞを問いかける存在です。','すぐに答えが見つからなくても大丈夫。よく考えるハンターを待っています。'],
 no_bottom_07:['深海の巨大生物','北の海の伝説に登場する巨大な海の怪物。大きなイカやタコのように描かれることがあります。','たくさんの腕で、海に散らばった数字を集めます。'],
 no_bottom_08:['海の怪物','聖書などに登場する巨大な海の怪物。長い蛇や竜のような姿で描かれることがあります。','深い海を進むように、一問ずつ落ち着いて進む相棒です。'],
 no_bottom_09:['小さな王','蛇に似た伝説の怪物。見る者をおびやかす目をもつと伝えられます。','小さくても強い集中力。最後の一問まで数字を見つめます。'],
 no_top_01:['東の守護者','中国の四神の一つ。東の方角と結びつけられる、青い龍です。','朝の空を進み、新しい練習の始まりを告げます。'],
 no_top_02:['西の守護者','中国の四神の一つ。西の方角と結びつけられる、白い虎です。','一歩ずつ確実に進む、たのもしい守り手です。'],
 no_top_03:['南の守護者','中国の四神の一つ。南の方角と結びつけられる、赤い鳥です。','あたたかな翼で、ハンターのやる気を応援します。'],
 no_top_04:['北の守護者','中国の四神の一つ。亀と蛇を組み合わせた姿で表され、北の方角と結びつけられます。','急がず、あわてず。確かな答えを探す力をくれます。'],
 no_top_05:['めでたい幻獣','中国などの伝説に登場する、よい知らせをもたらすとされる霊獣。動物のキリンとは別の存在です。','練習を続けたハンターに、次の冒険の知らせを届けます。'],
 no_top_06:['黄金の龍','中国の伝承に登場する黄色い龍。中央の方角などと結びつけられることがあります。','仲間たちの中心で輝き、冒険の道を結びます。'],
 no_top_07:['九つの尾の狐','中国や日本などに伝わる、九本の尾をもつ狐。さまざまな物語で異なる性格に描かれます。','九つの尾で数字を数え、変化する問題にもひらめきを見つけます。'],
 no_top_08:['水と空の霊獣','東アジアの龍は、長い体をもち、水や雨に関係する存在として語られます。','流れる水のように、ひき算の流れをつかむ仲間です。'],
 no_top_09:['日本の伝承','日本の昔話などに登場する存在。角や強い体をもつ姿で描かれますが、姿も性格も物語ごとに違います。','大きな力で背中を押す相棒。苦手な問題にも立ち向かいます。'],
 borrow_bottom_01:['多頭の水蛇','ギリシャ神話に登場する、たくさんの頭をもつ水の怪物です。','いくつもの問題に続けて挑む、ねばり強いハンターの仲間です。'],
 borrow_bottom_02:['蛇の髪の怪物','ギリシャ神話のゴルゴンの一人。蛇の髪をもち、目を合わせる者を石に変えると語られます。','数字をじっと見つめる集中の達人。あわてず、答えを確かめます。'],
 borrow_bottom_03:['山の伝承','日本の山の伝承に登場します。長い鼻の姿や、鳥に似た顔の姿などが知られています。','山をわたる風に乗り、次の問題へ軽やかに進みます。'],
 borrow_bottom_04:['不思議な混成獣','日本の伝説に登場する怪物。猿の顔、虎の脚、蛇の尾など、複数の動物の特徴で語られます。','見たことのない問題も、知っている部分に分けて考えます。'],
 borrow_bottom_05:['大食いの怪物','中国の伝承に登場し、ものをたくさん食べる怪物として知られます。古い青銅器の文様の名前にも使われます。','問題をどんどん食べるように、一問ずつ解き進めます。'],
 borrow_bottom_06:['知恵の霊獣','中国の伝承に登場する、さまざまな不思議に詳しい霊獣。日本にも伝わりました。','答えだけでなく、どう考えたかも大切にする物知りです。'],
 borrow_bottom_07:['迷宮の怪物','ギリシャ神話に登場する、牛の頭と人の体をもつ怪物。迷宮の物語で知られます。','迷ったときは道を分けて考えよう。答えへの出口を探します。'],
 borrow_bottom_08:['人魚','人の上半身と魚の尾をもつ姿で知られる、海の伝説の存在です。','海のリズムに合わせ、落ち着いて数字を数えます。'],
 borrow_bottom_09:['人と馬の姿','ギリシャ神話に登場する、人の上半身と馬の体をもつ存在です。','考える力と進む力を合わせ、長い冒険を走ります。'],
 borrow_top_11:['炎の竜','ファイヤードレイクは、火を吐く竜を表す呼び名として使われます。','炎のようなやる気で、新しい問題に挑む竜です。'],
 borrow_top_12:['巨大な狼','北欧神話に登場する巨大な狼。神々の物語で大きな役割をもちます。','むずかしい問題にもひるまない、大胆な相棒です。'],
 borrow_top_13:['羽毛の蛇','古代メキシコの神。名前は「羽毛のある蛇」を意味し、蛇と鳥の特徴を合わせた姿でも表されます。','空と大地をつなぐように、二つの考え方をつなぎます。'],
 borrow_top_14:['宝を守る蛇竜','スペイン北部の伝承に登場する、翼のある大蛇。宝を守る存在として語られます。','練習で見つけた大切なひらめきを、宝物として守ります。'],
 borrow_top_15:['原初の海','古代メソポタミアの神話に登場する、原初の海に関わる存在。後世には竜の姿でも描かれます。','大きな海のような可能性。まだ知らない問題へ向かいます。'],
 borrow_top_16:['南フランスの怪物','フランスのタラスコンに伝わる怪物。硬い甲羅や複数の脚をもつ姿で知られています。','硬い守りは、積み重ねた練習のしるしです。'],
 borrow_top_17:['根をかじる竜','北欧神話に登場する竜や蛇のような存在。世界樹の根をかじると語られます。','問題の根っこを見つけて、仕組みを考える相棒です。'],
 borrow_top_18:['宝を抱く竜','北欧の伝説で、宝を守る竜となった存在。英雄シグルズとの物語で知られます。','最後まで続けた先の宝物。きわめた力を、次の冒険へ持っていきましょう。']
};
(function(){
  var selected=null,returnFocus=null;
  ['openAchBadgePreview','openAchKotsuPreview'].forEach(function(name){var original=window[name];window[name]=function(def){selected=def;returnFocus=document.activeElement;original(def);var button=document.getElementById('hunter-lore-open');button.hidden=!!def.challenge;(def.challenge?document.querySelector('#ach-preview-overlay .ach-preview-close'):button).focus();};});
  document.addEventListener('DOMContentLoaded',function(){
    var button=document.createElement('button');button.id='hunter-lore-open';button.type='button';button.className='hunter-lore-button';button.textContent='解説を 見る　→';
    document.querySelector('#ach-preview-overlay .ach-preview-close').before(button);
    var dialog=document.createElement('dialog');dialog.className='hunter-drawer hunter-lore';dialog.id='hunter-lore-dialog';dialog.setAttribute('aria-labelledby','hunter-lore-name');
    dialog.innerHTML='<div class="hunter-drawer-head"><span>幻獣ずかん / FIELD GUIDE</span><button class="hunter-dialog-close" aria-label="解説をとじる">✕</button></div><div class="hunter-lore-layout"><div class="hunter-lore-art"><img id="hunter-lore-img" alt=""></div><div><span class="hunter-lore-tag" id="hunter-lore-tag"></span><h2 id="hunter-lore-name"></h2><h3>どんな 幻獣？</h3><p id="hunter-lore-about"></p><h3>この冒険での すがた</h3><p id="hunter-lore-story"></p><h3>なかまにする 条件</h3><p id="hunter-lore-condition"></p><p class="hunter-lore-note">伝承にはさまざまな説があります。<br>「この冒険でのすがた」はゲーム独自の物語です。</p></div></div>';
    document.body.appendChild(dialog);
    dialog.querySelector('button').onclick=function(){dialog.close();};
    dialog.addEventListener('click',function(e){if(e.target===dialog)dialog.close();});
    button.onclick=function(e){e.stopPropagation();if(!selected)return;var entry=HUNTER_LORE[selected.key];
      document.getElementById('hunter-lore-name').textContent=hunterCreatureName(selected);
      var img=document.getElementById('hunter-lore-img');img.src=selected.axis?kotsuImgSrc(selected):selected.img;img.alt=hunterCreatureName(selected);
      document.getElementById('hunter-lore-tag').textContent=entry[0];document.getElementById('hunter-lore-about').textContent=entry[1];document.getElementById('hunter-lore-story').textContent=entry[2];
      document.getElementById('hunter-lore-condition').textContent=hunterMasterLabel(selected)+' をマスター';dialog.showModal();
    };
    var originalClose=closeAchPreview;closeAchPreview=function(){originalClose();if(returnFocus && returnFocus.isConnected)returnFocus.focus();};
    document.addEventListener('keydown',function(e){if(e.key==='Escape' && !dialog.open)closeAchPreview();});
  });
})();
