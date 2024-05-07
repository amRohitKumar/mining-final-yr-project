import torch
import torch.nn as nn
import torch.nn.functional as F
import torchvision.transforms as transforms
from PIL import Image
from random import uniform


class DirtDetector(nn.Module):
    def __init__(self):
        super(DirtDetector, self).__init__()
        self.conv1 = nn.Conv2d(3, 16, kernel_size=3, padding=1)
        self.conv2 = nn.Conv2d(16, 32, kernel_size=3, padding=1)
        self.fc1 = nn.Linear(32 * 56 * 56, 128)
        self.fc2 = nn.Linear(128, 1)
        self.sigmoid = nn.Sigmoid()

    def forward(self, x):
        x = F.relu(self.conv1(x))
        x = F.max_pool2d(x, 2)
        x = F.relu(self.conv2(x))
        x = F.max_pool2d(x, 2)
        x = x.view(-1, 32 * 56 * 56)
        x = F.relu(self.fc1(x))
        x = self.fc2(x)
        x = self.sigmoid(x)
        return x


def preprocess_image(img):
    width, height = img.size

    k = uniform(0.65, 1)
    new_height = int(k * height)
    new_width = int(k * width)

    transform = transforms.Compose(
        [
            transforms.RandomCrop((new_height, new_width)),
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
        ]
    )
    _image = transform(img)
    _image = _image.unsqueeze(0)
    return _image


def detect_dirt(img):
    model = DirtDetector()
    model.load_state_dict(
        torch.load("dirt_detector.pth", map_location=torch.device("cpu"))
    )
    input_tensor = preprocess_image(img)
    output = model(input_tensor)
    return output.item()


if __name__ == "__main__":
    model = DirtDetector()
    img_filepath = "C:\\Users\\mukhe\\Downloads\\Dataset_DirtBuildup_BeltConveyor\\Dirt Buildup\\162.JPG"
    img_file = Image.open(img_filepath)

    input_tensor = preprocess_image(img_file)
    output = model(input_tensor)
    print("Prediction:", output.item())
