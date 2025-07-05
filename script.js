'use strict';

// クリックイベントの設定
$('#table_speaker').on('click', '.speaker', function () {

    const $td = $(this).closest('td');
    const $row = $td.closest('tr');
    const speechText = $row.find('td:nth-child(4)').text().trim(); // 英語列のテキストを取得

    const utterThis = new SpeechSynthesisUtterance(speechText);
    utterThis.rate = 0.90;
    utterThis.lang = 'en-US'; //chromeにはブラウザの言語が英語でないと初回再生されないバグがある

    window.speechSynthesis.cancel(); // 既存の音声をキャンセル
    window.speechSynthesis.speak(utterThis);

    console.log(speechText);
});

// ページロード時の処理
$(document).ready(function () {
    // 番号を自動で振る
    $('.row-number').each(function (index) {
        const val = $(this).text();
        if (val) return; // なんか入ってたらスキップ
        $(this).text(index + 1);
    });
});

// 表示切替トグル
document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const row = e.target.closest('tr');
        const cell = row.querySelector('.english-cell');
        cell.classList.toggle('visible');
        e.target.textContent = cell.classList.contains('visible') ? '非表示' : '表示';
    });
});