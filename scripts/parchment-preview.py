"""
Generate a comparison preview of parchment textures
with zoomed detail showing fiber strands
"""
from PIL import Image, ImageDraw, ImageFont

# Load generated textures
light = Image.open('/home/z/my-project/download/parchment-light.png')
dark = Image.open('/home/z/my-project/download/parchment-dark.png')

# Create comparison canvas
canvas_w = 1920
canvas_h = 1200
canvas = Image.new('RGB', (canvas_w, canvas_h), (30, 30, 30))
draw = ImageDraw.Draw(canvas)

# Place full textures on left half
light_small = light.resize((920, 518), Image.LANCZOS)
dark_small = dark.resize((920, 518), Image.LANCZOS)

canvas.paste(light_small, (20, 80))
canvas.paste(dark_small, (980, 80))

# Labels
try:
    font = ImageFont.truetype('/usr/share/fonts/truetype/english/Carlito-Bold.ttf', 22)
    font_small = ImageFont.truetype('/usr/share/fonts/truetype/english/Carlito-Regular.ttf', 16)
except:
    font = ImageFont.load_default()
    font_small = font

draw.text((20, 20), 'LIGHT MODE — Parchment (bg-paper #F5EEDC)', fill=(245, 238, 220), font=font)
draw.text((980, 20), 'DARK MODE — Parchment (#080B16)', fill=(240, 235, 224), font=font)
draw.text((20, 50), 'Fiber color: #D7C8AA (Light Fiber)  |  Gold accent: #D4A843', fill=(180, 170, 150), font=font_small)
draw.text((980, 50), 'Fiber color: #8B8070 (Dark Muted)  |  Gold accent: #D4A843', fill=(139, 128, 112), font=font_small)

# ZOOMED detail crops (2x magnification)
crop_size = 230
zoom = 2

# Light zoom
light_crop = light.crop((400, 300, 400 + crop_size, 300 + crop_size))
light_zoomed = light_crop.resize((crop_size * zoom, crop_size * zoom), Image.NEAREST)
canvas.paste(light_zoomed, (20, 620))
draw.text((20, 600), 'LIGHT — 2x Detail (Serat/Fiber Visible)', fill=(245, 238, 220), font=font)

# Dark zoom
dark_crop = dark.crop((400, 300, 400 + crop_size, 300 + crop_size))
dark_zoomed = dark_crop.resize((crop_size * zoom, crop_size * zoom), Image.NEAREST)
canvas.paste(dark_zoomed, (980, 620))
draw.text((980, 600), 'DARK — 2x Detail (Serat/Fiber Visible)', fill=(240, 235, 224), font=font)

# Border lines
draw.line([960, 80, 960, 1180], fill=(60, 60, 60), width=2)

canvas.save('/home/z/my-project/download/parchment-preview.png', quality=95)
print('Preview saved: parchment-preview.png')
