import type { LoadEvent } from "@sveltejs/kit";
import type { KeisanData, KeisanTemplate, KeisanPortfolio } from "$lib/types/keisan";

const gradePortfolios: KeisanPortfolio[] = [
  {
    title: "小学2年生の計算",
    portfolio: [
      { label: "2桁のたし算", count: 2 },
      { label: "3桁のたし算", count: 2 },
      { label: "2桁のひき算", count: 2 },
      { label: "3桁のひき算", count: 2 },
      { label: "1桁のかけ算", count: 8 },
    ],
  },
  {
    title: "小学3年生の計算",
    portfolio: [
      { label: "3桁のたし算", count: 1 },
      { label: "小数のたし算", count: 1 },
      { label: "3桁のひき算", count: 1 },
      { label: "小数のひき算", count: 1 },
      { label: "2桁のかけ算", count: 4 },
      { label: "2桁のわり算", count: 4 },
    ],
  },
  {
    title: "小学4年生の計算",
    portfolio: [
      { label: "3桁のたし算", count: 1 },
      { label: "小数のたし算", count: 1 },
      { label: "3桁のひき算", count: 1 },
      { label: "小数のひき算", count: 1 },
      { label: "3桁のかけ算", count: 2 },
      { label: "小数のかけ算", count: 2 },
      { label: "2桁のわり算", count: 2 },
      { label: "3桁のわり算", count: 2 },
    ],
  },
  {
    title: "小学5年生の計算",
    portfolio: [
      { label: "小数のたし算", count: 2 },
      { label: "小数のひき算", count: 2 },
      { label: "3桁のかけ算", count: 1 },
      { label: "小数のかけ算", count: 2 },
      { label: "3桁のわり算", count: 1 },
      { label: "小数のわり算", count: 2 },
    ],
  },
  {
    title: "小学6年生の計算",
    portfolio: [
      { label: "小数のたし算", count: 1 },
      { label: "小数のひき算", count: 1 },
      { label: "3桁のかけ算", count: 2 },
      { label: "小数のかけ算", count: 2 },
      { label: "3桁のわり算", count: 2 },
      { label: "小数のわり算", count: 2 },
    ],
  },
];

export async function load({ parent }: LoadEvent): Promise<{
  keisanTemplates: KeisanTemplate[];
  gradePortfolios: KeisanPortfolio[];
}> {
  const parentData = await parent();
  const keisanDataArray: KeisanData[] = parentData.keisanDataArray;
  const keisanTemplates: KeisanTemplate[] = keisanDataArray.flatMap((keisanData) => keisanData.data);

  return { keisanTemplates, gradePortfolios };
}
