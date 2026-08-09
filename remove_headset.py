from PIL import Image, ImageFilter, ImageDraw
import math

img = Image.open('public/images/whatsapp-badge.png').convert('RGBA')
px = img.load()
w, h = img.size

# Create a copy to work with
result = img.copy()
result_px = result.load()

# The headset is the dark band across the top of the head
# Headset region: roughly x: 190-430, y: 100-220
# The background above is light/white
# The person's face starts around y: 150-200

# Strategy: 
# 1. Identify the headset pixels (dark pixels in the headset region)
# 2. Replace them with the background color (light/white)
# 3. Smooth the transition

# First, let's understand the background color
# Sample background pixels from the bright area above the headset
bg_samples = []
for y in range(40, 100):
    for x in range(200, 450):
        r, g, b, a = px[x, y]
        if a > 200 and r > 200 and g > 200 and b > 200:
            bg_samples.append((r, g, b))

if bg_samples:
    avg_r = sum(s[0] for s in bg_samples) // len(bg_samples)
    avg_g = sum(s[1] for s in bg_samples) // len(bg_samples)
    avg_b = sum(s[2] for s in bg_samples) // len(bg_samples)
    print(f"Background color: ({avg_r}, {avg_g}, {avg_b})")
else:
    avg_r, avg_g, avg_b = 240, 238, 240
    print("Using default background color")

# Define the headset region more precisely
# The headset band spans roughly x: 190-430, y: 100-220
# But we need to be careful not to remove the person's face

# Let's create a mask for the headset
# The headset is characterized by dark pixels in the region above the face
# The face starts around y=150

# Create a mask image
mask = Image.new('L', (w, h), 0)
mask_px = mask.load()

# Headset detection: dark pixels in the region above the face
# The headset band is roughly y: 100-220
# The face area is roughly x: 200-430, y: 150-400

# We need to identify the headset more carefully
# The headset has a band that goes across the top of the head
# and ear cups on the sides

# Let's identify the headset by looking for the dark band
# that contrasts with the light background above and the skin below

# First, let's find the exact boundaries of the headset
# Scan from top to bottom to find where the dark band starts and ends

# The headset band top edge
headset_top = None
for y in range(80, 250):
    dark_count = 0
    for x in range(190, 440):
        r, g, b, a = px[x, y]
        if a > 200 and r < 100 and g < 100 and b < 100:
            dark_count += 1
    if dark_count > 30:
        headset_top = y
        break

# The headset band bottom edge (where it meets the face)
headset_bottom = None
for y in range(250, 80, -1):
    dark_count = 0
    for x in range(190, 440):
        r, g, b, a = px[x, y]
        if a > 200 and r < 100 and g < 100 and b < 100:
            dark_count += 1
    if dark_count > 30:
        headset_bottom = y
        break

print(f"Headset band: y={headset_top} to y={headset_bottom}")

# Now let's identify the headset more precisely
# The headset consists of:
# 1. The top band (arc across the top of the head)
# 2. The ear cups (on the sides)

# For the top band, we need to replace dark pixels with background
# For the ear cups, we need to replace them with the background/skin

# Let's create a more sophisticated approach:
# 1. For the top band area (above the face), replace with background color
# 2. For the ear cup areas (sides), replace with background color

# Define the headset region
# The top band: roughly x: 200-430, y: headset_top to headset_bottom
# The ear cups: roughly x: 190-230 and x: 400-440, y: 150-250

# Let's create a mask for the headset
# We'll use a combination of:
# - Dark pixel detection
# - Region-based approach

# First, let's identify the face region
# The face is the skin-colored area in the center
# We'll use this to avoid removing face pixels

# Create the headset mask
for y in range(max(0, headset_top - 20), min(h, headset_bottom + 30)):
    for x in range(0, w):
        r, g, b, a = px[x, y]
        if a > 100:
            # Check if this is a dark pixel (headset)
            if r < 120 and g < 120 and b < 120:
                # Check if it's in the headset region
                # The headset band is in the upper portion
                if y < headset_bottom + 20:
                    mask_px[x, y] = 255

# Also mark the ear cup areas
# Left ear cup
for y in range(140, 260):
    for x in range(180, 240):
        r, g, b, a = px[x, y]
        if a > 100 and r < 150 and g < 150 and b < 150:
            mask_px[x, y] = 255

# Right ear cup
for y in range(140, 260):
    for x in range(390, 450):
        r, g, b, a = px[x, y]
        if a > 100 and r < 150 and g < 150 and b < 150:
            mask_px[x, y] = 255

# Now let's fill the headset area with the background
# We'll use a gradient approach for smooth transitions

# Create a new image for the result
new_img = img.copy()
new_px = new_img.load()

# For each pixel in the mask, replace with background color
# But we need to be smart about this:
# - Pixels above the face should get the background color
# - Pixels at the sides should get the background color
# - We need to blend smoothly

# Let's use a different approach: 
# For the top band area, fill with background color
# For the ear cup areas, fill with background color
# Then apply a blur to smooth the transitions

# Create a filled version
filled = img.copy()
filled_px = filled.load()

# Fill the headset area with background color
for y in range(h):
    for x in range(w):
        if mask_px[x, y] > 128:
            # Determine if this is in the top band or ear cup area
            if y < headset_bottom:
                # Top band area - fill with background
                filled_px[x, y] = (avg_r, avg_g, avg_b, 255)
            else:
                # Ear cup area - fill with background
                filled_px[x, y] = (avg_r, avg_g, avg_b, 255)

# Now let's smooth the transitions
# Apply a blur to the mask area
mask_blur = mask.filter(ImageFilter.GaussianBlur(radius=8))

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

# Also save the mask for debugging
mask.save('public/images/headset-mask.png')
print("Saved mask for debugging")