import { goto } from "$app/navigation";
import { GITHUB_REPO_URL } from "$lib/constants/common";

export interface ContentButtonProps {
  title: string;
  onClick: () => void;
}

interface Content {
  title: string;
  action: "navigate" | "redirect";
  route: string;
}

const contents: Content[] = [
  {
    title: "漢字マスタードリル",
    action: "navigate",
    route: "/kanji",
  },
  {
    title: "計算マスタードリル",
    action: "navigate",
    route: "/keisan",
  },
  {
    title: "github repository",
    action: "redirect",
    route: GITHUB_REPO_URL,
  },
];

export async function load() {
  const propsArray: ContentButtonProps[] = contents.map((content) => ({
    title: content.title,
    onClick: _getOnClick(content.action, content.route),
  }));

  function _getOnClick(action: string, route: string): () => void {
    const actions: { [key: string]: () => void } = {
      navigate: () => goto(route),
      redirect: () => window.open(route, "_blank"),
    };
    return actions[action] || (() => {});
  }

  return { propsArray };
}
