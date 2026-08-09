from PIL import Image

img = Image.open('public/images/whatsapp-badge.png').convert('RGBA')
print('Size:', img.size)
px = img.load()
w, h = img.size

min_x, min_y, max_x, max_y = w, h, 0, 0
for y in range(h):
    for x in range(w):
        a = px[x, y][3]
        if a > 10:
            if x < min_x: min_x = x
            if x > max_x: max_x = x
            if y < min_y: min_y = y
            if y > max_y: max_y = y

print('Content bbox:', min_x, min_y, max_x, max_y)
print('Content size:', max_x - min_x, 'x', max_y - min_y)

# Sample pixels at various locations
print('\nSample pixels:')
for y in [50, 150, 250, 350, 450, 550, 650, 750]:
    row = []
    for x in [50, 150, 250, 350, 450, 550, 650]:
        if y < h and x < w:
            row.append(f'({x},{y}):{px[x,y]}')
    print(' | '.join(row))

# Analyze color distribution in different regions
# Split image into quadrants and get average color
print('\nRegion analysis:')
for region_name, y0, y1, x0, x1 in [
    ('Top-left', 0, h//2, 0, w//2),
    ('Top-right', 0, h//2, w//2, w),
    ('Bottom-left', h//2, h, 0, w//2),
    ('Bottom-right', h//2, h, w//2, w),
]:
    r_sum = g_sum = b_sum = a_sum = count = 0
    for y in range(y0, y1, 5):
        for x in range(x0, x1, 5):
            r, g, b, a = px[x, y]
            if a > 10:
                r_sum += r; g_sum += g; b_sum += b; a_sum += a
                count += 1
    if count > 0:
        print(f'{region_name}: avg RGBA = ({r_sum//count}, {g_sum//count}, {b_sum//count}, {a_sum//count}), pixels={count}')