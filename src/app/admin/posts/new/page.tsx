import PostForm from '../PostForm';
export default function NewPostPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-barlow-condensed text-4xl font-black uppercase italic text-white">New Post</h1>
        <p className="font-ibm-plex-mono text-[10px] text-[#555] uppercase tracking-widest mt-1">// Blog & Resources</p>
      </div>
      <PostForm />
    </div>
  );
}
