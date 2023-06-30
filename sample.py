# import socket

# HOST = 'localhost'
# PORT = 5000

# with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
#     s.bind((HOST, PORT))
#     print('waiting for data')
#     while True:
#         data, addr = s.recvfrom(1024) # Receive data and source address
#         print('Received data:', data.decode('utf-8')) # Decode and print the received data
from sklearn.metrics import plot_confusion_matrix
