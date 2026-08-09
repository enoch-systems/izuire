from PIL import Image

img = Image.open('public/images/whatsapp-badge.png').convert('RGBA')
px = img.load()
w, h = img.size

# Analyze horizontal bands to find the headset
# The headset band typically goes across the top of the head
print("=== Horizontal band analysis (checking for headset band) ===")
for y in range(100, 250, 10):
    # Count dark pixels in this row
    dark_count = 0
    dark_xs = []
    for x in range(150, 500):
        r, g, b, a = px[x, y]
        if a > 200 and r < 80 and g < 80 and b < 80:
            dark_count += 1
            dark_xs.append(x)
    if dark_count > 0:
        print(f"y={y}: dark_count={dark_count}, x_range={min(dark_xs)}-{max(dark_xs)}")

# Analyze the bright area above the head
print("\n=== Bright area analysis (y: 0-130) ===")
for y in range(0, 140, 10):
    bright_count = 0
    bright_xs = []
    for x in range(150, 500):
        r, g, b, a = px[x, y]
        if a > 200 and r > 200 and g > 200 and b > 200:
            bright_count += 1
            bright_xs.append(x)
    if bright_count > 0:
        print(f"y={y}: bright_count={bright_count}, x_range={min(bright_xs)}-{max(bright_xs)}")

# Check what's at the very top of the image
print("\n=== Top rows (y: 0-50) ===")
for y in range(0, 60, 10):
    row_pixels = []
    for x in range(200, 500, 50):
        r, g, b, a = px[x, y]
        row_pixels.append(f"({x},{y}):({r},{g},{b},{a})")
    print(f"y={y}: {', '.join(row_pixels)}")

# Check the sides of the headset area
print("\n=== Side regions around headset ===")
# Left side of headset
for y in range(100, 250, 20):
    for x in [180, 190, 200, 210, 220]:
        r, g, b, a = px[x, y]
        print(f"({x},{y}):({r},{g},{b},{a})", end=" | ")
    print()

print("\n=== Right side of headset ===")
for y in range(100, 250, 20):
    for x in [380, 390, 400, 410, 420]:
        r, g, b, a = px[x, y]
        print(f"({x},{y}):({r},{g},{b},{a})", end=" | ")
    print()

# Check the background color around the headset
print("\n=== Background sampling around headset ===")
# Sample background pixels at various positions
bg_samples = []
for y in range(0, 300, 30):
    for x in [50, 100, 600, 650, 700]:
        r, g, b, a = px[x, y]
        if a > 200:
            bg_samples.append((r, g, b))
            print(f"BG ({x},{y}):({r},{g},{b},{a})")

# Average background color
if bg_samples:
    avg_r = sum(s[0] for s in bg_samples) // len(bg_samples)
    avg_g = sum(s[1] for s in bg_samples) // len(bg_samples)
    avg_b = sum(s[2] for s in bg_samples) // len(bg_samples)
    print(f"\nAverage background color: ({avg_r}, {avg_g}, {avg_b})")