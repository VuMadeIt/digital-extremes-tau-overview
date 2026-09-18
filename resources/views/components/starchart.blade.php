<section class="starchart" data-node-id="3694:6782" data-animate="section" data-rain-zone>
    <div class="starchart__atmosphere" aria-hidden="true">
        <img class="starchart__wash" src="<?= e(asset_url('section_bg')) ?>" alt="">
        <img class="starchart__rings" src="<?= e(asset_url('rings')) ?>" alt="">
        <img class="starchart__rain starchart__rain--tex" src="<?= e(asset_url('black_rain')) ?>" alt="">
        <img class="starchart__rain starchart__rain--tex starchart__rain--tex-b" src="<?= e(asset_url('black_rain')) ?>" alt="">
        <img class="starchart__smoke starchart__smoke--left fog-sway" src="<?= e(asset_url('smoke')) ?>" alt="" data-fog>
        <img class="starchart__smoke starchart__smoke--right fog-sway" src="<?= e(asset_url('smoke')) ?>" alt="" data-fog>
    </div>

    <div class="starchart__intro">
        <div class="starchart__intro-copy">
            <h2 class="heading-imbue heading-imbue--xl">Tau’s Starchart</h2>
            <p>
                Description of update lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur rutrum ullamcorper iaculis. Nunc ac mauris erat. Nullam ac tempus urna,
                at fringilla libero. Duis neque est, venenatis auctor elementum sit amet,
                Description of update lorem
            </p>
        </div>
        <div class="starchart__map" data-rain-surface>
            <img src="<?= e(asset_url('starchart_map')) ?>" alt="Tau starchart map">
        </div>
    </div>

    <div class="planets">
        <?php foreach ($planets as $planet): ?>
            <article
                id="<?= e($planet['id']) ?>"
                class="planet planet--<?= e($planet['align']) ?> planet--<?= e($planet['id']) ?>"
                data-animate="planet"
            >
                <div class="planet__copy">
                    <h3 class="heading-imbue heading-imbue--lg"><?= e($planet['name']) ?></h3>
                    <p><?= e($planet['body']) ?></p>
                    <a class="btn btn--primary" href="#<?= e($planet['id']) ?>"><?= e($planet['cta']) ?></a>
                </div>

                <div class="planet__visual" data-rain-surface>
                    <img
                        class="planet__image"
                        src="<?= e($planet['image']) ?>"
                        alt="<?= e($planet['name']) ?>"
                        width="<?= (int) ($planet['imgW'] ?? 1107) ?>"
                        height="<?= (int) ($planet['imgH'] ?? 676) ?>"
                    >
                    <?php if (!empty($planet['rocks'])): ?>
                        <img
                            class="planet__rocks"
                            src="<?= e($planet['rocks']) ?>"
                            alt=""
                            aria-hidden="true"
                            width="693"
                            height="594"
                        >
                    <?php endif; ?>
                    <?php if (!empty($planet['structures'])): ?>
                        <?php foreach ($planet['structures'] as $i => $structure): ?>
                            <img
                                class="planet__structure planet__structure--<?= $i + 1 ?>"
                                src="<?= e($structure) ?>"
                                alt=""
                                aria-hidden="true"
                            >
                        <?php endforeach; ?>
                    <?php endif; ?>
                    <img class="planet__fog fog-sway" src="<?= e(asset_url('smoke')) ?>" alt="" aria-hidden="true" data-fog>
                </div>
            </article>
        <?php endforeach; ?>
    </div>
</section>
