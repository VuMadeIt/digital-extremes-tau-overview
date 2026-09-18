<section class="qol" data-node-id="3692:6445" data-animate="section">
    <div class="qol__bg" style="--qol-texture: url('<?= e(asset_url('qol_texture')) ?>')"></div>
    <img class="qol__edge section-divider--top" src="<?= e(asset_url('divider_2')) ?>" alt="" aria-hidden="true">
    <img class="qol__edge section-divider--bottom" src="<?= e(asset_url('divider_1')) ?>" alt="" aria-hidden="true">

    <div class="qol__inner">
        <h2 class="heading-imbue heading-imbue--grad">QOL</h2>

        <div class="qol__grid">
            <?php foreach ($cards as $card): ?>
                <article class="qol-card" data-animate="card">
                    <div class="qol-card__media">
                        <img src="<?= e($card['image']) ?>" alt="" width="867" height="487">
                    </div>
                    <div class="qol-card__body" style="--noise: url('<?= e(asset_url('noise')) ?>')">
                        <h3 class="heading-roboto-grad"><?= e($card['title']) ?></h3>
                        <p><?= e($card['body']) ?></p>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>
    </div>
</section>
