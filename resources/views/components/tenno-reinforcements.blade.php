<section class="tenno" data-node-id="3692:6276" data-animate="section">
    <div class="tenno__atmosphere" aria-hidden="true">
        <img class="tenno__wash" src="<?= e(asset_url('section_bg')) ?>" alt="">
        <img class="tenno__rain" src="<?= e(asset_url('black_rain')) ?>" alt="">
        <img class="tenno__smoke tenno__smoke--a" src="<?= e(asset_url('smoke')) ?>" alt="">
        <img class="tenno__smoke tenno__smoke--b" src="<?= e(asset_url('smoke')) ?>" alt="">
    </div>

    <div class="tenno__inner">
        <h2 class="heading-imbue heading-imbue--grad">Tenno Reinforcements</h2>

        <div class="tenno__feature">
            <div class="tenno__copy">
                <h3>Slot Machine Power Weapon Mechanic</h3>
                <p>
                    Lorem ipsum dolor sit amet consectetur. Pharetra sed sed enim lectus fermentum..
                    Metus quis nibh sed lectus sagittis fames.
                </p>
            </div>
            <div class="tenno__visual">
                <img src="<?= e(asset_url('tenno_mechanic')) ?>" alt="Slot machine power weapon" width="1097" height="944">
            </div>
        </div>

        <div class="tenno__grid">
            <?php foreach ($cards as $card): ?>
                <article class="mode-card" data-animate="card">
                    <div class="mode-card__media">
                        <img src="<?= e($card['image']) ?>" alt="">
                    </div>
                    <div class="mode-card__body" style="--noise: url('<?= e(asset_url('noise')) ?>')">
                        <h3><?= e($card['title']) ?></h3>
                        <p><?= e($card['body']) ?></p>
                        <a class="btn btn--ghost" href="#modes"><?= e($card['cta']) ?></a>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>
    </div>
</section>
