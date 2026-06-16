"""
Parchment texture generator for Jejak Cahaya
Creates realistic parchment with visible fiber strands (serat)
Matching the existing UI color palette
"""
import random
import math
from PIL import Image, ImageDraw, ImageFilter

# === Jejak Cahaya Color Palette ===
LIGHT_BASE = (245, 238, 220)     # paper
LIGHT_WARM = (235, 225, 200)     # slightly warmer
LIGHT_SPOT = (225, 215, 190)     # age spots
LIGHT_FIBER = (215, 200, 170)    # fiber strands
LIGHT_GOLD = (212, 168, 67)      # gold accent

DARK_BASE = (8, 11, 22)          # #080B16
DARK_SURFACE = (15, 22, 41)      # #0F1629
DARK_MUTE = (139, 128, 112)      # #8B8070
DARK_GOLD = (212, 168, 67)       # #D4A843


def generate_fiber_strand(draw, x_start, y_start, length, angle, color, width=1):
    points = []
    cx, cy = x_start, y_start
    wave_amp = random.uniform(0.5, 2.5)
    wave_freq = random.uniform(0.02, 0.08)
    phase = random.uniform(0, math.pi * 2)

    for i in range(int(length)):
        dx = math.cos(angle) * 1.0
        dy = math.sin(angle) * 1.0
        wave = math.sin(i * wave_freq + phase) * wave_amp
        perp_x = -math.sin(angle) * wave
        perp_y = math.cos(angle) * wave

        px = cx + dx + perp_x
        py = cy + dy + perp_y
        points.append((px, py))
        cx += dx
        cy += dy

    if len(points) > 2:
        for i in range(len(points) - 1):
            alpha = random.uniform(0.3, 1.0)
            c = color[:3]
            a = int(alpha * color[3]) if len(color) == 4 else 255
            draw.line(
                [points[i], points[i + 1]],
                fill=(*c, a),
                width=width
            )


def generate_parchment_light(width=1920, height=1080, seed=42):
    random.seed(seed)
    img = Image.new('RGBA', (width, height), (*LIGHT_BASE, 255))
    draw = ImageDraw.Draw(img)

    # Broad color variation
    for _ in range(800):
        x = random.randint(0, width)
        y = random.randint(0, height)
        r = random.randint(30, 120)
        opacity = random.randint(5, 20)
        color = random.choice([(*LIGHT_WARM, opacity), (*LIGHT_SPOT, opacity)])
        draw.ellipse([x - r, y - r, x + r, y + r], fill=color)

    # Fine grain noise
    noise = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    noise_draw = ImageDraw.Draw(noise)
    for _ in range(width * height // 8):
        x = random.randint(0, width - 1)
        y = random.randint(0, height - 1)
        val = random.randint(0, 30)
        opacity = random.randint(3, 12)
        noise_draw.point((x, y), fill=(val, val, val, opacity))
    img = Image.alpha_composite(img, noise)

    # FIBER STRANDS
    fiber_layer = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    fiber_draw = ImageDraw.Draw(fiber_layer)
    primary_angle = random.uniform(-0.15, 0.15)

    # Long primary fibers
    for _ in range(300):
        x_start = random.randint(-50, width)
        y_start = random.randint(0, height)
        length = random.randint(80, 400)
        angle = primary_angle + random.uniform(-0.2, 0.2)
        opacity = random.randint(15, 55)
        color = (*LIGHT_FIBER, opacity)
        generate_fiber_strand(fiber_draw, x_start, y_start, length, angle, color, width=1)

    # Short cross-grain fibers
    for _ in range(150):
        x_start = random.randint(0, width)
        y_start = random.randint(0, height)
        length = random.randint(15, 60)
        angle = primary_angle + math.pi / 2 + random.uniform(-0.5, 0.5)
        opacity = random.randint(8, 30)
        color = (*LIGHT_FIBER, opacity)
        generate_fiber_strand(fiber_draw, x_start, y_start, length, angle, color, width=1)

    # Fine hair-like fibers
    for _ in range(500):
        x_start = random.randint(0, width)
        y_start = random.randint(0, height)
        length = random.randint(30, 150)
        angle = primary_angle + random.uniform(-0.1, 0.1)
        opacity = random.randint(6, 25)
        color = (*LIGHT_FIBER, opacity)
        generate_fiber_strand(fiber_draw, x_start, y_start, length, angle, color, width=1)

    img = Image.alpha_composite(img, fiber_layer)

    # Subtle gold tint
    gold_layer = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    gold_draw = ImageDraw.Draw(gold_layer)
    for _ in range(200):
        x = random.randint(0, width)
        y = random.randint(0, height)
        r = random.randint(50, 200)
        opacity = random.randint(2, 8)
        gold_draw.ellipse([x - r, y - r, x + r, y + r], fill=(*LIGHT_GOLD, opacity))
    img = Image.alpha_composite(img, gold_layer)

    # Edge vignette
    vignette = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    vig_draw = ImageDraw.Draw(vignette)
    for i in range(80):
        margin = i * 3
        opacity = max(0, 15 - i // 3)
        if opacity > 0:
            vig_draw.rectangle([margin, margin, width - margin, height - margin], outline=(80, 60, 30, opacity))
    img = Image.alpha_composite(img, vignette)

    img = img.filter(ImageFilter.GaussianBlur(radius=0.5))
    return img


def generate_parchment_dark(width=1920, height=1080, seed=42):
    random.seed(seed + 100)
    img = Image.new('RGBA', (width, height), (*DARK_BASE, 255))
    draw = ImageDraw.Draw(img)

    # Subtle color variation
    for _ in range(500):
        x = random.randint(0, width)
        y = random.randint(0, height)
        r = random.randint(40, 150)
        opacity = random.randint(3, 15)
        color = random.choice([(*DARK_SURFACE, opacity), (20, 28, 50, opacity)])
        draw.ellipse([x - r, y - r, x + r, y + r], fill=color)

    # Fine grain noise
    noise = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    noise_draw = ImageDraw.Draw(noise)
    for _ in range(width * height // 6):
        x = random.randint(0, width - 1)
        y = random.randint(0, height - 1)
        brightness = random.randint(0, 40)
        opacity = random.randint(2, 10)
        noise_draw.point((x, y), fill=(brightness, brightness, brightness + 5, opacity))
    img = Image.alpha_composite(img, noise)

    # FIBER STRANDS (dark mode)
    fiber_layer = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    fiber_draw = ImageDraw.Draw(fiber_layer)
    primary_angle = random.uniform(-0.15, 0.15)

    fiber_colors_dark = [DARK_MUTE, (100, 90, 70), (70, 60, 45)]

    for _ in range(250):
        x_start = random.randint(-50, width)
        y_start = random.randint(0, height)
        length = random.randint(80, 350)
        angle = primary_angle + random.uniform(-0.2, 0.2)
        opacity = random.randint(6, 25)
        fc = random.choice(fiber_colors_dark)
        color = (*fc[:3], opacity)
        generate_fiber_strand(fiber_draw, x_start, y_start, length, angle, color, width=1)

    for _ in range(120):
        x_start = random.randint(0, width)
        y_start = random.randint(0, height)
        length = random.randint(15, 50)
        angle = primary_angle + math.pi / 2 + random.uniform(-0.5, 0.5)
        opacity = random.randint(4, 15)
        fc = random.choice(fiber_colors_dark)
        color = (*fc[:3], opacity)
        generate_fiber_strand(fiber_draw, x_start, y_start, length, angle, color, width=1)

    for _ in range(400):
        x_start = random.randint(0, width)
        y_start = random.randint(0, height)
        length = random.randint(30, 120)
        angle = primary_angle + random.uniform(-0.1, 0.1)
        opacity = random.randint(3, 12)
        fc = random.choice(fiber_colors_dark)
        color = (*fc[:3], opacity)
        generate_fiber_strand(fiber_draw, x_start, y_start, length, angle, color, width=1)

    img = Image.alpha_composite(img, fiber_layer)

    # Gold shimmer
    gold_layer = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    gold_draw = ImageDraw.Draw(gold_layer)
    for _ in range(100):
        x = random.randint(0, width)
        y = random.randint(0, height)
        r = random.randint(60, 250)
        opacity = random.randint(1, 5)
        gold_draw.ellipse([x - r, y - r, x + r, y + r], fill=(*DARK_GOLD, opacity))
    img = Image.alpha_composite(img, gold_layer)

    # Edge vignette
    vignette = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    vig_draw = ImageDraw.Draw(vignette)
    for i in range(60):
        margin = i * 4
        opacity = max(0, 20 - i // 2)
        if opacity > 0:
            vig_draw.rectangle([margin, margin, width - margin, height - margin], outline=(0, 0, 0, opacity))
    img = Image.alpha_composite(img, vignette)

    img = img.filter(ImageFilter.GaussianBlur(radius=0.5))
    return img


if __name__ == '__main__':
    print('Generating light parchment...')
    light = generate_parchment_light(1920, 1080, seed=42)
    light.convert('RGB').save('/home/z/my-project/download/parchment-light.png', quality=95)
    print(f'  Saved: parchment-light.png ({light.size[0]}x{light.size[1]})')

    print('Generating dark parchment...')
    dark = generate_parchment_dark(1920, 1080, seed=42)
    dark.convert('RGB').save('/home/z/my-project/download/parchment-dark.png', quality=95)
    print(f'  Saved: parchment-dark.png ({dark.size[0]}x{dark.size[1]})')

    # Tileable smaller versions for web
    print('Generating tileable versions (512x512)...')
    light_tile = generate_parchment_light(512, 512, seed=99)
    light_tile.convert('RGB').save('/home/z/my-project/download/parchment-light-tile.png', quality=90)
    print(f'  Saved: parchment-light-tile.png')

    dark_tile = generate_parchment_dark(512, 512, seed=99)
    dark_tile.convert('RGB').save('/home/z/my-project/download/parchment-dark-tile.png', quality=90)
    print(f'  Saved: parchment-dark-tile.png')

    print('Done! 🔥🌙')
