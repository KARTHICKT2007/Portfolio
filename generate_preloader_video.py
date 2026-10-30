import os, sys, cv2, numpy as np
from PIL import Image, ImageDraw, ImageFont

os.environ['PATH'] = os.getcwd() + ';' + os.environ['PATH']

video_in = r'c:\Users\ASUS\Downloads\Portfolio\public\footer.mp4'
video_out = r'c:\Users\ASUS\Downloads\Portfolio\public\preloader.mp4'

cap = cv2.VideoCapture(video_in)
fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

print(f"Generating custom preloader video: {total_frames} frames ({w}x{h} @ {fps}fps)...")

fourcc = cv2.VideoWriter_fourcc(*'avc1')
out = cv2.VideoWriter(video_out, fourcc, fps, (w, h))

# Fonts
font_logo_name = ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf', 52)
font_title = ImageFont.truetype('C:/Windows/Fonts/impact.ttf', 46)
font_sub = ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf', 24)
font_pill = ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf', 20)

font_badge_big = ImageFont.truetype('C:/Windows/Fonts/impact.ttf', 70)
font_badge_sub = ImageFont.truetype('C:/Windows/Fonts/impact.ttf', 58)

# 1. Prepare Scene 6 (Karthick's branding)
scene6_base = Image.new('RGB', (w, h), (18, 5, 42))
s6_draw = ImageDraw.Draw(scene6_base)

for y in range(0, h):
    factor = y / h
    r = int(32 * (1 - factor*0.5))
    g = int(4 * (1 - factor*0.3))
    b = int(84 * (1 - factor*0.6))
    s6_draw.line([(0, y), (w, y)], fill=(r, g, b))

# Ambient radial purple glow
overlay = Image.new('RGBA', (w, h), (0, 0, 0, 0))
over_draw = ImageDraw.Draw(overlay)
for radius in range(320, 40, -10):
    alpha = int(45 * (1 - radius / 320))
    over_draw.ellipse([w//2 - radius, 550 - radius, w//2 + radius, 550 + radius], fill=(139, 92, 246, alpha))

scene6_base = Image.alpha_composite(scene6_base.convert('RGBA'), overlay).convert('RGB')
s6_draw = ImageDraw.Draw(scene6_base)

# Logo
logo_text = '< Karthick.dev />'
bbox = s6_draw.textbbox((0, 0), logo_text, font=font_logo_name)
lw = bbox[2] - bbox[0]
s6_draw.text(((w - lw)//2, 380), logo_text, font=font_logo_name, fill=(245, 243, 255))
s6_draw.text(((w - lw)//2, 380), '<', font=font_logo_name, fill=(167, 139, 250))
s6_draw.text(((w + lw)//2 - 40, 380), '/>', font=font_logo_name, fill=(167, 139, 250))

# Subtitle
t1 = 'ASPIRING FULL STACK'
t2 = 'DEVELOPER & DATA ANALYST'
b1 = s6_draw.textbbox((0, 0), t1, font=font_title)
b2 = s6_draw.textbbox((0, 0), t2, font=font_title)
s6_draw.text(((w - (b1[2]-b1[0]))//2, 490), t1, font=font_title, fill=(245, 243, 255))
s6_draw.text(((w - (b2[2]-b2[0]))//2, 550), t2, font=font_title, fill=(245, 243, 255))

# Tech Stack
stack = 'REACT  •  JAVASCRIPT  •  SQL  •  ORACLE CLOUD'
bs = s6_draw.textbbox((0, 0), stack, font=font_sub)
s6_draw.text(((w - (bs[2]-bs[0]))//2, 650), stack, font=font_sub, fill=(167, 139, 250))

# Punchline
p1 = 'ENGINEERED BY PASSION'
p2 = 'BUILT TO SCALE'
bp1 = s6_draw.textbbox((0, 0), p1, font=font_title)
bp2 = s6_draw.textbbox((0, 0), p2, font=font_title)
s6_draw.text(((w - (bp1[2]-bp1[0]))//2, 740), p1, font=font_title, fill=(245, 243, 255))
s6_draw.text(((w - (bp2[2]-bp2[0]))//2, 800), p2, font=font_title, fill=(167, 139, 250))

# Degree & University pill
pill_text = 'BSc Computer Science • Madurai Kamaraj University'
bpill = s6_draw.textbbox((0, 0), pill_text, font=font_pill)
pw = bpill[2] - bpill[0]
px = (w - pw) // 2
s6_draw.rounded_rectangle([px - 20, 930, px + pw + 20, 975], radius=20, fill=(40, 18, 75), outline=(139, 92, 246), width=2)
s6_draw.text((px, 940), pill_text, font=font_pill, fill=(245, 243, 255))

scene6_np = cv2.cvtColor(np.array(scene6_base), cv2.COLOR_RGB2BGR)

# 2. Helper to build tilted badges for Scene 2 & 3
def build_badge(text1, text2):
    bw, bh = 570, 260
    b = Image.new('RGBA', (bw, bh), (0, 0, 0, 0))
    bd = ImageDraw.Draw(b)
    
    # Outer 3D glow frame
    bd.rounded_rectangle([0, 0, bw, bh], radius=26, fill=(18, 7, 36, 252), outline=(139, 92, 246, 255), width=3)
    bd.rounded_rectangle([6, 6, bw - 6, bh - 6], radius=22, outline=(167, 139, 250, 140), width=2)
    
    tb1 = bd.textbbox((0, 0), text1, font=font_badge_big)
    tb2 = bd.textbbox((0, 0), text2, font=font_badge_sub)
    
    bd.text(((bw - (tb1[2]-tb1[0]))//2, 34), text1, font=font_badge_big, fill=(245, 243, 255))
    bd.text(((bw - (tb2[2]-tb2[0]))//2, 134), text2, font=font_badge_sub, fill=(167, 139, 250))
    
    # Rotate by -11.5 deg
    return b.rotate(-11.5, resample=Image.BICUBIC, expand=True)

badge_frontend = build_badge('FRONTEND', 'DEVELOPMENT')
badge_backend = build_badge('BACKEND', 'DEVELOPMENT')

# Kernel for dilation
kernel = np.ones((3, 3), np.uint8)

frame_idx = 0
while True:
    ret, frame = cap.read()
    if not ret: break
    
    if frame_idx >= 349:
        # Scene 6: Brand card
        web_crop = frame[0:220, 0:w]
        modified = scene6_np.copy()
        modified[0:220, 0:w] = web_crop
        
        # Smooth transition into brand scene
        if frame_idx < 365:
            alpha = (frame_idx - 349) / 16.0
            modified = cv2.addWeighted(modified, alpha, frame, 1.0 - alpha, 0)
        out.write(modified)
        
    elif 39 <= frame_idx < 119:
        # Scene 2: FRONTEND DEVELOPMENT
        pil_frame = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)).convert('RGBA')
        bx = (w - badge_frontend.width) // 2
        by = 435
        pil_frame.paste(badge_frontend, (bx, by), badge_frontend)
        modified = cv2.cvtColor(np.array(pil_frame), cv2.COLOR_RGBA2BGR)
        
        # Restore rope
        rope_strip = frame[by:by+badge_frontend.height, 340:372]
        gray_rope = cv2.cvtColor(rope_strip, cv2.COLOR_BGR2GRAY)
        rope_mask = cv2.dilate((gray_rope > 155).astype(np.uint8), kernel, iterations=1)
        for c in range(3):
            target = modified[by:by+badge_frontend.height, 340:372, c]
            target[rope_mask == 1] = rope_strip[:, :, c][rope_mask == 1]
            
        # Restore spider
        hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
        spider_mask = cv2.inRange(hsv, (10, 40, 40), (35, 255, 180))
        # Keep spider in badge region
        spider_roi = spider_mask[by:by+badge_frontend.height, bx:bx+badge_frontend.width]
        if np.count_nonzero(spider_roi) > 30:
            spider_roi_dil = cv2.dilate(spider_roi, kernel, iterations=1)
            for c in range(3):
                target = modified[by:by+badge_frontend.height, bx:bx+badge_frontend.width, c]
                orig_crop = frame[by:by+badge_frontend.height, bx:bx+badge_frontend.width, c]
                target[spider_roi_dil == 255] = orig_crop[spider_roi_dil == 255]
                
        out.write(modified)
        
    elif 120 <= frame_idx < 207:
        # Scene 3: BACKEND DEVELOPMENT
        pil_frame = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)).convert('RGBA')
        bx = (w - badge_backend.width) // 2
        by = 435
        pil_frame.paste(badge_backend, (bx, by), badge_backend)
        modified = cv2.cvtColor(np.array(pil_frame), cv2.COLOR_RGBA2BGR)
        
        # Restore rope
        rope_strip = frame[by:by+badge_backend.height, 340:372]
        gray_rope = cv2.cvtColor(rope_strip, cv2.COLOR_BGR2GRAY)
        rope_mask = cv2.dilate((gray_rope > 155).astype(np.uint8), kernel, iterations=1)
        for c in range(3):
            target = modified[by:by+badge_backend.height, 340:372, c]
            target[rope_mask == 1] = rope_strip[:, :, c][rope_mask == 1]
            
        # Restore spider
        hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
        spider_mask = cv2.inRange(hsv, (10, 40, 40), (35, 255, 180))
        spider_roi = spider_mask[by:by+badge_backend.height, bx:bx+badge_backend.width]
        if np.count_nonzero(spider_roi) > 30:
            spider_roi_dil = cv2.dilate(spider_roi, kernel, iterations=1)
            for c in range(3):
                target = modified[by:by+badge_backend.height, bx:bx+badge_backend.width, c]
                orig_crop = frame[by:by+badge_backend.height, bx:bx+badge_backend.width, c]
                target[spider_roi_dil == 255] = orig_crop[spider_roi_dil == 255]
                
        out.write(modified)
        
    else:
        # Scene 1 (Spiderman swing), Scene 4 (Web Development), Scene 5 (UI/UX Design)
        out.write(frame)
        
    frame_idx += 1

cap.release()
out.release()
print("Custom preloader video generated successfully!")
