import os
import requests
import re
from bs4 import BeautifulSoup
from io import BytesIO
from PIL import Image
from rembg import remove
import json

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PRODUCTS_DIR = os.path.join(BASE_DIR, 'public', 'assets', 'products')
BG_PATH = os.path.join(PRODUCTS_DIR, 'industrial_bg.png')
MACHINES_TS = os.path.join(BASE_DIR, 'src', 'lib', 'machines.ts')

# Local Fallback Assets
FALLBACK_ASSETS = {
    'machine': os.path.join(BASE_DIR, 'scripts', 'assets', 'machine_fallback.png'),
    'steam': os.path.join(BASE_DIR, 'scripts', 'assets', 'steam_fallback.png'),
    'hot-water': os.path.join(BASE_DIR, 'scripts', 'assets', 'machine_fallback.png'),
    'cold-water': os.path.join(BASE_DIR, 'scripts', 'assets', 'machine_fallback.png'),
    'trailer': os.path.join(BASE_DIR, 'scripts', 'assets', 'machine_fallback.png'),
    'chemical': os.path.join(BASE_DIR, 'scripts', 'assets', 'chemical_fallback.png'),
    'gun': os.path.join(BASE_DIR, 'scripts', 'assets', 'gun_fallback.png'),
    'hose': os.path.join(BASE_DIR, 'scripts', 'assets', 'hose_fallback.png'),
    'pump': os.path.join(BASE_DIR, 'scripts', 'assets', 'pump_fallback.png'),
    'surface_cleaner': os.path.join(BASE_DIR, 'scripts', 'assets', 'surface_cleaner_fallback.png')
}

KNOWN_URLS = {
    # Verified direct URLs (200 OK) from current Alkota.com site
    "216ax4": "https://alkota.com/wp-content/uploads/2023/06/Hot_Water_Pressure_Washer_AX4_Belt_Drive_320AX4__01_Alkota.png",
    "420ax4": "https://alkota.com/wp-content/uploads/2023/06/Hot_Water_Pressure_Washer_AX4_Belt_Drive_320AX4__01_Alkota.png",
    "216x4": "https://alkota.com/wp-content/uploads/2024/04/Hot_Water_Pressure_Washer_AX4_Belt_Drive_420X4_Alkota-1024x1024_2024.png",
    "420x4": "https://alkota.com/wp-content/uploads/2024/04/Hot_Water_Pressure_Washer_AX4_Belt_Drive_420X4_Alkota-1024x1024_2024.png",
    "430xm4": "https://alkota.com/wp-content/uploads/2024/04/Hot_Water_Pressure_Washer_AX4_Belt_Drive_420X4_Alkota-1024x1024_2024.png",
    "480x4": "https://alkota.com/wp-content/uploads/2024/04/Hot_Water_Pressure_Washer_AX4_Belt_Drive_420X4_Alkota-1024x1024_2024.png",
    "3305xd4": "https://alkota.com/wp-content/uploads/2023/07/Gas_Engine_Portable_Hot_Water_Pressure_Washer_XD4_Direct_Drive_4405XD4_Alkota-1.png",
    "3405xd4": "https://alkota.com/wp-content/uploads/2023/07/Gas_Engine_Portable_Hot_Water_Pressure_Washer_XD4_Direct_Drive_4405XD4_Alkota-1.png",
    "4305xd4": "https://alkota.com/wp-content/uploads/2023/07/Gas_Engine_Portable_Hot_Water_Pressure_Washer_XD4_Direct_Drive_4405XD4_Alkota-1.png",
    "4405xd4": "https://alkota.com/wp-content/uploads/2023/07/Gas_Engine_Portable_Hot_Water_Pressure_Washer_XD4_Direct_Drive_4405XD4_Alkota-1.png",
    "5355ens": "https://alkota.com/wp-content/uploads/2023/07/Gas_Engine_Space_Saving_Skid_Hot_Water_Pressure_Washer_GED-EN_Series_01_Alkota-1-1.png",
    "5355j": "https://alkota.com/wp-content/uploads/2023/07/Gas_Engine_Space_Saving_Skid_Hot_Water_Pressure_Washer_GED-EN_Series_01_Alkota-1-1.png",
    "5355hnl": "https://alkota.com/wp-content/uploads/2023/07/Gas_Engine_Space_Saving_Skid_Hot_Water_Pressure_Washer_GED-EN_Series_01_Alkota-1-1.png",
    "8405hnl": "https://alkota.com/wp-content/uploads/2023/07/Gas_Engine_Space_Saving_Skid_Hot_Water_Pressure_Washer_GED-EN_Series_01_Alkota-1-1.png",
    "ged-115v-skid": "https://alkota.com/wp-content/uploads/2023/07/Gas_Engine_Space_Saving_Skid_Hot_Water_Pressure_Washer_GED-EN_Series_01_Alkota-1-1.png",
    "ged-12v-skid": "https://alkota.com/wp-content/uploads/2023/07/Gas_Engine_Space_Saving_Skid_Hot_Water_Pressure_Washer_GED-EN_Series_01_Alkota-1-1.png",
    "steam-oil": "https://alkota.com/wp-content/uploads/2023/07/Steam_Cleaner_Oil_Fired_Steam_Cleaner_122_Alkota-1.png",
    "model-111": "https://alkota.com/wp-content/uploads/2023/07/Steam_Cleaner_Oil_Fired_Steam_Cleaner_122_Alkota-1.png",
    "trailer-single": "https://alkota.com/wp-content/uploads/2024/04/Hot_Water_Pressure_Washer_AX4_Belt_Drive_420X4_Alkota-1024x1024_2024.png"
}

# Series Mappings to ensure consistency for similar models
SERIES_RELIANCE = {
    "ax4": "https://alkota.com/wp-content/uploads/2023/06/Hot_Water_Pressure_Washer_AX4_Belt_Drive_320AX4__01_Alkota.png",
    "x4": "https://alkota.com/wp-content/uploads/2024/04/Hot_Water_Pressure_Washer_AX4_Belt_Drive_420X4_Alkota-1024x1024_2024.png",
    "xd4": "https://alkota.com/wp-content/uploads/2023/07/Gas_Engine_Portable_Hot_Water_Pressure_Washer_XD4_Direct_Drive_4405XD4_Alkota-1.png",
    "ged": "https://alkota.com/wp-content/uploads/2023/07/Gas_Engine_Space_Saving_Skid_Hot_Water_Pressure_Washer_GED-EN_Series_01_Alkota-1-1.png",
    "hot": "https://alkota.com/wp-content/uploads/2024/04/Hot_Water_Pressure_Washer_AX4_Belt_Drive_420X4_Alkota-1024x1024_2024.png",
    "cold": "https://alkota.com/wp-content/uploads/2023/07/Gas_Engine_Portable_Hot_Water_Pressure_Washer_XD4_Direct_Drive_4405XD4_Alkota-1.png",
    "steam": "https://alkota.com/wp-content/uploads/2023/07/Steam_Cleaner_Oil_Fired_Steam_Cleaner_122_Alkota-1.png",
}

STATIC_PRODUCTS = {
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
    'spray-nozzles': FALLBACK_ASSETS['hose'],
    'industrial-pump': FALLBACK_ASSETS['pump'],
    'whirl-away-surface-cleaner': FALLBACK_ASSETS['surface_cleaner']
}

def get_image_data(query_or_path):
    if query_or_path.startswith('http'):
        print(f"Downloading {query_or_path}...")
        try:
            res = requests.get(query_or_path, timeout=15)
            if res.status_code == 200:
                return Image.open(BytesIO(res.content))
        except:
            return None
        return None
    elif os.path.exists(query_or_path):
        print(f"Reading local file {query_or_path}...")
        return Image.open(query_or_path)
    return None

def process_and_composite(bg_image, fg_raw, output_path):
    try:
        if not fg_raw: return False
        fg_raw = fg_raw.convert("RGBA")
        
        # 2. Remove background
        # Only remove background if it's not our transparent fallback already to speed up
        print("Removing background...")
        fg_removed = remove(fg_raw)
        
        # 3. Composite
        print("Compositing...")
        bg_copy = bg_image.copy().convert("RGBA")
        bg_w, bg_h = bg_copy.size
        
        # Fit foreground within 70% of background height
        target_h = int(bg_h * 0.7)
        ratio = target_h / float(fg_removed.size[1])
        target_w = int(float(fg_removed.size[0]) * float(ratio))
        
        # Restrict width
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

def get_machines_from_ts():
    machines = []
    if not os.path.exists(MACHINES_TS): return machines
    
    with open(MACHINES_TS, 'r') as f:
        content = f.read()
    
    # Regex to grab block matching machine definition
    id_pattern = re.compile(r'id:\s*["\']([^"\']+)["\']')
    type_pattern = re.compile(r'type:\s*["\']([^"\']+)["\']')
    
    # Simple block parsing
    blocks = content.split('{')
    for block in blocks:
        id_match = id_pattern.search(block)
        type_match = type_pattern.search(block)
        if id_match and type_match:
            machines.append({
                'id': id_match.group(1),
                'type': type_match.group(1)
            })
    
    # Ensure uniqueness
    unique = {}
    for m in machines: unique[m['id']] = m['type']
    return [{'id': k, 'type': v} for k, v in unique.items()]

def main():
    if not os.path.exists(PRODUCTS_DIR):
        os.makedirs(PRODUCTS_DIR)
        
    if not os.path.exists(BG_PATH):
        print(f"Background image {BG_PATH} not found. Creating a dark solid fallback.")
        bg = Image.new('RGB', (1024, 1024), color=(40, 42, 45))
    else:
        bg = Image.open(BG_PATH)
        bg = bg.resize((1024, 1024), Image.Resampling.LANCZOS)
        
    # 1. Process static manual items (chemicals, nozzles)
    for key, path in STATIC_PRODUCTS.items():
        filename = f"{key}.png" if not key.endswith('.png') else key
        out_path = os.path.join(PRODUCTS_DIR, filename)
        if not os.path.exists(out_path): 
            print(f"Processing Static: {key}")
            fg_img = get_image_data(path)
            process_and_composite(bg, fg_img, out_path)

    # 2. Process all machines fetched from TS
    machines = get_machines_from_ts()
    print(f"Found {len(machines)} machines in machines.ts")
    
    for m in machines:
        key = m['id']
        m_type = m['type']
        filename = f"{key}.png"
        out_path = os.path.join(PRODUCTS_DIR, filename)
        
        print(f"Processing Machine: {key} (Type: {m_type})")
        
        # Determine source URL: 
        # 1. Direct model match
        # 2. Series keyword match (ax4, x4, xd4, ged)
        # 3. Type fallback (hot, cold, steam, trailer)
        source = KNOWN_URLS.get(key)
        
        if not source:
            # Check for series markers in the ID
            if "ax4" in key: source = SERIES_RELIANCE["ax4"]
            elif "x4" in key: source = SERIES_RELIANCE["x4"]
            elif "xd4" in key: source = SERIES_RELIANCE["xd4"]
            elif "ged" in key: source = SERIES_RELIANCE["ged"]
            elif m_type == "hot-water": source = SERIES_RELIANCE["hot"]
            elif m_type == "steam": source = SERIES_RELIANCE["steam"]
            else: source = SERIES_RELIANCE.get("cold", FALLBACK_ASSETS["machine"])
            
        fg_img = get_image_data(source)
        success = False
        if fg_img:
            success = process_and_composite(bg, fg_img, out_path)
            
        if not success:
            print(f"Failed to composite {key}. Generating blank fallback.")
            # Blank fallback to ensure site doesn't 404
            bg.copy().convert("RGB").save(out_path, format="PNG")

if __name__ == "__main__":
    main()
