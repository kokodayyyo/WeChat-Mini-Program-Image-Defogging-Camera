import cv2
import BCCR

# 基于边界约束和上下文正则化的高效图像去雾
if __name__ == "__main__":
    HazeImg = cv2.imread('input/IN.jpg')  # read input image -- (**must be a color image**)
    HazeCorrectedImg, haze_map = BCCR.remove_haze(HazeImg, showHazeTransmissionMap=False)  # Remove Haze

    cv2.waitKey(0)
    cv2.imwrite("outputs/OUT.jpg", HazeCorrectedImg)
