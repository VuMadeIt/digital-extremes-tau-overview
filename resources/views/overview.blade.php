<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= e($pageTitle ?? 'Warframe Overview') ?></title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Imbue:opsz,wght@10..100,700&family=Roboto:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/css/overview.css">
</head>
<body class="overview-page" data-node-id="3566:19444">
    <?= component('navbar', [
        'navLinks' => $navLinks,
        'subnavLinks' => $subnavLinks,
    ]) ?>

    <div class="fx-rain" data-fx-rain aria-hidden="true">
        <canvas class="fx-rain__canvas" data-rain-canvas></canvas>
        <div class="fx-rain__hits" data-rain-hits></div>
    </div>
    <button
        type="button"
        class="fx-rain__toggle"
        data-rain-audio-toggle
        aria-pressed="false"
        title="Toggle rainfall ambience"
    >
        Rain audio off
    </button>

    <main id="overview">
        <?= component('hero') ?>
        <?= component('hub-nav', ['tiles' => $hubTiles]) ?>
        <?= component('update-summary', ['promoCards' => $promoCards]) ?>
        <?= component('starchart', ['planets' => $planets]) ?>
        <?= component('brysko', ['abilities' => $abilities]) ?>
        <?= component('tenno-reinforcements', ['cards' => $tennoCards]) ?>
        <?= component('qol', ['cards' => $qolCards]) ?>
        <?= component('soundtrack', [
            'listenLinks' => $listenLinks,
            'purchaseLinks' => $purchaseLinks,
        ]) ?>
    </main>

    <?= component('footer') ?>

    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
    <script src="/js/overview.js"></script>
</body>
</html>
