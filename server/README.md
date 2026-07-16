1. Copy project to Raspberry Pi

Example:

scp -r vigilant-carnival pi@raspberrypi.local:/home/pi/

SSH:

ssh pi@raspberrypi.local

Go to server:

cd ~/vigilant-carnival/server
2. Install Python dependencies

Create a virtual environment (recommended):

python3 -m venv venv
source venv/bin/activate

Install:

pip install -r requirements.txt

If GPIO is needed:

pip install gpiozero

or:

pip install RPi.GPIO

For serial devices:

pip install pyserial
3. Configure GPIO

Edit:

nano config.py

Example:

GPIO_PINS = [
    17,
    27,
    22,
    23
]

SERIAL_DEVICE = "/dev/ttyACM0"

UPDATE_INTERVAL = 1.0

These are BCM GPIO numbers.

Example wiring:

Raspberry Pi

GPIO17  ---> LED / Relay / Sensor
GPIO27  ---> Button
GPIO22  ---> Sensor
GPIO23  ---> Sensor
4. Run the WebSocket server

From:

cd ~/vigilant-carnival/server

Activate environment:

source venv/bin/activate

Start:

python ws_server.py

Expected output:

Starting Raspberry Pi WebSocket Server
GPIO monitoring enabled
WebSocket listening on 0.0.0.0:8765

Your dashboard connects to:

ws://RASPBERRY_PI_IP:8765

Example:

ws://192.168.1.50:8765
