<section class="soundtrack" data-node-id="3693:6603" data-animate="section">
    <div class="soundtrack__atmosphere" aria-hidden="true">
        <img class="soundtrack__bg" src="<?= e(asset_url('soundtrack_bg')) ?>" alt="">
        <img class="soundtrack__fog soundtrack__fog--a fog-sway" src="<?= e(asset_url('smoke')) ?>" alt="" data-fog>
        <img class="soundtrack__fog soundtrack__fog--b fog-sway" src="<?= e(asset_url('smoke')) ?>" alt="" data-fog>
        <img class="soundtrack__fog soundtrack__fog--c fog-sway" src="<?= e(asset_url('smoke')) ?>" alt="" data-fog>
        <img class="soundtrack__fog soundtrack__fog--d fog-sway" src="<?= e(asset_url('smoke')) ?>" alt="" data-fog>
    </div>

    <div class="soundtrack__card" style="--noise: url('<?= e(asset_url('noise')) ?>')">
        <div class="soundtrack__top">
            <h2 class="heading-imbue heading-imbue--grad">
                Warframe:<br>
                Tau Official Soundtrack
            </h2>

            <div class="soundtrack__covers">
                <img
                    class="soundtrack__vinyl"
                    src="<?= e(asset_url('soundtrack_vinyl')) ?>"
                    alt=""
                    aria-hidden="true"
                    width="461"
                    height="461"
                >
                <img
                    class="soundtrack__album"
                    src="<?= e(asset_url('soundtrack_cover')) ?>"
                    alt="Official soundtrack cover"
                    width="461"
                    height="461"
                >
            </div>
        </div>

        <div class="soundtrack__links">
            <div class="soundtrack__col">
                <h3>Listen On:</h3>
                <?php foreach ($listenLinks as $i => $link): ?>
                    <a class="soundtrack__row<?= $i === count($listenLinks) - 1 ? ' soundtrack__row--tall' : '' ?>" href="<?= e($link['href']) ?>">
                        <img src="<?= e($link['icon']) ?>" alt="" width="35" height="36">
                        <span><?= e($link['label']) ?></span>
                    </a>
                <?php endforeach; ?>
            </div>
            <div class="soundtrack__col soundtrack__col--purchase">
                <h3>Purchase On:</h3>
                <?php foreach ($purchaseLinks as $link): ?>
                    <a class="soundtrack__row" href="<?= e($link['href']) ?>">
                        <img src="<?= e($link['icon']) ?>" alt="" width="35" height="36">
                        <span><?= e($link['label']) ?></span>
                    </a>
                <?php endforeach; ?>
                <div class="soundtrack__row soundtrack__row--spacer" aria-hidden="true"></div>
                <div class="soundtrack__row soundtrack__row--spacer soundtrack__row--tall" aria-hidden="true"></div>
            </div>
        </div>
    </div>
</section>
