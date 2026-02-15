from pymongo import MongoClient
import certifi

MONGO_URI = "mongodb+srv://prashant:test123456@ethara-assignment.rcgwofu.mongodb.net/"

client = MongoClient(
    MONGO_URI,
    tls=True,
    tlsCAFile=certifi.where(),
    serverSelectionTimeoutMS=5000,
)

db = client["core"]
employee_collection = db["employees"]
attendance_collection = db["attendance"]
