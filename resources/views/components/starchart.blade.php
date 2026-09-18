<section class="starchart" data-node-id="3694:6782" data-animate="section">
    <div class="starchart__atmosphere" aria-hidden="true">
        <img class="starchart__wash" src="<?= e(asset_url('section_bg')) ?>" alt="">
        <img class="starchart__rings" src="<?= e(asset_url('rings')) ?>" alt="">
        <img class="starchart__rain" src="<?= e(asset_url('black_rain')) ?>" alt="">
        <img class="starchart__smoke starchart__smoke--left" src="<?= e(asset_url('smoke')) ?>" alt="">
        <img class="starchart__smoke starchart__smoke--right" src="<?= e(asset_url('smoke')) ?>" alt="">
    </div>

    <div class="starchart__intro">
        <h2 class="heading-imbue heading-imbue--xl">Tau’s Starchart</h2>
        <p>
            Description of update lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Curabitur rutrum ullamcorper iaculis. Nunc ac mauris erat. Nullam ac tempus urna,
            at fringilla libero. Duis neque est, venenatis auctor elementum sit amet,
            Description of update lorem
        </p>
        <div class="starchart__map">
            <img src="<?= e(asset_url('starchart_map')) ?>" alt="Tau starchart map">
        </div>
    </div>

    <div class="planets">
        <?php foreach ($planets as $planet): ?>
            <article
                id="<?= e($planet['id']) ?>"
                class="planet planet--<?= e($planet['align']) ?>"
                data-animate="planet"
            >
                <div class="planet__copy">
                    <h3 class="heading-imbue heading-imbue--lg"><?= e($planet['name']) ?></h3>
                    <p><?= e($planet['body']) ?></p>
                    <a class="btn btn--primary" href="#<?= e($planet['id']) ?>"><?= e($planet['cta']) ?></a>
                </div>
                <div class="planet__visual">
                    <img class="planet__image" src="<?= e($planet['image']) ?>" alt="<?= e($planet['name']) ?>">
                    <span class="planet__node" style="--x:22%; --y:28%"></span>
                    <span class="planet__node" style="--x:38%; --y:46%"></span>
                    <span class="planet__node" style="--x:58%; --y:62%"></span>
                    <span class="planet__node" style="--x:48%; --y:78%"></span>
                </div>
            </article>
        <?php endforeach; ?>
    </div>
</section>
