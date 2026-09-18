<section class="hub-nav" data-node-id="3586:994" data-animate="section">
    <div class="hub-nav__union" aria-hidden="true">
        <img src="<?= e(asset_url('hub_union')) ?>" alt="">
    </div>

    <div class="hub-nav__panel">
        <div class="hub-nav__bg" style="--hub-pattern: url('<?= e(asset_url('hub_pattern')) ?>')"></div>
        <div class="hub-nav__tiles">
            <?php foreach ($tiles as $tile): ?>
                <a class="hub-tile" href="<?= e($tile['href']) ?>" data-animate="card">
                    <div class="hub-tile__media">
                        <img src="<?= e($tile['image']) ?>" alt="">
                    </div>
                    <div class="hub-tile__footer" style="--noise: url('<?= e(asset_url('noise')) ?>')">
                        <span><?= e($tile['title']) ?></span>
                        <img src="<?= e(asset_url('arrow_1')) ?>" alt="" width="47" height="30">
                    </div>
                </a>
            <?php endforeach; ?>
        </div>
    </div>
</section>
