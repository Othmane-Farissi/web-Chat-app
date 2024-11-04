from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import logging
import json

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
    active_connections.append(websocket)
    logging.info(f"New client connected: {websocket.client}")

    try:
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)

            if message.get("type") == "typing":
                for connection in active_connections:
                    if connection != websocket:
                        await connection.send_text(json.dumps({"type": "typing", "username": message["username"]}))
            else:
                await broadcast(data)
    except WebSocketDisconnect:
        active_connections.remove(websocket)
        logging.info(f"Client disconnected: {websocket.client}")
        await broadcast(json.dumps({"type": "user_left"}))
