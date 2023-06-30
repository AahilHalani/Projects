import pygame
import random
import socket
import selectors
import os
import time
pygame.init()

timer = pygame.time.Clock()
fps = 120
white = (255, 255, 255)
black = (0, 0, 0)
gray = (128, 128, 128)
red = (255, 0, 0)
orange = (255, 128, 0)
green = (0, 255, 0)
blue = (0, 0, 255)
purple = (255, 0, 255)
player_speed = 10
WIDTH = 1500
HEIGHT = 770
player_x = 700
player_direction = 0
ball_x = WIDTH / 2
ball_y = HEIGHT - 30
ball_x_direction = 0
ball_y_direction = 0
ball_x_speed = 1
ball_y_speed = 1
NUM_BLOCKED_BOXES = 3
'''board = [[5, 5, 5, 5, 5], [4, 4, 4, 4, 4], [3, 3, 3, 3, 3], [2, 2, 2, 2, 2], [1, 1, 1, 1, 1]]'''
board = []
blocked_board = []
create_new = True
colors = [red, orange, green, blue, purple]
screen = pygame.display.set_mode([WIDTH, HEIGHT])
active = False
score = 0
HOST = 'localhost'
PORT = 5000
font = pygame.font.Font('freesansbold.ttf', 30)
weights = [0.7,0.3]
last_change_time = time.time()




def create_new_board():
    board = []
    x = 15
    rows = random.randint(4, 6)
    for i in range(rows):
        row = []
        for j in range(x):
            row.append(random.randint(1, 5))
        board.append(row)
    return board

def create_new_blocked_blocks():
    print('create new blocked')
    global blocked_blocks
    global NUM_BLOCKED_BOXES
    NUM_BLOCKED_BOXES = 3
    blocked_blocks = []
    for i in range(NUM_BLOCKED_BOXES):
        blocked_blocks.append(draw_blocked())


def draw_board(board):
    board_squares = []
    for i in range(len(board)):
        for j in range(len(board[i])):
            if board[i][j] > 0:
                piece = pygame.draw.rect(screen, colors[(board[i][j]) - 1], [j * 100, i * 40, 98, 38], 0, 5)
                pygame.draw.rect(screen, black, [j * 100, i * 40, 98, 38], 5, 5)
                top = pygame.rect.Rect((j * 100, i * 40), (98, 1))
                bot = pygame.rect.Rect((j * 100, (i * 40) + 40), (98, 1))
                left = pygame.rect.Rect((j * 100, i * 40), (40, 1))
                right = pygame.rect.Rect(((j * 100) + 98, i * 40), (40, 1))
                board_squares.append([top, bot, left, right, (i, j)])
    return board_squares

def add_difficulty():
    global weights
    global ball_x_speed
    global ball_y_speed
    global NUM_BLOCKED_BOXES
    global blocked_blocks
    number = random.choices([1,2],weights=weights)[0]

    if number == 1:
        if NUM_BLOCKED_BOXES == 15:
            pass
        else:
            NUM_BLOCKED_BOXES += 1
            blocked_blocks.append(draw_blocked())
    else:
        if ball_x_speed >= 10 or ball_y_speed >= 10:
            pass
        else:
            ball_x_speed += 1
            ball_y_speed += 1


def reduce_difficulty():
    global weights
    global ball_x_speed
    global ball_y_speed
    global NUM_BLOCKED_BOXES
    global blocked_blocks
    number = random.choices([1,2],weights=weights)[0]

    if number == 1:
        if NUM_BLOCKED_BOXES <= 3:
            pass
        else:
            NUM_BLOCKED_BOXES -= 1
            index_to_remove = random.randint(0,len(blocked_blocks)-1)
            blocked_blocks.pop(index_to_remove)
    else:
        if ball_x_speed <= 5 or ball_y_speed <= 5:
            pass
        else:
            ball_x_speed -= 1
            ball_y_speed -= 1

blocked_blocks = []
value = 'sad'
prev_val = 'sad'
def draw_blocked():

    #x >= 10 395
    #y >= 300 600
    while True:
        x = random.randrange(10, 1500,100)
        y = random.randrange(300,600,40)
        new_tuple = (x,y)
        if new_tuple in [square[-1] for square in blocked_blocks]:
            continue    
        else:
            break        
    top = pygame.rect.Rect((x,y), (98,1))
    bottom = pygame.rect.Rect((x, y + 40), (98, 1))
    left = pygame.rect.Rect((x, y), (40, 1))
    right = pygame.rect.Rect((x + 98, y), (40, 1))
    return ([top,bottom,left,right,(x,y)])

        # piece = pygame.draw.rect(screen, (255,255,255), [x,y, 98, 38], 0, 5)
        # piece = pygame.draw.rect(screen, (255,255,255), [x,y, 98, 38], 0, 5)
        # pygame.draw.rect(screen, black, [j * 100, i * 40, 98, 38], 5, 5)
        # top = pygame.rect.Rect((j * 100, i * 40), (98, 1))
        # bot = pygame.rect.Rect((j * 100, (i * 40) + 37), (98, 1))
        # left = pygame.rect.Rect((j * 100, i * 40), (37, 1))
        # right = pygame.rect.Rect(((j * 100) + 97, i * 40), (37, 1))

for i in range(NUM_BLOCKED_BOXES):
    blocked_blocks.append(draw_blocked())
run = True
with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
    # Set the socket to non-blocking mode
    s.bind((HOST, PORT))
    s.setblocking(False)
    print('waiting for data')
    data = None
    while run:
        prev_val = value
        try:
            data, addr = s.recvfrom(1024) # Receive data and source address
            print('Received', data.decode('utf-8'), 'bytes from' ,addr)
            value = data.decode('utf-8')
        except BlockingIOError as e:
            if e.errno == 10035: # No data available
                pass
                #value = None # Sleep briefly before trying again
            else:
                print(f'Socket error: {e}') # Handle other socket errors as appropriate
        except Exception as e:
            print(f'Error: {e}')
        
        screen.fill(gray)
        timer.tick(fps)
        if create_new:
            board = create_new_board()
            create_new_blocked_blocks()
            ball_x_speed = 1
            ball_y_speed = 1
            create_new = False
            create_new_blocked = False
        squares = draw_board(board)
        for i in range(NUM_BLOCKED_BOXES):
            # 98 38
            piece = pygame.draw.rect(screen, (255,255,255), [blocked_blocks[i][4][0],blocked_blocks[i][4][1], 85, 45], 0, 5)
            pygame.draw.rect(screen, black, [blocked_blocks[i][4][0],blocked_blocks[i][4][1], 85, 45], 5, 5)
        player = pygame.draw.rect(screen, black, [player_x, HEIGHT - 20, 120, 15], 0, 3)
        pygame.draw.rect(screen, white, [player_x + 5, HEIGHT - 18, 110, 11], 3, 3)
        ball = pygame.draw.circle(screen, white, (ball_x, ball_y), 10)
        pygame.draw.circle(screen, black, (ball_x, ball_y), 10, 3)

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                run = False
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE and not active:
                    active = True
                    ball_y_direction = -1
                    ball_x_direction = random.choice([-1, 1])
                    score = 0
                if event.key == pygame.K_RIGHT and active:
                    if player_x >= WIDTH - 130:
                        player_direction = 0
                    else:
                        player_direction = 1
                if event.key == pygame.K_LEFT and active:
                    if player_x <= 10:
                        player_direction = 0
                    else:
                        player_direction = -1
            if event.type == pygame.KEYUP:
                if event.key == pygame.K_RIGHT:
                    player_direction = 0
                if event.key == pygame.K_LEFT:
                    player_direction = 0

        if ball_x <= 10 or ball_x >= WIDTH - 10:
            ball_x_direction *= -1
        
        if time.time() - last_change_time >= 3 or value != prev_val:
            if value == 'happy':
                reduce_difficulty()
            if value == 'sad':
                add_difficulty()
            last_change_time = time.time()


        for i in range(len(squares)):
            # top, bot, left, right, coords
            if ball.colliderect(squares[i][0]) or ball.colliderect(squares[i][1]):
                print('top,bottom collide',ball_x_direction,ball_y_direction)
                ball_y_direction *= -1
                board[squares[i][4][0]][squares[i][4][1]] -= 1
                score += 1
            if (ball.colliderect(squares[i][2]) and ball_x_direction == 1) or \
                    (ball.colliderect(squares[i][3]) and ball_x_direction == -1):
                print('left,right collide',ball_x_direction,ball_y_direction)
                ball_x_direction *= -1
                board[squares[i][4][0]][squares[i][4][1]] -= 1
                score += 1
        for i in range(len(blocked_blocks)):
            if ball.colliderect(blocked_blocks[i][0]) or ball.colliderect(blocked_blocks[i][1]):
                print("hit top or bottom")
                # print(ball)
                # print('blocked top,bottom collide',blocked_blocks[i],ball_x_direction,ball_y_direction)
                ball_y_direction *= -1
            if (ball.colliderect(blocked_blocks[i][2]) and ball_x_direction == 1) or \
                    (ball.colliderect(blocked_blocks[i][3]) and ball_x_direction == -1):
                print('hit left or right')
                ball_x_direction *= -1 
        if ball.colliderect(player):
            if player_direction == ball_x_direction:
                #ball_x_speed += 1
                pass
            elif player_direction == -ball_x_direction and ball_x_speed > 1:
                ball_x_speed -= 1
            elif player_direction == -ball_x_direction and ball_x_speed == 1:
                ball_x_direction *= -1

            ball_y_direction = -1

        ball_y += ball_y_direction * ball_y_speed
        ball_x += ball_x_direction * ball_x_speed
        player_x += player_direction * player_speed

        if ball_y <= 10:
            ball_y = 10
            ball_y_direction *= -1



        if player_x <= 10:
            player_direction = 0

        if player_x >= WIDTH - 130:
            player_direction = 0

        if ball_y >= HEIGHT - 10 or len(squares) == 0:
            active = False
            player_x = 700
            player_direction = 0
            ball_x = WIDTH / 2
            ball_y = HEIGHT - 30
            ball_x_direction = 0
            ball_y_direction = 0
            ball_x_speed = 5
            ball_y_speed = 5
            create_new = True
            create_new_blocked = True
        score_text = font.render(f'Score {score}', True, white)
        screen.blit(score_text, (8, 3))
        score_text = font.render(f'Score {score}', True, black)
        screen.blit(score_text, (10, 5))


        if not active:
            start_text = font.render('Space bar to start the game', True, black)
            screen.blit(start_text, (500, 400))

        pygame.display.flip()
pygame.quit()