from PIL import Image
import sys
import pyperclip
import random
import json

import animation

HEIGHT = 15
WIDTH = 15

with open("config.json", "r") as config:
    data = json.load(config)
    HEIGHT = data['tables']
    WIDTH = data['max_grades_per_table']

print('[*] oceny w linijce:', WIDTH)
print('[*] przedmiotow:', HEIGHT)

path = ''
if(len(sys.argv) == 2):
    path = sys.argv[1]
else:
    path = input('podaj nazwe pliku: ')

print('[*] ladowanie...')

if(animation.isVideo(path)):
    print('[*] plik zostanie potraktowany jako wideo')
    animation.handle(path, WIDTH, HEIGHT)
    exit()

try:
    im = Image.open(path)
except:
    print('[-] plik nie istnieje!')
    exit(-1)

im = im.resize((WIDTH, HEIGHT))
pixels = im.load()

print('[+] zaladowano plik')

jscode = ''
with open('script_image.js', 'r') as f:
    for line in f.readlines():
        jscode += line

for x in range(WIDTH):
    for y in range(HEIGHT):
        jscode += 'add(final[{}][0],"{}","rgb{}")'.format(y, random.randrange(4, 6), str(pixels[x, y])) + ';'

pyperclip.copy(jscode)
print('[+] skopiowano kod do schowka! wklej go do konsoli na librusie')