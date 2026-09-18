<header class="site-header" data-node-id="3566:19475">
    <div class="top-nav" data-node-id="3212:4949">
        <a class="top-nav__logo" href="/" aria-label="Warframe home">
            <img src="<?= e(asset_url('wf_logo')) ?>" alt="Warframe" width="199" height="30">
        </a>

        <button class="top-nav__burger" type="button" aria-label="Open menu" aria-expanded="false" data-nav-toggle>
            <span></span><span></span><span></span>
        </button>

        <div class="top-nav__end" data-nav-panel>
            <nav class="top-nav__links" aria-label="Primary">
                <?php foreach ($navLinks as $link): ?>
                    <a class="top-nav__link" href="<?= e($link['href']) ?>">
                        <?php if (!empty($link['badge'])): ?>
                            <span class="top-nav__badge"><?= e($link['badge']) ?></span>
                        <?php endif; ?>
                        <span><?= e($link['label']) ?></span>
                        <?php if (!empty($link['hasDropdown'])): ?>
                            <img class="top-nav__caret" src="<?= e(asset_url('arrow_drop_down')) ?>" alt="" width="20" height="20">
                        <?php endif; ?>
                    </a>
                <?php endforeach; ?>
            </nav>

            <div class="top-nav__actions">
                <a class="btn btn--accent" href="#play">Play Free Now</a>
                <a class="btn btn--login" href="#login">
                    <img src="<?= e(asset_url('login')) ?>" alt="" width="24" height="24">
                    <span>&lt;Log In&gt;</span>
                </a>
            </div>
        </div>
    </div>

    <nav class="subnav" aria-label="Hub sections" data-node-id="3566:19477">
        <?php foreach ($subnavLinks as $link): ?>
            <a
                class="subnav__link<?= !empty($link['active']) ? ' is-active' : '' ?>"
                href="<?= e($link['href']) ?>"
            ><?= e($link['label']) ?></a>
        <?php endforeach; ?>
    </nav>
</header>
