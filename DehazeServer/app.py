import time
import cv2
import numpy as np
import base64
from flask import Flask, request, json, render_template
import os
import random
import datetime
from flask_apscheduler import APScheduler
import shutil


class Config:
    SCHEDULER_API_ENABLED = True


abs = os.getcwd() + '/'

app = Flask(__name__)

app.config.from_object(Config())

scheduler = APScheduler()

scheduler.init_app(app)

scheduler.start()


@scheduler.task('interval', id='定时清理', seconds=30)
def Clean():
    # 指定目录
    path = "/Graduate/DehazeServer/Template"
    # 获取当前时间
    now = time.time()
    # 遍历目录
    for dirpath, dirnames, filenames in os.walk(path):
        for dirname in dirnames:
            dir_full_path = os.path.join(dirpath, dirname)
            # 获取文件夹创建时间
            create_time = os.path.getctime(dir_full_path)
            # 判断文件夹创建时间是否超过20分钟
            if (now - create_time) // 60 > 1:
                # 删除文件夹
                shutil.rmtree(dir_full_path)


# -------------------接收图片写入本地------------------------------
@app.route('/one', methods=['GET', 'POST'])
def Transport():
    if request.method == 'POST':
        img_str = request.form['image']
        team_image = base64.b64decode(img_str)  # 解码前端base64图片数据
        image_data = np.fromstring(team_image, np.uint8)
        image_data = cv2.imdecode(image_data, cv2.IMREAD_COLOR)
        cv2.imwrite('/Graduate/DehazeServer/input/IN.jpg', image_data)  # 写入对应目录
    return "图片上传成功"


# -------------------返回base64图片------------------------------
@app.route('/two', methods=['GET', 'POST'])
def Deal():
    if request.method == 'GET':
        with open('/Graduate/DehazeServer/outputs/OUT.jpg', "rb") as f:
            img_byte = f.read()  # img_byte是图像的二进制编码
        img_b64 = base64.b64encode(img_byte)  # img_b64是字节类型变量，b64.encode()对字节类型变量进行b64编码，bytes->bytes
        img_str = img_b64.decode()  # img_str是字符串类型变量，decode()对字节类型变量进行解码，bytes->str
        return img_str


# -------------------室内图像处理--------------------------------
@app.route('/three', methods=['GET', 'POST'])
def DEAL1():
    if request.method == 'POST':
        os.system('python /Graduate/DehazeServer/indoorDehaze.py')
    return "图片处理成功"


# -------------------室外图像处理--------------------------------
@app.route('/four', methods=['GET', 'POST'])
def DEAL2():
    if request.method == 'POST':
        os.system('python /Graduate/DehazeServer/outdoorDehaze.py')
    return "图片处理成功"


# -------------------浓雾图像处理--------------------------------
@app.route('/five', methods=['GET', 'POST'])
def DEAL3():
    if request.method == 'POST':
        os.system('python /Graduate/DehazeServer/denseDehaze.py')
    return "图片处理成功"


# -------------------不均匀雾图像处理--------------------------------
@app.route('/six', methods=['GET', 'POST'])
def DEAL4():
    if request.method == 'POST':
        os.system('python /Graduate/DehazeServer/unevenDehaze.py')
    return "图片处理成功"


# -------------------BCCR图像增强(边界约束和上下文正则化)--------------------------------
@app.route('/seven', methods=['GET', 'POST'])
def DEAL5():
    if request.method == 'POST':
        os.system('python /Graduate/DehazeServer/EnhanceChoices/BCCRuse.py')
    return "图片处理成功"


# -------------------暗通道先验图像处理--------------------------------
@app.route('/eight', methods=['GET', 'POST'])
def DEAL6():
    if request.method == 'POST':
        os.system('python /Graduate/DehazeServer/EnhanceChoices/DarkChannelPrior.py')
    return "图片处理成功"


@app.route('/NewFolder', methods=['GET', 'POST'])
def newFolder():
    if request.method == 'GET':
        i = random.randint(0, 999)
        path = '/Graduate/DehazeServer/Template/' + str(i)  # 创建随机数文件夹，文件夹名为密码
        os.makedirs(path, 0o777)
        lists = os.listdir('/Graduate/DehazeServer/Template')  # 列出目录的下所有文件和文件夹保存到lists
        lists.sort(key=lambda fn: os.path.getmtime('/Graduate/DehazeServer/Template' + "/" + fn))  # 按时间排序
        file_new = os.path.join(lists[-1])  # 获取最新的文件保存到file_new，返回密码
        print(lists[-1])
        j = lists[-1]
    return j


# 暂存去雾结果 在Template中排列
@app.route('/New', methods=['GET', 'POST'])
def rebuild():
    if request.method == 'POST':
        img_str = request.form['Decode']
        TemPath = '/Graduate/DehazeServer/Template/' + img_str + '/SET.jpg'
        TemList = '/Graduate/DehazeServer/Template/' + img_str
        file = open("/Graduate/DehazeServer/outputs/OUT.jpg", "rb")
        data = file.read()
        file.close()
        new_file = open(TemPath, "wb")  # 将去雾结果复制到TemPath中
        new_file.write(data)
        new_file.close()
        imglist = os.listdir(TemList)
        for img in imglist:  # 重命名以保存
            if img.startswith('SET'):
                i = random.randint(0, 9999)
                src = os.path.join(os.path.abspath(TemList), img)  # 原先的图片名字
                dst = os.path.join(os.path.abspath(TemList), 'Template' + str(i) + img)  # 加上随机数便于存入
                os.rename(src, dst)  # 重命名,覆盖原先SET的名字

        for filename in sorted(os.listdir(TemList))[:-4]:  # ***只保留四个文件
            filename_relPath = os.path.join(TemList, filename)
            os.remove(filename_relPath)

        # j = 0
        path = TemList  # 读取该文件夹下所有的文件
        file_list = os.listdir(path)
        for i, fi in enumerate(file_list):
            old_name = os.path.join(path, fi)
            new_name = os.path.join(path, str(i)+".jpg")
            os.rename(old_name, new_name)

        # filelist = os.listdir(path)  # 遍历所有文件 再次批量重命名得到1234四个文件
        # for files in filelist:
        #     j = j + 1
        #     Olddir = os.path.join(path, files)  # 原来的文件路径
        #     Newdir = os.path.join(path, str(j) + ".jpg")  # 新的文件路径
        #     os.rename(Olddir, Newdir)
    return "已添加到历史记录"


# -------------------返回暂存的base64图片1------------------------------
@app.route('/Template1', methods=['GET', 'POST'])
def TEM1():
    global img_str
    if request.method == 'POST':
        img_str = request.form['Decode']
        return "ok"
    if request.method == 'GET':
        TemPath = '/Graduate/DehazeServer/Template/' + img_str + '/0.jpg'
        with open(TemPath, "rb") as f:
            img_byte = f.read()  # img_byte是图像的二进制编码
        img_b64 = base64.b64encode(img_byte)  # img_b64是字节类型变量，b64.encode()对字节类型变量进行b64编码，bytes->bytes
        img_str = img_b64.decode()  # img_str是字符串类型变量，decode()对字节类型变量进行解码，bytes->str
        return img_str


# -------------------返回暂存的base64图片2------------------------------
@app.route('/Template2', methods=['GET', 'POST'])
def TEM2():
    global img_str2
    if request.method == 'POST':
        img_str2 = request.form['Decode']
        return "ok"
    if request.method == 'GET':
        TemPath = '/Graduate/DehazeServer/Template/' + img_str2 + '/1.jpg'
        with open(TemPath, "rb") as f:
            img_byte = f.read()  # img_byte是图像的二进制编码
        img_b64 = base64.b64encode(img_byte)  # img_b64是字节类型变量，b64.encode()对字节类型变量进行b64编码，bytes->bytes
        img_str = img_b64.decode()  # img_str是字符串类型变量，decode()对字节类型变量进行解码，bytes->str
        return img_str


# -------------------返回暂存的base64图片3------------------------------
@app.route('/Template3', methods=['GET', 'POST'])
def TEM3():
    global img_str3
    if request.method == 'POST':
        img_str3 = request.form['Decode']
        return "ok"
    if request.method == 'GET':
        TemPath = '/Graduate/DehazeServer/Template/' + img_str3 + '/2.jpg'
        with open(TemPath, "rb") as f:
            img_byte = f.read()  # img_byte是图像的二进制编码
        img_b64 = base64.b64encode(img_byte)  # img_b64是字节类型变量，b64.encode()对字节类型变量进行b64编码，bytes->bytes
        img_str = img_b64.decode()  # img_str是字符串类型变量，decode()对字节类型变量进行解码，bytes->str
        return img_str


# -------------------返回暂存的base64图片4------------------------------
@app.route('/Template4', methods=['GET', 'POST'])
def TEM4():
    global img_str4
    if request.method == 'POST':
        img_str4 = request.form['Decode']
        return "ok"
    if request.method == 'GET':
        TemPath = '/Graduate/DehazeServer/Template/' + img_str4 + '/3.jpg'
        with open(TemPath, "rb") as f:
            img_byte = f.read()  # img_byte是图像的二进制编码
        img_b64 = base64.b64encode(img_byte)  # img_b64是字节类型变量，b64.encode()对字节类型变量进行b64编码，bytes->bytes
        img_str = img_b64.decode()  # img_str是字符串类型变量，decode()对字节类型变量进行解码，bytes->str
        return img_str


# if __name__ == '__main__':
#     app.run(debug=True, host='0.0.0.0', port=5000)
if __name__ == '__main__':
    app.run(debug=True, host='10.0.4.5', port=5000)
