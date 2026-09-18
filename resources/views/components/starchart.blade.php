<section class="starchart" data-node-id="3694:6782" data-animate="section" data-rain-zone="starchart" data-rain-audio-zone>
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
        <div class="starchart__map" data-rain-border>
            <img src="<?= e(asset_url('starchart_map')) ?>" alt="Tau starchart map">
        </div>
    </div>

    {{-- Planets: Figma frame 3599:6418 — page coords relative to y=4495 --}}
    <div class="planets" data-node-id="3599:6418">
        {{-- Fornax smoke (behind) --}}
        <img
            class="planets__smoke planets__smoke--fornax-a fog-sway"
            src="<?= e(asset_url('smoke')) ?>"
            alt=""
            aria-hidden="true"
            data-fog
        >
        <img
            class="planets__smoke planets__smoke--fornax-b fog-sway"
            src="<?= e(asset_url('smoke')) ?>"
            alt=""
            aria-hidden="true"
            data-fog
        >

        {{-- Fornax planet + markers --}}
        <div class="planets__fornax-art">
            <img
                class="planets__fornax-planet"
                src="<?= e(asset_url('planet_fornax')) ?>"
                alt="Fornax"
                width="2214"
                height="1353"
            >
            <span class="planets__marker" style="left: 195.75px; top: 211px;" aria-hidden="true"></span>
            <span class="planets__marker" style="left: 26px; top: 526px;" aria-hidden="true"></span>
            <span class="planets__marker" style="left: 601px; top: 961px;" aria-hidden="true"></span>
            <span class="planets__marker" style="left: 794px; top: 1196px;" aria-hidden="true"></span>
        </div>

        <img
            class="planets__structure planets__structure--a"
            src="<?= e(asset_url('sentient_structure')) ?>"
            alt=""
            aria-hidden="true"
            width="265"
            height="466"
        >
        <img
            class="planets__structure planets__structure--b"
            src="<?= e(asset_url('sentient_structure_b')) ?>"
            alt=""
            aria-hidden="true"
            width="524"
            height="361"
        >

        <div class="planets__copy planets__copy--fornax">
            <h3 class="heading-imbue heading-imbue--lg">Fornax</h3>
            <p>
                Lorem ipsum dolor sit amet consectetur. Id pellentesque quis id pellentesque.
                Turpis arcu nec massa integer et enim odio faucibus amet. Lorem ipsum dolor sit amet
                consectetur. Id pellentesque quis id pellentesque. Turpis arcu nec massa integer et
                enim odio faucibus amet.
            </p>
            <a class="btn btn--primary planet__cta" href="#fornax">Explore Fornax</a>
        </div>

        {{-- Perita smoke --}}
        <img
            class="planets__smoke planets__smoke--perita-a fog-sway"
            src="<?= e(asset_url('smoke')) ?>"
            alt=""
            aria-hidden="true"
            data-fog
        >
        <img
            class="planets__smoke planets__smoke--perita-b fog-sway"
            src="<?= e(asset_url('smoke')) ?>"
            alt=""
            aria-hidden="true"
            data-fog
        >

        <div class="planets__perita-art">
            <img
                class="planets__perita-planet"
                src="<?= e(asset_url('planet_perita')) ?>"
                alt="Perita"
                width="1113"
                height="1105"
            >
            <span class="planets__marker" style="left: 816px; top: 353px;" aria-hidden="true"></span>
            <span class="planets__marker" style="left: 1109px; top: 595px;" aria-hidden="true"></span>
            <span class="planets__marker" style="left: 756px; top: 878px;" aria-hidden="true"></span>
            <span class="planets__marker" style="left: 936px; top: 1176px;" aria-hidden="true"></span>
        </div>

        <img
            class="planets__rocks"
            src="<?= e(asset_url('rocks_dust')) ?>"
            alt=""
            aria-hidden="true"
            width="1195"
            height="702"
        >

        <div class="planets__copy planets__copy--perita" id="perita">
            <h3 class="heading-imbue heading-imbue--lg">Perita</h3>
            <p>
                Lorem ipsum dolor sit amet consectetur. Id pellentesque quis id pellentesque.
                Turpis arcu nec massa integer et enim odio faucibus amet. Lorem ipsum dolor sit amet
                consectetur. Id pellentesque quis id pellentesque. Turpis arcu nec massa integer et
                enim odio faucibus amet.
            </p>
            <a class="btn btn--primary planet__cta" href="#perita">Explore Perita</a>
        </div>

        <span id="fornax" class="planets__anchor" aria-hidden="true"></span>
    </div>
</section>
