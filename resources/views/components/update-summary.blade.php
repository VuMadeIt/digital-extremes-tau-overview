<section class="update-summary" data-node-id="3694:6781" data-animate="section">
    <div class="update-summary__stage">
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

        <div class="update-summary__divider" aria-hidden="true">
            <img src="<?= e(asset_url('divider_bone')) ?>" alt="">
        </div>

        <div class="update-summary__cards">
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
