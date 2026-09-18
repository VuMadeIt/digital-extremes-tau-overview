<section class="hub-nav" data-node-id="3586:994" data-animate="section">
    <div class="hub-nav__stage">
        <div class="hub-nav__panel">
            <div class="hub-nav__bg" style="--hub-pattern: url('<?= e(asset_url('hub_pattern')) ?>')"></div>

            
            <div
                class="hub-nav__trim hub-nav__trim--bottom"
                style="--hub-trim: url('<?= e(asset_url('hub_border_trim')) ?>')"
                aria-hidden="true"
            ></div>

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

        
        <div class="hub-nav__frame hub-nav__frame--top" aria-hidden="true">
            <img src="<?= e(asset_url('hub_union')) ?>" alt="" width="1920" height="158">
        </div>

        
        <div class="hub-nav__edge hub-nav__edge--bottom" aria-hidden="true">
            <img src="<?= e(asset_url('hub_edge_bottom')) ?>" alt="" width="1920" height="39">
        </div>
    </div>
</section>
