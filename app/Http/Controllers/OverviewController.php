<?php

namespace App\Http\Controllers;

class OverviewController
{
    public function index(): string
    {
        $data = [
            'pageTitle' => 'Warframe | Tau Overview',
            'navLinks' => [
                ['label' => 'Game', 'href' => '#game', 'hasDropdown' => true],
                ['label' => 'Store', 'href' => '#store', 'hasDropdown' => true, 'badge' => 'new'],
                ['label' => 'News & Info', 'href' => '#news', 'hasDropdown' => true],
                ['label' => 'Community', 'href' => '#community', 'hasDropdown' => true],
            ],
            'subnavLinks' => [
                ['label' => 'Overview', 'href' => '#overview', 'active' => true],
                ['label' => 'Fornax', 'href' => '#fornax', 'active' => false],
                ['label' => 'Perita', 'href' => '#perita', 'active' => false],
                ['label' => 'Events', 'href' => '#events', 'active' => false],
                ['label' => 'Packs & Merch', 'href' => '#packs', 'active' => false],
            ],
            'hubTiles' => [
                [
                    'title' => 'Packs & Merch',
                    'image' => asset_url('hub_tile_1'),
                    'href' => '#packs',
                ],
                [
                    'title' => 'Events',
                    'image' => asset_url('hub_tile_2'),
                    'href' => '#events',
                ],
                [
                    'title' => 'Portau',
                    'image' => asset_url('hub_tile_3'),
                    'href' => '#portau',
                ],
            ],
            'promoCards' => [
                [
                    'title' => 'Are You Ready To Explore Tau?',
                    'body' => 'Starting September 27, log in to claim Banshee! Jump into this limited time deal.',
                    'cta' => 'Log In',
                    'image' => asset_url('check_thumb'),
                    'href' => '#login',
                ],
                [
                    'title' => 'Road To Tau',
                    'body' => 'Starting September 27, log in to claim Banshee! Jump into this limited time deal.',
                    'cta' => 'Explore',
                    'image' => asset_url('tau_thumb'),
                    'href' => '#road',
                ],
            ],
            'planets' => [
                [
                    'id' => 'fornax',
                    'name' => 'Fornax',
                    'body' => 'Lorem ipsum dolor sit amet consectetur. Id pellentesque quis id pellentesque. Turpis arcu nec massa integer et enim odio faucibus amet. Lorem ipsum dolor sit amet consectetur. Id pellentesque quis id pellentesque. Turpis arcu nec massa integer et enim odio faucibus amet.',
                    'cta' => 'Explore Fornax',
                    'image' => asset_url('planet_fornax'),
                    'align' => 'left',
                    'imgW' => 1171,
                    'imgH' => 1353,
                    'structures' => [
                        asset_url('sentient_structure'),
                        asset_url('sentient_structure'),
                    ],
                ],
                [
                    'id' => 'perita',
                    'name' => 'Perita',
                    'body' => 'Lorem ipsum dolor sit amet consectetur. Id pellentesque quis id pellentesque. Turpis arcu nec massa integer et enim odio faucibus amet. Lorem ipsum dolor sit amet consectetur. Id pellentesque quis id pellentesque. Turpis arcu nec massa integer et enim odio faucibus amet.',
                    'cta' => 'Explore Perita',
                    'image' => asset_url('planet_perita'),
                    'align' => 'right',
                    'imgW' => 1132,
                    'imgH' => 1567,
                    'rocks' => asset_url('rocks_dust'),
                ],
            ],
            'abilities' => [
                ['name' => 'Cold Case', 'type' => 'PASSIVE.', 'icon' => asset_url('passive'), 'body' => 'Lorem ipsum dolor sit amet consectetur. Pharetra sed sed enim lectus fermentum. Metus quis nibh sed lectus sagittis fames.'],
                ['name' => 'Interrogate', 'type' => 'ABILITY 1.', 'icon' => asset_url('ability_1'), 'body' => 'Lorem ipsum dolor sit amet consectetur. Pharetra sed sed enim lectus fermentum. Metus quis nibh sed lectus sagittis fames.'],
                ['name' => 'Lead Trace', 'type' => 'ABILITY 2.', 'icon' => asset_url('ability_2'), 'body' => 'Lorem ipsum dolor sit amet consectetur. Pharetra sed sed enim lectus fermentum. Metus quis nibh sed lectus sagittis fames.'],
                ['name' => 'Containment', 'type' => 'ABILITY 3.', 'icon' => asset_url('ability_3'), 'body' => 'Lorem ipsum dolor sit amet consectetur. Pharetra sed sed enim lectus fermentum. Metus quis nibh sed lectus sagittis fames.'],
                ['name' => 'Final Verdict', 'type' => 'ABILITY 4.', 'icon' => asset_url('ability_4'), 'body' => 'Lorem ipsum dolor sit amet consectetur. Pharetra sed sed enim lectus fermentum. Metus quis nibh sed lectus sagittis fames.'],
            ],
            'tennoCards' => [
                [
                    'title' => 'Fornax Game Modes',
                    'body' => 'Lorem ipsum dolor sit amet consectetur. Pharetra sed sed enim lectus fermentum.. Metus quis nibh sed lectus sagittis fames.',
                    'image' => asset_url('tenno_card_1'),
                    'cta' => 'Learn More',
                ],
                [
                    'title' => 'Perita Game Modes',
                    'body' => 'Lorem ipsum dolor sit amet consectetur. Pharetra sed sed enim lectus fermentum.. Metus quis nibh sed lectus sagittis fames.',
                    'image' => asset_url('tenno_card_3'),
                    'cta' => 'Learn More',
                ],
            ],
            'qolCards' => [
                [
                    'title' => 'Nidus Retouch',
                    'body' => 'Lorem ipsum dolor sit amet consectetur. Pharetra sed sed enim lectus fermentum.. Metus quis nibh sed lectus sagittis fames.',
                    'image' => asset_url('qol_1b'),
                ],
                [
                    'title' => 'Focus School Expansion',
                    'body' => 'Lorem ipsum dolor sit amet consectetur. Pharetra sed sed enim lectus fermentum.. Metus quis nibh sed lectus sagittis fames.',
                    'image' => asset_url('qol_2b'),
                ],
                [
                    'title' => 'Appearance Remaster',
                    'body' => 'Lorem ipsum dolor sit amet consectetur. Pharetra sed sed enim lectus fermentum.. Metus quis nibh sed lectus sagittis fames.',
                    'image' => asset_url('qol_3b'),
                ],
                [
                    'title' => 'Riven System Changes',
                    'body' => 'Lorem ipsum dolor sit amet consectetur. Pharetra sed sed enim lectus fermentum.. Metus quis nibh sed lectus sagittis fames.',
                    'image' => asset_url('qol_4'),
                ],
            ],
            'listenLinks' => [
                ['label' => 'Apple Music', 'icon' => asset_url('apple_music'), 'href' => '#'],
                ['label' => 'Spotify', 'icon' => asset_url('spotify'), 'href' => '#'],
                ['label' => 'YouTube', 'icon' => asset_url('youtube'), 'href' => '#'],
            ],
            'purchaseLinks' => [
                ['label' => 'Bandcamp', 'icon' => asset_url('bandcamp'), 'href' => '#'],
            ],
        ];

        return view('overview', $data);
    }
}
