<section class="qol" data-node-id="3692:6445" data-animate="section">
    <?php /* z0 — section wash (behind everything) */ ?>
    <div class="qol__bg" aria-hidden="true">
        <div class="qol__bg-fill"></div>
        <div class="qol__bg-tex" style="--qol-texture: url('<?= e(asset_url('qol_texture')) ?>')"></div>
    </div>

    <?php /* z1 — Figma fence (top) + back (bottom), -1.9°, no clip at y=0 */ ?>
    <div class="qol__shingle qol__shingle--fence" aria-hidden="true">
        <img src="<?= e(asset_url('qol_fence')) ?>" alt="" width="1954" height="447">
    </div>
    <div class="qol__shingle qol__shingle--back" aria-hidden="true">
        <img src="<?= e(asset_url('qol_back')) ?>" alt="" width="1920" height="439">
    </div>

    <?php /* z3 — heading + cards (above dividers) */ ?>
    <div class="qol__inner">
        <h2 class="heading-imbue heading-imbue--grad qol__title">Quality Of Life</h2>

        <div class="qol__grid">
            <?php foreach ($cards as $index => $card): ?>
                <article class="qol-card<?= !empty($card['thick']) ? ' qol-card--thick' : '' ?>" data-animate="card">
                    <div class="qol-card__media">
                        <?php foreach (($card['layers'] ?? [$card['image']]) as $layer): ?>
                            <img src="<?= e($layer) ?>" alt="" width="868" height="488">
                        <?php endforeach; ?>
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
