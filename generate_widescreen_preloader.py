import os, sys, cv2, numpy as np
from PIL import Image, ImageDraw, ImageFont

os.environ['PATH'] = os.getcwd() + ';' + os.environ['PATH']

video_in = r'c:\Users\ASUS\Downloads\Portfolio\public\footer.mp4'
mobile_out = r'c:\Users\ASUS\Downloads\Portfolio\public\preloader.mp4'
desktop_out = r'c:\Users\ASUS\Downloads\Portfolio\public\preloader_desktop.mp4'

cap = cv2.VideoCapture(video_in)
fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
w_orig = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))   # 720
h_orig = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))  # 1280

print(f"Total frames: {total_frames}, Input size: {w_orig}x{h_orig} @ {fps}fps")

fourcc = cv2.VideoWriter_fourcc(*'avc1')
out_mobile = cv2.VideoWriter(mobile_out, fourcc, fps, (w_orig, h_orig))
out_desktop = cv2.VideoWriter(desktop_out, fourcc, fps, (1920, 1080))

# 1. Fonts
font_logo_name = ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf', 52)
font_title = ImageFont.truetype('C:/Windows/Fonts/impact.ttf', 46)
font_sub = ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf', 24)
font_pill = ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf', 20)

font_badge_big = ImageFont.truetype('C:/Windows/Fonts/impact.ttf', 76)
font_badge_sub = ImageFont.truetype('C:/Windows/Fonts/impact.ttf', 62)

# 2. Build Clean 3D Badges (No jagged cuts on letters)
def build_clean_badge(text1, text2):
    bw, bh = 580, 260
    b = Image.new('RGBA', (bw, bh), (0, 0, 0, 0))
    bd = ImageDraw.Draw(b)
    
    # Soft background plate matching the deep purple web tone
    bd.rounded_rectangle([0, 0, bw, bh], radius=24, fill=(18, 6, 36, 255))
    
    tb1 = bd.textbbox((0, 0), text1, font=font_badge_big)
    tb2 = bd.textbbox((0, 0), text2, font=font_badge_sub)
    x1 = (bw - (tb1[2] - tb1[0])) // 2
    x2 = (bw - (tb2[2] - tb2[0])) // 2
    
    # 3D Extrusion depth
    depth = 12
    for d in range(depth, 0, -1):
        bd.text((x1 + d, 28 + d), text1, font=font_badge_big, fill=(23, 8, 48))
        bd.text((x2 + d, 126 + d), text2, font=font_badge_sub, fill=(23, 8, 48))
        
    # Bevel highlight
    for d in range(2, 0, -1):
        bd.text((x1 + d, 28 + d), text1, font=font_badge_big, fill=(139, 92, 246))
        bd.text((x2 + d, 126 + d), text2, font=font_badge_sub, fill=(139, 92, 246))
        
    bd.text((x1, 28), text1, font=font_badge_big, fill=(245, 243, 255))
    bd.text((x2, 126), text2, font=font_badge_sub, fill=(216, 180, 254))
    
    return b.rotate(-11.5, resample=Image.BICUBIC, expand=True)

badge_frontend = build_clean_badge('FRONTEND', 'DEVELOPMENT')
badge_backend = build_clean_badge('BACKEND', 'DEVELOPMENT')

# 3. Scene 6 Template (Karthick Branding Card)
scene6_base = Image.new('RGB', (w_orig, h_orig), (18, 5, 42))
s6_draw = ImageDraw.Draw(scene6_base)

for y in range(0, h_orig):
    factor = y / h_orig
    r = int(32 * (1 - factor*0.5))
    g = int(4 * (1 - factor*0.3))
    b = int(84 * (1 - factor*0.6))
    s6_draw.line([(0, y), (w_orig, y)], fill=(r, g, b))

overlay = Image.new('RGBA', (w_orig, h_orig), (0, 0, 0, 0))
over_draw = ImageDraw.Draw(overlay)
for radius in range(320, 40, -10):
    alpha = int(45 * (1 - radius / 320))
    over_draw.ellipse([w_orig//2 - radius, 550 - radius, w_orig//2 + radius, 550 + radius], fill=(139, 92, 246, alpha))

scene6_base = Image.alpha_composite(scene6_base.convert('RGBA'), overlay).convert('RGB')
s6_draw = ImageDraw.Draw(scene6_base)

logo_text = '< Karthick.dev />'
bbox = s6_draw.textbbox((0, 0), logo_text, font=font_logo_name)
lw = bbox[2] - bbox[0]
s6_draw.text(((w_orig - lw)//2, 380), logo_text, font=font_logo_name, fill=(245, 243, 255))
s6_draw.text(((w_orig - lw)//2, 380), '<', font=font_logo_name, fill=(167, 139, 250))
s6_draw.text(((w_orig + lw)//2 - 40, 380), '/>', font=font_logo_name, fill=(167, 139, 250))

t1 = 'ASPIRING FULL STACK'
t2 = 'DEVELOPER & DATA ANALYST'
b1 = s6_draw.textbbox((0, 0), t1, font=font_title)
b2 = s6_draw.textbbox((0, 0), t2, font=font_title)
s6_draw.text(((w_orig - (b1[2]-b1[0]))//2, 490), t1, font=font_title, fill=(245, 243, 255))
s6_draw.text(((w_orig - (b2[2]-b2[0]))//2, 550), t2, font=font_title, fill=(245, 243, 255))

stack = 'REACT  •  JAVASCRIPT  •  SQL  •  ORACLE CLOUD'
bs = s6_draw.textbbox((0, 0), stack, font=font_sub)
s6_draw.text(((w_orig - (bs[2]-bs[0]))//2, 650), stack, font=font_sub, fill=(167, 139, 250))

p1 = 'ENGINEERED BY PASSION'
p2 = 'BUILT TO SCALE'
bp1 = s6_draw.textbbox((0, 0), p1, font=font_title)
bp2 = s6_draw.textbbox((0, 0), p2, font=font_title)
s6_draw.text(((w_orig - (bp1[2]-bp1[0]))//2, 740), p1, font=font_title, fill=(245, 243, 255))
s6_draw.text(((w_orig - (bp2[2]-bp2[0]))//2, 800), p2, font=font_title, fill=(167, 139, 250))

pill_text = 'BSc Computer Science • Madurai Kamaraj University'
bpill = s6_draw.textbbox((0, 0), pill_text, font=font_pill)
pw = bpill[2] - bpill[0]
px = (w_orig - pw) // 2
s6_draw.rounded_rectangle([px - 20, 930, px + pw + 20, 975], radius=20, fill=(40, 18, 75), outline=(139, 92, 246), width=2)
s6_draw.text((px, 940), pill_text, font=font_pill, fill=(245, 243, 255))

scene6_np = cv2.cvtColor(np.array(scene6_base), cv2.COLOR_RGB2BGR)

# 4. Prepare Desktop Widescreen Background Canvas (1920x1080)
dw, dh = 1920, 1080
desktop_bg = np.zeros((dh, dw, 3), dtype=np.uint8)

center_x = dw // 2
center_y = dh // 2
Y, X = np.ogrid[:dh, :dw]
dist = np.sqrt((X - center_x)**2 + (Y - center_y)**2)
max_dist = np.sqrt(center_x**2 + center_y**2)
factor = np.clip(dist / (max_dist * 0.75), 0, 1)

desktop_bg[:, :, 0] = (45 * (1 - factor) + 16 * factor).astype(np.uint8)
desktop_bg[:, :, 1] = (10 * (1 - factor) + 7 * factor).astype(np.uint8)
desktop_bg[:, :, 2] = (30 * (1 - factor) + 9 * factor).astype(np.uint8)

grid_color = [65, 20, 48]
for x in range(0, dw, 48):
    desktop_bg[:, x] = cv2.addWeighted(desktop_bg[:, x], 0.7, np.full_like(desktop_bg[:, x], grid_color), 0.3, 0)
for y in range(0, dh, 48):
    desktop_bg[y, :] = cv2.addWeighted(desktop_bg[y, :], 0.7, np.full_like(desktop_bg[y, :], grid_color), 0.3, 0)

# Precalculate scaling and offsets for 1080p
scaled_w = int(w_orig * dh / h_orig) # 607
offset_x = (dw - scaled_w) // 2
feather = 35

kernel = np.ones((3, 3), np.uint8)

frame_idx = 0
while True:
    ret, frame = cap.read()
    if not ret: break
    
    # Apply text modifications to frame
    if frame_idx >= 349:
        # Scene 6: Brand card
        web_crop = frame[0:220, 0:w_orig]
        mod_frame = scene6_np.copy()
        mod_frame[0:220, 0:w_orig] = web_crop
        if frame_idx < 365:
            alpha = (frame_idx - 349) / 16.0
            mod_frame = cv2.addWeighted(mod_frame, alpha, frame, 1.0 - alpha, 0)
            
    elif 39 <= frame_idx < 119:
        # Scene 2: FRONTEND DEVELOPMENT
        pil_frame = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)).convert('RGBA')
        bx = (w_orig - badge_frontend.width) // 2
        by = 430
        pil_frame.paste(badge_frontend, (bx, by), badge_frontend)
        mod_frame = cv2.cvtColor(np.array(pil_frame), cv2.COLOR_RGBA2BGR)
        
        # Spider overlay
        hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
        spider_mask = cv2.inRange(hsv, (10, 40, 40), (35, 255, 180))
        spider_roi = spider_mask[by:by+badge_frontend.height, bx:bx+badge_frontend.width]
        if np.count_nonzero(spider_roi) > 30:
            spider_roi_dil = cv2.dilate(spider_roi, kernel, iterations=1)
            for c in range(3):
                target = mod_frame[by:by+badge_frontend.height, bx:bx+badge_frontend.width, c]
                orig_crop = frame[by:by+badge_frontend.height, bx:bx+badge_frontend.width, c]
                target[spider_roi_dil == 255] = orig_crop[spider_roi_dil == 255]
                
    elif 120 <= frame_idx < 207:
        # Scene 3: BACKEND DEVELOPMENT
        pil_frame = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)).convert('RGBA')
        bx = (w_orig - badge_backend.width) // 2
        by = 430
        pil_frame.paste(badge_backend, (bx, by), badge_backend)
        mod_frame = cv2.cvtColor(np.array(pil_frame), cv2.COLOR_RGBA2BGR)
        
        # Spider overlay
        hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
        spider_mask = cv2.inRange(hsv, (10, 40, 40), (35, 255, 180))
        spider_roi = spider_mask[by:by+badge_backend.height, bx:bx+badge_backend.width]
        if np.count_nonzero(spider_roi) > 30:
            spider_roi_dil = cv2.dilate(spider_roi, kernel, iterations=1)
            for c in range(3):
                target = mod_frame[by:by+badge_backend.height, bx:bx+badge_backend.width, c]
                orig_crop = frame[by:by+badge_backend.height, bx:bx+badge_backend.width, c]
                target[spider_roi_dil == 255] = orig_crop[spider_roi_dil == 255]
                
    else:
        mod_frame = frame

    # 1. Write to mobile (720x1280)
    out_mobile.write(mod_frame)
    
    # 2. Compose and write to desktop (1920x1080)
    scaled_f = cv2.resize(mod_frame, (scaled_w, dh), interpolation=cv2.INTER_LANCZOS4)
    canvas = desktop_bg.copy()
    canvas[:, offset_x:offset_x+scaled_w] = scaled_f
    
    # Smooth edges with feather blend
    for i in range(feather):
        alpha = i / feather
        canvas[:, offset_x + i] = (scaled_f[:, i] * alpha + canvas[:, offset_x - feather + i] * (1 - alpha)).astype(np.uint8)
        canvas[:, offset_x + scaled_w - feather + i] = (scaled_f[:, scaled_w - feather + i] * (1 - alpha) + canvas[:, offset_x + scaled_w + i] * alpha).astype(np.uint8)
        
    out_desktop.write(canvas)
    
    frame_idx += 1

cap.release()
out_mobile.release()
out_desktop.release()

print("Mobile and Desktop preloader videos generated successfully!")
print(f"Mobile: {mobile_out} ({os.path.getsize(mobile_out)/1024/1024:.2f} MB)")
print(f"Desktop: {desktop_out} ({os.path.getsize(desktop_out)/1024/1024:.2f} MB)")
