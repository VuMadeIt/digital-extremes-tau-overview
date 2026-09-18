<section class="brysko" data-node-id="3611:6771" data-animate="section">
    <div class="brysko__stage">
        <img class="brysko__bg" src="<?= e(asset_url('brysko_bg')) ?>" alt="">
        <div class="brysko__scrim"></div>

        <div class="brysko__frame brysko__frame--top" aria-hidden="true">
            <img src="<?= e(asset_url('divider_jagged')) ?>" alt="">
        </div>
        <div class="brysko__frame brysko__frame--bottom" aria-hidden="true">
            <img src="<?= e(asset_url('divider_jagged')) ?>" alt="">
        </div>

        <div class="brysko__content">
            <div class="brysko__titles">
                <h2 class="brysko__name">Brysko</h2>
                <p class="brysko__role">The Detective Warframe</p>
                <p class="brysko__body">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua et dolore magna aliqua. Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    elaim labore et dolore magna aliqua et magna et astra aliqua.
                </p>
            </div>

            <div class="ability-panel" data-ability-panel>
                <div class="ability-panel__icons" role="tablist" aria-label="Brysko abilities">
                    <?php foreach ($abilities as $index => $ability): ?>
                        <button
                            class="ability-panel__icon<?= $index === 0 ? ' is-active' : '' ?>"
                            type="button"
                            role="tab"
                            aria-selected="<?= $index === 0 ? 'true' : 'false' ?>"
                            data-ability-tab="<?= $index ?>"
                        >
                            <span class="ability-panel__ring" aria-hidden="true"></span>
                            <img src="<?= e($ability['icon']) ?>" alt="<?= e($ability['name']) ?>" width="51" height="51">
                        </button>
                    <?php endforeach; ?>
                </div>

                <div class="ability-panel__card" style="--noise: url('<?= e(asset_url('ability_card')) ?>')">
                    <?php foreach ($abilities as $index => $ability): ?>
                        <div
                            class="ability-panel__detail<?= $index === 0 ? ' is-active' : '' ?>"
                            data-ability-panel-item="<?= $index ?>"
                            role="tabpanel"
                        >
                            <h3><?= e($ability['name']) ?></h3>
                            <p>
                                <em><?= e($ability['type']) ?></em>
                                <?= e($ability['body']) ?>
                            </p>
                        </div>
                    <?php endforeach; ?>
                </div>

                <p class="ability-panel__note">* Abilities are subject to change during development.</p>

                <div class="brysko__actions">
                    <a class="btn btn--primary" href="#buy">Buy Now</a>
                    <a class="btn btn--ghost" href="#learn">Learn More</a>
                </div>
            </div>
        </div>
    </div>
</section>
