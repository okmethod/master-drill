<script lang="ts">
  import type { SlotTabSetting } from "$lib/types/tabSetting";
  import ContentsTabGroup from "$lib/components/ContentsTabGroup.svelte";

  export let data: {
    slotTabSettings: SlotTabSetting[];
  };
  const tabSettings = data.slotTabSettings;

  let currentTabIndex = 0;
</script>

<div class="cRouteBodyStyle">
  <!-- タイトル部 -->
  <div class="cTitlePartStyle flex flex-col md:flex-row justify-center items-center">
    <h1 class="cTitleStyle md:!text-3xl">計算マスタードリル</h1>
  </div>

  <!-- コンテンツ部 -->
  <ContentsTabGroup
    bind:currentTabIndex
    {tabSettings}
    navigatePathPrefix="/keisan"
    cContainer="w-full"
    cPanel="max-h-[calc(100vh-12rem)] overflow-y-auto"
  >
    <slot />
  </ContentsTabGroup>
</div>
