<script lang="ts">
  import IconButton from "$lib/components/buttons/IconButton.svelte";
  import { isIconConfig, type TransitionButtonConfig } from "$lib/utils/transitions";

  export let data: {
    buttonConfigs: Array<TransitionButtonConfig>;
  };
</script>

<div class="cPageBodyStyle">
  <div class="cTitlePartStyle">
    <h1 class="cTitleLabelStyle">自学マスタードリル</h1>
  </div>

  <div class="cPageBodyStyle">
    {#each data.buttonConfigs as config}
      <IconButton
        icon={isIconConfig(config.symbol) ? config.symbol.icon : "mdi:circle-small"}
        label={config.label}
        cButton="w-72 md:w-96 !text-lg md:!text-2xl mx-1 font-bold cSurfaceBg cPrimaryText cSurfaceBorder"
        onClick={config.onClick}
      />
    {/each}
  </div>
</div>
