<section class="update-summary" data-node-id="3694:6781" data-animate="section">
    <div class="update-summary__stage">
        <?php /* Cinematic art extends through cards + divider spikes (masked) */ ?>
        <img class="update-summary__bg" src="<?= e(asset_url('update_summary_bg')) ?>" alt="">
        <div class="update-summary__shade"></div>

        <div class="update-summary__copy">
            <h2 class="heading-imbue">Update Summary</h2>
            <p>
                Description of update lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur rutrum ullamcorper iaculis. Nunc ac mauris erat. Nullam ac tempus urna,
                at fringilla libero. Duis neque est, venenatis auctor elementum sit amet,
                Description of update lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur rutrum ullamcorper iaculis. Nunc ac mauris erat. Nullam ac tempus urna,
                at fringilla libero. Duis neque est, venenatis auctor elementum sit amet,
            </p>
        </div>

        <?php /* Warframe0058 ledge — transparent voids; spikes define the seam to Starchart */ ?>
        <div class="update-summary__divider" data-node-id="3589:6386" aria-hidden="true">
            <img
                class="update-summary__divider-img"
                src="<?= e(asset_url('divider')) ?>"
                alt=""
                width="1925"
                height="573"
            >
        </div>

        <?php /* Promo cards sit on the cinematic, above the hanging spikes */ ?>
        <div class="update-summary__cards" data-node-id="3694:6780">
            <?php foreach ($promoCards as $card): ?>
                <article class="promo-card" data-animate="card">
                    <div class="promo-card__media">
                        <img src="<?= e($card['image']) ?>" alt="">
                    </div>
                    <div class="promo-card__body" style="--noise: url('<?= e(asset_url('noise')) ?>')">
                        <h3><?= e($card['title']) ?></h3>
                        <p><?= e($card['body']) ?></p>
                        <a class="btn btn--ghost" href="<?= e($card['href']) ?>"><?= e($card['cta']) ?></a>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>
    </div>
</section>
