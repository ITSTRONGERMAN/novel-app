"use strict";
const splitCurrentChapterContent = (novelText, pageSize) => {
  let startIndex = 0;
  let fragmentId = 0;
  const fragments = [];
  while (startIndex < novelText.length) {
    let endIndex = startIndex + pageSize;
    while (endIndex < novelText.length && !isCompleteHtmlTagAt(novelText, endIndex)) {
      endIndex++;
    }
    const fragment = novelText.slice(startIndex, endIndex).replace(/<h1.*?>.*?<\/h1>/g, "");
    fragments.push({
      id: fragmentId++,
      content: fragment
    });
    startIndex = endIndex;
  }
  return fragments;
};
const isCompleteHtmlTagAt = (text, index) => {
  const tagPairs = [
    ["<p>", "</p>"],
    ["<h1>", "</h1>"],
    ["<div>", "</div>"],
    ["<span>", "</span>"],
    ["<ul>", "</ul>"],
    ["<li>", "</li>"],
    ["<a>", "</a>"]
  ];
  for (const [openTag, closeTag] of tagPairs) {
    if (text.slice(index).startsWith(openTag)) {
      const closeTagIndex = text.indexOf(closeTag, index + openTag.length);
      if (closeTagIndex > index) {
        return false;
      }
    }
  }
  return true;
};
exports.splitCurrentChapterContent = splitCurrentChapterContent;
