import { marked } from 'marked';

interface Props {
  content: string;
}

export default function ArticleMarkdown({ content }: Props) {
  // Parse headings and custom styles
  const rawHtml = marked.parse(content, { gfm: true, breaks: true }) as string;

  return (
    <div
      className="prose max-w-none text-[#2A2A28] leading-relaxed text-base sm:text-[17px] font-normal
        [&>h1]:hidden
        [&>h2]:font-extralight [&>h2]:text-2xl sm:[&>h2]:text-3xl [&>h2]:uppercase [&>h2]:tracking-tight [&>h2]:text-[#1A1A18] [&>h2]:mt-12 [&>h2]:mb-4 [&>h2]:pt-6 [&>h2]:border-t [&>h2]:border-[#E5E5E0]
        [&>h3]:font-medium [&>h3]:text-lg sm:[&>h3]:text-xl [&>h3]:text-[#1A1A18] [&>h3]:mt-8 [&>h3]:mb-3
        [&>p]:mb-6 [&>p]:leading-relaxed
        [&>ul]:my-6 [&>ul]:pl-5 [&>ul]:space-y-2 [&>ul]:list-disc
        [&>ol]:my-6 [&>ol]:pl-5 [&>ol]:space-y-2 [&>ol]:list-decimal
        [&>li]:leading-relaxed
        [&>blockquote]:my-8 [&>blockquote]:border-l-4 [&>blockquote]:border-[#FF6900] [&>blockquote]:bg-[#F9F9F7] [&>blockquote]:p-5 [&>blockquote]:text-sm sm:[&>blockquote]:text-base [&>blockquote]:italic [&>blockquote]:text-[#333]
        [&>table]:w-full [&>table]:my-8 [&>table]:border-collapse [&>table]:border [&>table]:border-[#E5E5E0] [&>table]:text-xs sm:[&>table]:text-sm
        [&>table_th]:bg-[#1A1A18] [&>table_th]:text-white [&>table_th]:font-mono [&>table_th]:text-left [&>table_th]:p-3 [&>table_th]:text-[11px] [&>table_th]:uppercase [&>table_th]:tracking-wider
        [&>table_td]:border-t [&>table_td]:border-[#E5E5E0] [&>table_td]:p-3 [&>table_td]:bg-white
        [&>table_tr:nth-child(even)_td]:bg-[#F9F9F7]
        [&>pre]:my-6 [&>pre]:bg-[#141416] [&>pre]:text-[#E0E0E0] [&>pre]:p-4 [&>pre]:overflow-x-auto [&>pre]:font-mono [&>pre]:text-xs [&>pre]:border [&>pre]:border-[#333]
        [&>code]:font-mono [&>code]:text-xs [&>code]:bg-[#EAEAE6] [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:text-[#1A1A18]
        [&>hr]:my-10 [&>hr]:border-[#E5E5E0]"
      dangerouslySetInnerHTML={{ __html: rawHtml }}
    />
  );
}
