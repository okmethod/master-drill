<script lang="ts">
  import { getContext, onDestroy } from "svelte";
  import type { Writable } from "svelte/store";
  import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
  import { slide } from "svelte/transition";
  import Icon from "@iconify/svelte";
  import type { KanjiData, KanjiMode } from "$lib/types/kanji";
  import KanjiCard from "$lib/components/KanjiCard.svelte";

  export let data: {
    kanjiDataArray: KanjiData[];
  };

  let showAnswer = false;
  function resetShowAnswers() {
    // 再描画をトリガーするため、別の値にしてから false に戻す
    showAnswer = true;
    showAnswer = false;
  }

  let currentMode: KanjiMode = "yomi";
  const modeStore = getContext<Writable<KanjiMode>>("mode");
  const unsubscribe = modeStore.subscribe((value) => {
    currentMode = value;
    resetShowAnswers();
  });
  onDestroy(() => {
    unsubscribe();
  });
</script>

<div class="cContentPartStyle !m-4">
  <Accordion
    width="w-[300px] md:w-[600px] lg:w-[1000px]"
    rounded="rounded-lg"
    hover="hover:underline"
    transitions={true}
    transitionIn={slide}
    transitionInParams={{ duration: 300 }}
    transitionOut={slide}
    transitionOutParams={{ duration: 300 }}
  >
    {#each data.kanjiDataArray as kanjiData}
      <div class="border rounded">
        <AccordionItem>
          <svelte:fragment slot="lead">
            <Icon icon="mdi:book-open-variant-outline" class="text-black" />
          </svelte:fragment>
          <svelte:fragment slot="summary">
            <h2 class="text-xl font-bold">{kanjiData.title}</h2>
          </svelte:fragment>
          <svelte:fragment slot="content">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {#each kanjiData.data as row}
                <KanjiCard data={row} showKanji={currentMode === "yomi"} {showAnswer} isCompact={true} />
              {/each}
            </div>
          </svelte:fragment>
        </AccordionItem>
      </div>
    {/each}
  </Accordion>
</div>
