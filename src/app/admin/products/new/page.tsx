import ProductForm from '../ProductForm';

export default function NewProductPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-barlow-condensed text-4xl font-black uppercase italic text-white">New Product</h1>
        <p className="font-ibm-plex-mono text-[10px] text-[#555] uppercase tracking-widest mt-1">// Add a new machine to the catalogue</p>
      </div>
      <ProductForm />
    </div>
  );
}
