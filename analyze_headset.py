from PIL import Image

img = Image.open('public/images/whatsapp-badge.png').convert('RGBA')
px = img.load()
w, h = img.size

# Analyze the top portion of the image in detail
# The headset would typically be on top of the person's head
print("=== Top region analysis (y: 0-300) ===")
for y in range(0, 300, 25):
    row = []
    for x in range(0, w, 50):
        r, g, b, a = px[x, y]
        if a > 10:
            row.append(f"({x},{y}):({r},{g},{b})")
    if row:
        print(f"y={y}: {', '.join(row[:8])}")

# Find the headset - look for distinct colors that differ from skin/background
# Headsets are often dark or have distinct colors
print("\n=== Looking for distinct color regions in top area ===")
# Scan for pixels that are very different from surrounding skin tones
for y in range(0, 400, 10):
    for x in range(0, w, 10):
        r, g, b, a = px[x, y]
        if a > 200:
            # Check if this is a dark pixel (headset is often dark)
            if r < 60 and g < 60 and b < 60:
                print(f"Dark pixel at ({x},{y}): ({r},{g},{b},{a})")

# Also check for any bright/white pixels that might be part of a headset
print("\n=== Bright pixels in top area ===")
for y in range(0, 400, 10):
    for x in range(0, w, 10):
        r, g, b, a = px[x, y]
        if a > 200 and r > 200 and g > 200 and b > 200:
            print(f"Bright pixel at ({x},{y}): ({r},{g},{b},{a})")

# Save a downscaled version for reference
img_small = img.resize((150, 163), Image.LANCZOS)
img_small.save('public/images/whatsapp-badge-small.png')
print("\nSaved small preview")