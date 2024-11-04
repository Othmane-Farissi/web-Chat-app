from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import logging

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

active_connections = []

async def broadcast(message: str):
    logging.info(f"Broadcasting message to {len(active_connections)} clients.")
    for connection in active_connections:
        await connection.send_text(message)

@app.websocket("/ws/chat")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    logging.info(f"New client connected: {websocket.client}")
    
    active_connections.append(websocket)
    logging.info(f"Current connections: {len(active_connections)}")

    try:
        while True:
            data = await websocket.receive_text()
            logging.info(f"Received message: {data} from {websocket.client}")
            await broadcast(data)
    except WebSocketDisconnect:
        active_connections.remove(websocket)
        logging.info(f"Client disconnected: {websocket.client}")
        logging.info(f"Current connections: {len(active_connections)}")
        await broadcast("")


#TO RUN BACKEND  :  $ uvicorn server:app --host 127.0.0.1 --port 8000