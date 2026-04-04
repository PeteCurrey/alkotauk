import os
import requests
from bs4 import BeautifulSoup
from io import BytesIO
from PIL import Image
from rembg import remove
import json

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PRODUCTS_DIR = os.path.join(BASE_DIR, 'public', 'assets', 'products')
BG_PATH = os.path.join(PRODUCTS_DIR, 'industrial_bg.png')

# Local Fallback Assets
FALLBACK_ASSETS = {
    'machine': os.path.join(BASE_DIR, 'scripts', 'assets', 'machine_fallback.png'),
    'steam': os.path.join(BASE_DIR, 'scripts', 'assets', 'steam_fallback.png'),
    'chemical': os.path.join(BASE_DIR, 'scripts', 'assets', 'chemical_fallback.png'),
    'gun': os.path.join(BASE_DIR, 'scripts', 'assets', 'gun_fallback.png'),
    'hose': os.path.join(BASE_DIR, 'scripts', 'assets', 'hose_fallback.png'),
    'pump': os.path.join(BASE_DIR, 'scripts', 'assets', 'pump_fallback.png'),
    'surface_cleaner': os.path.join(BASE_DIR, 'scripts', 'assets', 'surface_cleaner_fallback.png')
}

# Output mapping dictionary
# key: model/slug, value: direct URL (if found) or search term
PRODUCTS = {
    # Machines
    '430xh': 'https://alkota.com/wp-content/uploads/2023/07/Hot_Water_Pressure_Washer_AX4_Belt_Drive_320AX4__01_Alkota.png',
    '420xh': 'https://alkota.com/wp-content/uploads/2023/07/Hot_Water_Pressure_Washer_AX4_Belt_Drive_320AX4__01_Alkota.png',
    '330xh4': 'https://alkota.com/wp-content/uploads/2023/07/Hot_Water_Pressure_Washer_AX4_Belt_Drive_320AX4__01_Alkota.png',
    '5355hnl': 'https://cdn11.bigcommerce.com/s-jo1yhisq2h/images/stencil/500x659/products/304/676/Alkota_Oil_Fired_Hot_Water_Pressure_Washer_3242__49020.1664391267.jpg',
    '8405hnl': 'https://cdn11.bigcommerce.com/s-jo1yhisq2h/images/stencil/500x659/products/247/551/Alkota_Oil_Fired_Hot_Water_Pressure_Washer_10307KK__50055.1659639911.jpg',
    '7407dnl': 'https://cdn11.bigcommerce.com/s-jo1yhisq2h/images/stencil/500x659/products/247/551/Alkota_Oil_Fired_Hot_Water_Pressure_Washer_10307KK__50055.1659639911.jpg',
    '4405f': FALLBACK_ASSETS['machine'],
    '10307kk': 'https://cdn11.bigcommerce.com/s-jo1yhisq2h/images/stencil/500x659/products/247/551/Alkota_Oil_Fired_Hot_Water_Pressure_Washer_10307KK__50055.1659639911.jpg',
    'model-111': FALLBACK_ASSETS['steam'],
    'model-911': 'https://cdn11.bigcommerce.com/s-jo1yhisq2h/images/stencil/original/g/cuda%20top%20load%20automatic%20parts%20washer%20h2o-2518__98562.original.jpg',
    'vfs-1': 'https://cdn11.bigcommerce.com/s-jo1yhisq2h/images/stencil/500x659/products/189/472/Alkota_-_Wash_Bay_Module__16161.1655481351.jpg',
    
    # Chemicals
    'tr440-farm-soap': FALLBACK_ASSETS['chemical'],
    'grease-cutter': FALLBACK_ASSETS['chemical'],
    'auto-shampoo': FALLBACK_ASSETS['chemical'],
    'truck-plant-wash': FALLBACK_ASSETS['chemical'],
    'food-safe-cleaner': FALLBACK_ASSETS['chemical'],
    'scale-stop': FALLBACK_ASSETS['chemical'],
    'masonry-cleaner': FALLBACK_ASSETS['chemical'],

    # Parts & Attachments
    'trigger-gun': FALLBACK_ASSETS['gun'],
    'high-pressure-hose': FALLBACK_ASSETS['hose'],
    'spray-nozzles': FALLBACK_ASSETS['hose'], # Reusing nozzle set from hose generation
    'industrial-pump': FALLBACK_ASSETS['pump'],
    'whirl-away-surface-cleaner': FALLBACK_ASSETS['surface_cleaner']
}

def get_image_data(query_or_path):
    if query_or_path.startswith('http'):
        print(f"Downloading {query_or_path}...")
        res = requests.get(query_or_path, timeout=15)
        if res.status_code == 200:
            return Image.open(BytesIO(res.content))
        return None
    elif os.path.exists(query_or_path):
        print(f"Reading local file {query_or_path}...")
        return Image.open(query_or_path)
    return None

def process_and_composite(bg_image, fg_raw, output_path):
    try:
        fg_raw = fg_raw.convert("RGBA")
        
        # 2. Remove background
        print("Removing background...")
        fg_removed = remove(fg_raw)
        
        # 3. Composite
        print("Compositing...")
        bg_copy = bg_image.copy().convert("RGBA")
        
        bg_w, bg_h = bg_copy.size
        # Make foreground fit within 70% of background height
        target_h = int(bg_h * 0.7)
        ratio = target_h / float(fg_removed.size[1])
        target_w = int(float(fg_removed.size[0]) * float(ratio))
        
        # Ensure it doesn't exceed width either
        if target_w > bg_w * 0.9:
            ratio = (bg_w * 0.9) / float(fg_removed.size[0])
            target_w = int(bg_w * 0.9)
            target_h = int(float(fg_removed.size[1]) * float(ratio))
            
        fg_resized = fg_removed.resize((target_w, target_h), Image.Resampling.LANCZOS)
        
        x = (bg_w - target_w) // 2
        y = bg_h - target_h - int(bg_h * 0.05)
        
        bg_copy.paste(fg_resized, (x, y), fg_resized)
        
        final_img = bg_copy.convert("RGB")
        final_img.save(output_path, format="PNG")
        print(f"Saved: {output_path}")
        return True
    except Exception as e:
        print(f"Error processing {output_path}: {e}")
        return False

def main():
    if not os.path.exists(PRODUCTS_DIR):
        os.makedirs(PRODUCTS_DIR)
        
    if not os.path.exists(BG_PATH):
        print(f"Background image {BG_PATH} not found. Creating a solid fallback.")
        bg = Image.new('RGB', (1024, 1024), color=(40, 42, 45))
    else:
        bg = Image.open(BG_PATH)
        bg = bg.resize((1024, 1024), Image.Resampling.LANCZOS)
        
    for key, val in PRODUCTS.items():
        filename = f"{key}.png" if not key.endswith('.png') else key
        # Specific fix for filenames in migrations
        if key == 'tr440-farm-soap': filename = 'tr-440-farm-soap.png'
        if key == 'grease-cutter': filename = 'de703-grease-cutter.png'
        
        out_path = os.path.join(PRODUCTS_DIR, filename)
        # Note: We overwrite to ensure quality updates if source improved
        
        print(f"Processing: {key}")
        fg_img = get_image_data(val)
        
        if fg_img:
            process_and_composite(bg, fg_img, out_path)
        else:
            print(f"Failed to get image data for {key}.")

if __name__ == "__main__":
    main()
