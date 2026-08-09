from PIL import Image, ImageFilter, ImageDraw
import math

img = Image.open('public/images/whatsapp-badge.png').convert('RGBA')
px = img.load()
w, h = img.size

# Background color from the bright area above the headset
bg_samples = []
for y in range(40, 100):
    for x in range(200, 450):
        r, g, b, a = px[x, y]
        if a > 200 and r > 200 and g > 200 and b > 200:
            bg_samples.append((r, g, b))

avg_r = sum(s[0] for s in bg_samples) // len(bg_samples)
avg_g = sum(s[1] for s in bg_samples) // len(bg_samples)
avg_b = sum(s[2] for s in bg_samples) // len(bg_samples)
print(f"Background color: ({avg_r}, {avg_g}, {avg_b})")

# Create a mask for the headset
# The headset is the dark band across the top of the head
# We need to be more precise about what's headset vs face

# Let's analyze the structure more carefully
# The headset band goes across the top of the head
# The ear cups are on the sides
# The face is in the center below the band

# Create a mask
mask = Image.new('L', (w, h), 0)
mask_px = mask.load()

# Strategy: 
# 1. The top band of the headset: dark pixels in the region above the face
#    This is roughly y: 100-180, x: 200-430
# 2. The ear cups: dark pixels on the sides, roughly x: 190-240 and x: 390-440
# 3. The face should be preserved

# Let's identify the face region first
# The face is the skin-colored area in the center
# We'll detect skin tones

# For the top band area (above the face)
# The headset band is the dark arc across the top
# It spans from about x=200 to x=430 at the top
# and narrows toward the center

# Let's create a more precise mask
# Top band: the dark arc
for y in range(100, 200):
    for x in range(190, 450):
        r, g, b, a = px[x, y]
        if a > 150:
            # Dark pixels = headset band
            if r < 100 and g < 100 and b < 100:
                # Check if this is part of the headset band
                # The band is in the upper portion
                mask_px[x, y] = 255

# Ear cups - left side
# The left ear cup is around x: 190-240, y: 150-250
for y in range(140, 260):
    for x in range(180, 250):
        r, g, b, a = px[x, y]
        if a > 100:
            # Dark pixels = ear cup
            if r < 130 and g < 130 and b < 130:
                mask_px[x, y] = 255

# Ear cups - right side
# The right ear cup is around x: 390-440, y: 150-250
for y in range(140, 260):
    for x in range(380, 450):
        r, g, b, a = px[x, y]
        if a > 100:
            # Dark pixels = ear cup
            if r < 130 and g < 130 and b < 130:
                mask_px[x, y] = 255

# Now let's also handle the transition areas
# The headset band connects to the ear cups
# We need to fill these connection areas too

# Let's also check for the headset band that goes down the sides
# The band extends from the top arc down to the ear cups

# For the left side band
for y in range(100, 260):
    for x in range(190, 260):
        r, g, b, a = px[x, y]
        if a > 100 and r < 150 and g < 150 and b < 150:
            # Check if this is in the headset region (not the face)
            # The face is roughly x: 240-390
            if x < 250:
                mask_px[x, y] = 255

# For the right side band
for y in range(100, 260):
    for x in range(380, 450):
        r, g, b, a = px[x, y]
        if a > 100 and r < 150 and g < 150 and b < 150:
            # Check if this is in the headset region (not the face)
            # The face is roughly x: 240-390
            if x > 380:
                mask_px[x, y] = 255

# Now let's fill the headset area
# Create a filled version where headset pixels are replaced with background
filled = img.copy()
filled_px = filled.load()

# For the top band area, fill with background color
# For the ear cup areas, fill with background color
# For the side bands, fill with background color

for y in range(h):
    for x in range(w):
        if mask_px[x, y] > 128:
            filled_px[x, y] = (avg_r, avg_g, avg_b, 255)

# Now let's smooth the transitions
# Apply a blur to the mask
mask_blur = mask.filter(ImageFilter.GaussianBlur(radius=6))

# Create the final result by blending
final = Image.new('RGBA', (w, h), (0, 0, 0, 0))
final_px = final.load()

for y in range(h):
    for x in range(w):
        orig = px[x, y]
        fill = filled_px[x, y]
        m = mask_blur.getpixel((x, y)) / 255.0
        
        # Blend between original and filled
        r = int(orig[0] * (1 - m) + fill[0] * m)
        g = int(orig[1] * (1 - m) + fill[1] * m)
        b = int(orig[2] * (1 - m) + fill[2] * m)
        a = int(orig[3] * (1 - m) + fill[3] * m)
        
        final_px[x, y] = (r, g, b, a)

# Save the result
final.save('public/images/whatsapp-badge-no-headset.png')
print("Saved result to public/images/whatsapp-badge-no-headset.png")

# Save the mask for debugging
mask.save('public/images/headset-mask.png')
print("Saved mask for debugging")

# Count masked pixels
masked_count = sum(1 for y in range(h) for x in range(w) if mask_px[x, y] > 128)
print(f"Masked pixels: {masked_count}")