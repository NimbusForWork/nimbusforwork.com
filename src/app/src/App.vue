<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@charset "utf-8";

// Import a Google Font
@import url('https://fonts.googleapis.com/css?family=Poppins');

// Set your brand colors
$blue: #0D6EAC;

// Update Bulma's global variables
$family-sans-serif: "Poppins", sans-serif;
$primary: $blue;
$body-size: 14px;

// Import only what you need from Bulma
@import "../node_modules/bulma/bulma.sass";
@import "../node_modules/bulma-extensions/bulma-checkradio/dist/css/bulma-checkradio.sass";
@import "../node_modules/bulma-extensions/bulma-slider/dist/css/bulma-slider.sass";
@import "../node_modules/bulma-extensions/bulma-divider/dist/css/bulma-divider.sass";

// SPACING CSS - see usage: https://github.com/jgthms/bulma/issues/451#issuecomment-331758839
$sizeUnit: rem;
$marginKey: 'm';
$paddingKey: 'p';
$separator: '-';
$sizes: (
    ('none', 0),
    ('xxs', 0.125),
    ('xs', 0.25),
    ('sm', 0.5),
    ('md', 1),
    ('lg', 2),
    ('xl', 4),
    ('xxl', 8),
);
$positions: (
    ('t', 'top'),
    ('r', 'right'),
    ('b', 'bottom'),
    ('l', 'left')
);

@function sizeValue($key, $value) {
    @return if($key == 'none', 0, $value + $sizeUnit);
}

@each $size in $sizes {
    $sizeKey: nth($size, 1);
    $sizeValue: nth($size, 2);
    .#{$marginKey}#{$separator}#{$sizeKey} {
        margin: sizeValue($sizeKey, $sizeValue) !important;
    }
    .#{$paddingKey}#{$separator}#{$sizeKey} {
        padding: sizeValue($sizeKey, $sizeValue) !important;
    }
    @each $position in $positions {
        $posKey: nth($position, 1);
        $posValue: nth($position, 2);
        .#{$marginKey}#{$separator}#{$posKey}#{$separator}#{$sizeKey} {
            margin-#{$posValue}: sizeValue($sizeKey, $sizeValue) !important;
        }
        .#{$paddingKey}#{$separator}#{$posKey}#{$separator}#{$sizeKey} {
            padding-#{$posValue}: sizeValue($sizeKey, $sizeValue) !important;
        }
    }
}
// end spacing

html, body, #app {
  min-height: 100vh;
}
</style>
