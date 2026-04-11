#!/usr/bin/env python3
"""
Process a single source image: remove background, composite onto industrial_bg.png
Usage: python3 scripts/process_single.py <input_path> <output_name>
"""

import sys
from pathlib import Path
from PIL import Image
from rembg import remove
import io

def process(input_path: str, output_name: str):
    bg_path = Path("public/assets/products/industrial_bg.png")
    out_path = Path(f"public/assets/products/{output_name}")
    
    print(f"Reading source: {input_path}")
    with open(input_path, "rb") as f:
        raw = f.read()
    
    print("Removing background...")
    fg_bytes = remove(raw)
    fg = Image.open(io.BytesIO(fg_bytes)).convert("RGBA")
    
    print("Loading warehouse background...")
    bg = Image.open(bg_path).convert("RGBA")
    
    # Resize bg to standard output size
    TARGET = (1200, 900)
    bg = bg.resize(TARGET, Image.LANCZOS)
    
    # Scale fg to fit within 85% of canvas, centred bottom-aligned
    max_w = int(TARGET[0] * 0.85)
    max_h = int(TARGET[1] * 0.85)
    fg.thumbnail((max_w, max_h), Image.LANCZOS)
    
    # Centre horizontally, sit near bottom
    x = (TARGET[0] - fg.width) // 2
    y = TARGET[1] - fg.height - 40  # 40px from bottom
    
    composite = bg.copy()
    composite.paste(fg, (x, y), fg)
    composite = composite.convert("RGB")
    
    print(f"Saving to {out_path}")
    composite.save(out_path, "PNG", optimize=True)
    print("Done!")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python3 scripts/process_single.py <input_image> <output_filename.png>")
        sys.exit(1)
    process(sys.argv[1], sys.argv[2])
