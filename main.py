from PIL import Image
import sys
import pyperclip
import json
import time
import easygui

import animation

HEIGHT = 15
WIDTH = 15
FPS = 15

with open("config.json", "r") as config:
    data = json.load(config)
    HEIGHT = data['height']
    WIDTH = data['width']
    FPS = data['fps']

print('[*] grid', str(WIDTH) + 'x' + str(HEIGHT), 'ocen,', FPS, 'fps')

path = ''
wait = False
if(len(sys.argv) == 2):
    path = sys.argv[1]
else:
    path = easygui.fileopenbox()
    wait = True # probably double-clicked the file. wait so it doesnt close the console

print('[*] ladowanie...')

if(animation.isVideo(path)):
    print('[*] plik zostanie potraktowany jako wideo')
    time.sleep(1)
    animation.handle(path, WIDTH, HEIGHT, FPS)
    exit()

try:
    im = Image.open(path)
except:
    print('[-] plik nie istnieje!')
    if(wait): input('')
    exit(-1)

im = im.resize((WIDTH, HEIGHT))
pixels = im.load()

print('[+] zaladowano plik')

frame = []

for y in range(HEIGHT):
    for x in range(WIDTH):
        px = pixels[x,y]
        try:
            r,g,b,a = px
        except:
            r,g,b = px
        frame.append([r,g,b])

jscode = ''
with open('script_image.js', 'r') as f:
    for line in f.readlines():
        jscode += line
jscode += 'const data = ' + str(frame) + '; draw({},{})'.format(WIDTH, HEIGHT)

pyperclip.copy(jscode)
print('[+] skopiowano kod do schowka! wklej go do konsoli na librusie')

if(wait): input('')