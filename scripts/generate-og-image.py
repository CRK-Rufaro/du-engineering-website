"""Generate a 1200x630 OG image for DU Engineering social media previews."""
from PIL import Image, ImageDraw, ImageFont
import os

# Paths
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
PUBLIC_DIR = os.path.join(PROJECT_DIR, 'public')
LOGO_PATH = os.path.join(PUBLIC_DIR, 'due_engineering_logo.png')
OUTPUT_PATH = os.path.join(PUBLIC_DIR, 'og-image.png')

# Dimensions (standard OG image)
WIDTH = 1200
HEIGHT = 630

# Brand colors
BG_COLOR = (31, 41, 55)       # gray-800 (#1F2937) - dark professional background
PRIMARY = (47, 93, 80)         # #2F5D50 - teal
SECONDARY = (245, 158, 11)    # #F59E0B - gold accent
WHITE = (255, 255, 255)
LIGHT_GRAY = (209, 213, 219)  # gray-300
LOGO_BLUE = (36, 113, 188)    # #2471BC

# Create image
img = Image.new('RGB', (WIDTH, HEIGHT), BG_COLOR)
draw = ImageDraw.Draw(img)

# Draw subtle accent bar at top
draw.rectangle([0, 0, WIDTH, 4], fill=PRIMARY)

# Draw subtle accent bar at bottom
draw.rectangle([0, HEIGHT - 4, WIDTH, HEIGHT], fill=SECONDARY)

# Load and place logo
logo = Image.open(LOGO_PATH).convert('RGBA')
logo_size = 140
logo = logo.resize((logo_size, logo_size), Image.LANCZOS)

# Create a white circle background for the logo
logo_bg = Image.new('RGBA', (logo_size + 20, logo_size + 20), (0, 0, 0, 0))
logo_bg_draw = ImageDraw.Draw(logo_bg)
logo_bg_draw.ellipse([0, 0, logo_size + 19, logo_size + 19], fill=(255, 255, 255, 255))

# Center logo on the circle background
logo_x = (logo_size + 20 - logo_size) // 2
logo_bg.paste(logo, (logo_x, logo_x), logo)

# Place logo on main image
img_logo_x = 80
img_logo_y = (HEIGHT - logo_size - 20) // 2 - 30
img.paste(logo_bg, (img_logo_x, img_logo_y), logo_bg)

# Text positioning - to the right of logo
text_x = img_logo_x + logo_size + 60

# Try to use system fonts
font_paths = [
    'C:/Windows/Fonts/calibrib.ttf',   # Calibri Bold
    'C:/Windows/Fonts/arialbd.ttf',    # Arial Bold
    'C:/Windows/Fonts/segoeui.ttf',    # Segoe UI
]

font_paths_regular = [
    'C:/Windows/Fonts/calibri.ttf',
    'C:/Windows/Fonts/arial.ttf',
    'C:/Windows/Fonts/segoeui.ttf',
]

# Load fonts
title_font = None
subtitle_font = None
tagline_font = None

for fp in font_paths:
    if os.path.exists(fp):
        title_font = ImageFont.truetype(fp, 52)
        subtitle_font = ImageFont.truetype(fp, 28)
        break

for fp in font_paths_regular:
    if os.path.exists(fp):
        tagline_font = ImageFont.truetype(fp, 22)
        break

if not title_font:
    title_font = ImageFont.load_default()
    subtitle_font = ImageFont.load_default()
    tagline_font = ImageFont.load_default()

# Draw company name
text_y = img_logo_y + 10
draw.text((text_x, text_y), 'DUE', fill=WHITE, font=title_font)

# Measure "DUE" width to place "Engineering" after it
due_bbox = draw.textbbox((text_x, text_y), 'DUE', font=title_font)
draw.text((due_bbox[2] + 12, text_y), 'Engineering', fill=SECONDARY, font=title_font)

# Tagline
text_y += 70
draw.text(
    (text_x, text_y),
    'Professional Solar & Electrical Solutions',
    fill=LIGHT_GRAY,
    font=subtitle_font,
)

# Location line
text_y += 50
draw.text(
    (text_x, text_y),
    'Klerksdorp  |  North West  |  Gauteng',
    fill=(156, 163, 175),  # gray-400
    font=tagline_font,
)

# Services line
text_y += 38
draw.text(
    (text_x, text_y),
    'Solar Installation  |  Battery Backup  |  Electrical Services',
    fill=(107, 114, 128),  # gray-500
    font=tagline_font,
)

# Draw a subtle vertical accent line between logo and text
line_x = text_x - 30
draw.rectangle(
    [line_x, img_logo_y + 10, line_x + 2, img_logo_y + logo_size],
    fill=PRIMARY,
)

# Save
img.save(OUTPUT_PATH, 'PNG', optimize=True)
print(f'OG image saved to: {OUTPUT_PATH}')
print(f'Size: {WIDTH}x{HEIGHT}px')
