# 幻獣ハンター：挑戦モードと図鑑

ホーム右端の「限界にちょうせん」から開始。スマートフォンではホーム下部に表示する。

- 神速：1問2秒、選択コースの最大20問。
- 超神速：1問1.5秒、選択コースの最大20問。
- 無限：4秒から正解ごとに0.12秒短縮、最短2.5秒。問題を補充し続ける。
- 誤答・時間切れで終了。途中終了と画面を離れた場合も記録を保存。
- コース別・モード別の自己ベストを `hikizan_challenge_` キーで保存。既存のバックアップ対象に含まれる。
- 通常練習の成績・メダル・星とは別の挑戦記録。全モードを最初から選べる。

実績の拡大画面に「解説を見る」を追加。40種類それぞれに、伝承の短い紹介、ゲーム独自の物語、獲得条件を表示。解説を閉じると拡大画面に戻る。

## 解説の参考資料

紹介は児童向けに要約し、ゲーム独自の物語と分けた。光・闇のアジ・ダハーカはゲーム独自の姿と明記。

- [Theoi：伝説の生き物](https://www.theoi.com/greek-mythology/fantastic-creatures.html)
- [アメリカ自然史博物館：Dragon](https://www.amnh.org/explore/ology/ology-cards/277-dragon)
- [四神](https://en.wikipedia.org/wiki/Four_Symbols)
- [黄龍](https://en.wikipedia.org/wiki/Yellow_Dragon)
- [饕餮](https://en.wikipedia.org/wiki/Taotie)
- [クエレブレ](https://en.wikipedia.org/wiki/Cu%C3%A9lebre)
- [ニーズヘッグ](https://en.wikipedia.org/wiki/Nidhogg)

## 検証

`node tests/run.cjs challenges challenge-layout home-fit requested-changes learning`

時間切れ、遅い回答、クリア、再挑戦、1,100問継続、通常成績の分離、画面移動時のタイマー停止、40種の解説・画像、横長・スマートフォン、既存学習機能を確認。
