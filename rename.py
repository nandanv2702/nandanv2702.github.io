import os
from PIL import Image

prefix = "/Users/nandanv/Documents/WebDev/nandanv2702.github.io/image/stills"

os.chdir(prefix)

f_old = os.listdir()

suffix = 'img'

count = 0

for i in range(len(f_old)):
    if os.path.isfile(prefix + "/" + f_old[i]):
        os.rename(f_old[i], "img" + str(count) + ".png")
        count += 1

# for i in range(1):
#     # replace "/" with os.path.join() for your use
#     img = Image.open(prefix + "/" + f_old[i])
#     img_cp = img.copy()
#     size = img_cp.size
#     new_size = []
#     new_size.insert(0, int(0.1*size[0]))
#     new_size.insert(1, int(0.1*size[1]))
#     new_size = tuple(new_size)
#     img_cp.resize(new_size, Image.BICUBIC)
#     img_cp.save(prefix + "/" + "_thumb" + f_old[i])
#     # img2.save(prefix + "/" + "scaled_" + f_old[i], optimize=True,quality=10)
#     img.close()
#     img_cp.close()
