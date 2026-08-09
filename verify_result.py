from PIL import Image

# Compare original and processed images
orig = Image.open('public/images/whatsapp-badge.png').convert('RGBA')
proc = Image.open('public/images/whatsapp-badge-no-headset.png').convert('RGBA')

print(f"Original size: {orig.size}")
print(f"Processed size: {proc.size}")

orig_px = orig.load()
proc_px = proc.load()
w, h = orig.size

# Check the headset area (top of head)
print("\n=== Headset area comparison (y: 100-250) ===")
for y in range(100, 260, 20):
    row_orig = []
    row_proc = []
    for x in [200, 250, 300, 350, 400, 430]:
        row_orig.append(f"({x},{y}):{orig_px[x,y]}")
        row_proc.append(f"({x},{y}):{proc_px[x,y]}")
    print(f"y={y}")
    print(f"  Orig: {', '.join(row_orig)}")
    print(f"  Proc: {', '.join(row_proc)}")

# Check the face area (should be preserved)
print("\n=== Face area comparison (y: 250-400) ===")
for y in range(250, 420, 30):
    row_orig = []
    row_proc = []
    for x in [250, 300, 350, 400]:
        row_orig.append(f"({x},{y}):{orig_px[x,y]}")
        row_proc.append(f"({x},{y}):{proc_px[x,y]}")
    print(f"y={y}")
    print(f"  Orig: {', '.join(row_orig)}")
    print(f"  Proc: {', '.join(row_proc)}")

# Check the background area (should be unchanged)
print("\n=== Background area comparison (y: 40-90) ===")
for y in range(40, 100, 20):
    row_orig = []
    row_proc = []
    for x in [250, 300, 350, 400]:
        row_orig.append(f"({x},{y}):{orig_px[x,y]}")
        row_proc.append(f"({x},{y}):{proc_px[x,y]}")
    print(f"y={y}")
    print(f"  Orig: {', '.join(row_orig)}")
    print(f"  Proc: {', '.join(row_proc)}")

# Check the bottom area (should be unchanged)
print("\n=== Bottom area comparison (y: 600-800) ===")
for y in range(600, 810, 50):
    row_orig = []
    row_proc = []
    for x in [100, 300, 500, 650]:
        row_orig.append(f"({x},{y}):{orig_px[x,y]}")
        row_proc.append(f"({x},{y}):{proc_px[x,y]}")
    print(f"y={y}")
    print(f"  Orig: {', '.join(row_orig)}")
    print(f"  Proc: {', '.join(row_proc)}")

# Count changed pixels
changed = 0
for y in range(h):
    for x in range(w):
        if orig_px[x, y] != proc_px[x, y]:
            changed += 1
print(f"\nTotal changed pixels: {changed}")