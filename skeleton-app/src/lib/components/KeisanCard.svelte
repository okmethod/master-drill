<script lang="ts">
  import type { KeisanTemplate } from "$lib/types/keisan";
  import { OperationType } from "$lib/types/keisan";
  import { generateRandomNumber, buildFormula } from "$lib/utils/keisan";

  export let data: KeisanTemplate;
  export let showAnswer: boolean = false;
  export let isCompact: boolean | undefined = undefined;
  export let isTrialInProgress: boolean | undefined = undefined;

  let x = generateRandomNumber(data.range, data.decimalPlaces);
  let y = generateRandomNumber(data.range, data.decimalPlaces);
  if (!data.allowNegative && data.operationType === OperationType.Sub && x < y) {
    [x, y] = [y, x]; // x と y の値を入れ替える
  }

  const { formula, answer } = buildFormula(x, y, data.operationType);

  const cCardAreaSize = isCompact
    ? "w-full lg:w-80 min-h-24 space-y-1"
    : "w-full md:w-80 lg:w-[450px] min-h-36 space-y-3";
  const cAnswerAreaSize = isCompact ? "w-32 h-10" : "w-60 h-16";
  const cTextSize = isCompact ? "text-lg lg:text-xl" : "text-2xl lg:text-3xl";
</script>

<div
  class="
    flex flex-col justify-center items-center
    border rounded bg-blue-100 p-2
    {cCardAreaSize}
  "
>
  <div class="font-mono {cTextSize}">{formula}</div>
  <div
    class="
      flex justify-center items-center bg-white border rounded {cAnswerAreaSize}
      {isTrialInProgress ? 'hidden' : ''}
    "
  >
    {#if showAnswer}
      <span class="font-mono">{answer}</span>
    {:else}
      <button on:click={() => (showAnswer = true)}>
        <span class="cButtonBlueStyle">こたえ</span>
      </button>
    {/if}
  </div>
</div>
