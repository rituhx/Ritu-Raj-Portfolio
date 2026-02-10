"""Crop profile photo to focus on the person (left/center), less fence and background."""
from PIL import Image

path = r"d:\OneDrive\Desktop\Hrithik Port\images\profile.png"
img = Image.open(path).convert("RGB")
w, h = img.size

# Crop: focus on left 58% (person is left/center), full height, then crop to square for portfolio
left = 0
right = int(w * 0.58)
top = 0
bottom = h
cropped = img.crop((left, top, right, bottom))
cw, ch = cropped.size
# Make square from center of this crop (person is in frame)
if ch > cw:
    margin = (ch - cw) // 2
    cropped = cropped.crop((0, margin, cw, margin + cw))
else:
    margin = (cw - ch) // 2
    cropped = cropped.crop((margin, 0, margin + ch, ch))

cropped.save(path, "PNG", optimize=True)
print("Cropped and saved profile.png")
