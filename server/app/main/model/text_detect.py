"""
Copyright (c) 2019-present NAVER Corp.
MIT License
"""

# -*- coding: utf-8 -*-
import os
import torch
from torch.autograd import Variable
import cv2
import numpy as np

from app.main.config import basedir
import app.main.model.craft_utils as craft_utils
import app.main.model.imgproc as imgproc
import app.main.model.file_utils as file_utils

from app.main.model.craft import CRAFT

from collections import OrderedDict

def copyStateDict(state_dict):
    if list(state_dict.keys())[0].startswith("module"):
        start_idx = 1
    else:
        start_idx = 0
    new_state_dict = OrderedDict()
    for k, v in state_dict.items():
        name = ".".join(k.split(".")[start_idx:])
        new_state_dict[name] = v
    return new_state_dict

result_folder = './result/'
if not os.path.isdir(result_folder):
    os.mkdir(result_folder)

def test_net(net, image, text_threshold, link_threshold, low_text, cuda, poly, canvas_size, mag_ratio,refine_net=None):
    # resize
    img_resized, target_ratio, size_heatmap = imgproc.resize_aspect_ratio(image, canvas_size, interpolation=cv2.INTER_LINEAR, mag_ratio=mag_ratio)
    ratio_h = ratio_w = 1 / target_ratio

    # preprocessing
    x = imgproc.normalizeMeanVariance(img_resized)
    x = torch.from_numpy(x).permute(2, 0, 1)    # [h, w, c] to [c, h, w]
    x = Variable(x.unsqueeze(0))                # [c, h, w] to [b, c, h, w]
    if cuda:
        x = x.cuda()

    # forward pass
    with torch.no_grad():
        y, feature = net(x)

    # make score and link map
    score_text = y[0,:,:,0].cpu().data.numpy()
    score_link = y[0,:,:,1].cpu().data.numpy()

    # Post-processing
    boxes, polys = craft_utils.getDetBoxes(score_text, score_link, text_threshold, link_threshold, low_text, poly)

    # coordinate adjustment
    boxes = craft_utils.adjustResultCoordinates(boxes, ratio_w, ratio_h)
    polys = craft_utils.adjustResultCoordinates(polys, ratio_w, ratio_h)

    for k in range(len(polys)):
        if polys[k] is None: polys[k] = boxes[k]

    # render results (optional)
    render_img = score_text.copy()
    render_img = np.hstack((render_img, score_link))
    ret_score_text = imgproc.cvt2HeatmapImg(render_img)

    return boxes, polys, ret_score_text

def test(folder_path):
    params = {
        'trained_model': os.path.join(basedir, 'model/weights/craft_mlt_25k.pth'),
        'text_threshold': 0.7,
        'low_text': 0.4,
        'link_threshold': 0.4,
        'canvas_size': 1280,
        'mag_ratio': 1.5,
        'poly': False,
        'cuda': False
    }
    image_list, _, _ = file_utils.get_files(folder_path)
    net = CRAFT()
    net.load_state_dict(copyStateDict(torch.load(params['trained_model'], map_location='cpu')))
    net.eval()
    for k, image_path in enumerate(image_list):
        print("Test image {:d}/{:d}: {:s}".format(k + 1, len(image_list), image_path), end='\r')
        image = imgproc.loadImage(os.path.abspath(image_path))

        bboxes, polys, score_text = test_net(net, image, params['text_threshold'], params['link_threshold'],
                                             params['low_text'], params['cuda'], params['poly'], params['canvas_size'],
                                             params['mag_ratio'])

        # save score text
        file_utils.saveResult(image_path, image[:, :, ::-1], polys, dirname=folder_path)

if __name__ == '__main__':
    test("/Users/willcheng/Desktop/text_detection/server/app/main/static/upload/k8ve4qhf/original.png")