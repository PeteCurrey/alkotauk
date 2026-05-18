async function run() {
  try {
    const res = await fetch("https://alkota.com/products/water-treatment-and-recovery-systems/water-treatment-systems/");
    const text = await res.text();
    const imgs = text.match(/<img[^>]+src="([^">]+)"/g);
    if(imgs) {
      imgs.forEach(i => console.log(i));
    }
  } catch(e) {
    console.error(e);
  }
}
run();
