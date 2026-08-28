export type ReadingItem = {
  id: string;
  title: string;
  author: string;
  url: string;
  note?: string;
};

export const CURRENTLY_READING: ReadingItem[] = [
  {
    id: "1",
    title: "LLM Powered Autonomous Agents",
    author: "Lilian Weng",
    url: "https://lilianweng.github.io/posts/2023-06-23-agent/",
    note: "Deconstructing agent memory architectures, planning loops, and tool-use patterns.",
  },
  {
    id: "2",
    title: "What is ChatGPT Doing... and Why Does It Work?",
    author: "Stephen Wolfram",
    url: "https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/",
    note: "Intuitive breakdown of transformer weights, embeddings, and next-token prediction mechanics.",
  },
  {
    id: "3",
    title: "LSM Trees — The Go-To Data Structure for Databases & Search Engines",
    author: "Ankit Dwivedi",
    url: "https://medium.com/@dwivedi.ankit21/lsm-trees-the-go-to-data-structure-for-databases-search-engines-and-more-c3a48fa469d2",
    note: "Comparing SkipList MemTables against B-Trees for write-heavy database engines.",
  },
];
