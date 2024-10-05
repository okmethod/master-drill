import type { LoadEvent } from "@sveltejs/kit";
import type { kanjiCsv } from "$lib/types/csv";
import { loadCsv } from "$lib/utils/loadfile";

export interface ContentProps {
  title: string;
  data: kanjiCsv[];
}

interface Content {
  title: string;
  path: string;
}

const contents: Content[] = [
  {
    title: "1級・2級の漢字",
    path: "kanji/grade1and2.csv",
  },
  {
    title: "3級・4級の漢字",
    path: "kanji/grade3and4.csv",
  },
  {
    title: "5級・6級の漢字",
    path: "kanji/grade5and6.csv",
  },
  {
    title: "7級・8級の漢字",
    path: "kanji/grade7and8.csv",
  },
  {
    title: "9級・10級の漢字",
    path: "kanji/grade9and10.csv",
  },
  {
    title: "印西市の漢字",
    path: "kanji/inzai.csv",
  },
];

export async function load({ fetch }: LoadEvent) {
  const dataArrays = await Promise.all(contents.map((content) => loadCsv(fetch, content.path)));

  const propsArray = contents.map((content, index) => ({
    title: content.title,
    data: dataArrays[index] as kanjiCsv[],
  }));

  return { propsArray };
}