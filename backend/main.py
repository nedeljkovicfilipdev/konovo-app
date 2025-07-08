from typing import Optional
from fastapi import FastAPI, HTTPException, Request, Header, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

EXTERNAL_API_URL = "https://zadatak.konovo.rs"
security = HTTPBearer()

class LoginRequest(BaseModel):
    username: str
    password: str

@app.post("/login")
def login(request: LoginRequest):
    try:
        response = requests.post(
            f"{EXTERNAL_API_URL}/login",
            json={
                "username": request.username,
                "password": request.password
            }
        )
        if response.status_code == 200:
            # Return the token (assuming the external API returns it as {"token": ...})
            return response.json()
        raise HTTPException(status_code=401, detail="Invalid credentials")
    except requests.RequestException:
        raise HTTPException(status_code=500, detail="External API error")

@app.get("/products")
def get_products(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    category: Optional[str] = None,
    search: Optional[str] = None
):
    auth_header = credentials.scheme + " " + credentials.credentials if credentials else None
    if not auth_header:
        raise HTTPException(status_code=401, detail="Authorization header missing")
    try:
        response = requests.get(
            f"{EXTERNAL_API_URL}/products",
            headers={"Authorization": auth_header}
        )
        # Check if the response is successful
        if response.status_code == 200:
            products = response.json()
            for product in products:
                if product.get("categoryName") and product.get("categoryName").lower() == "monitori":
                    product["price"] *= 1.1
                if product.get("description"):
                    product["description"] = product["description"].replace("brzina", "performanse").replace("Brzina", "Performanse").replace("BRZINA", "PERFORMANSE")
            # Filter by category if provided
            if category:
                products = [p for p in products if p.get("categoryName") == category]
            # Filter by search term if provided
            if search:
                search_lower = search.lower()
                products = [
                    p for p in products
                    if search_lower in p.get("naziv", "").lower()
                ]
            # Return the filtered products
            return products
        #Invalid token or other errors
        elif response.status_code == 403:
            raise HTTPException(status_code=403, detail="Forbidden: Invalid token")
        elif response.status_code == 401:
            raise HTTPException(status_code=401, detail="Invalid or expired token")
        else:
            raise HTTPException(status_code=response.status_code, detail="Error fetching products")
    except requests.RequestException:
        raise HTTPException(status_code=500, detail="External API error")

@app.get("/categories")
def get_categories(credentials: HTTPAuthorizationCredentials = Depends(security)):
    auth_header = credentials.scheme + " " + credentials.credentials if credentials else None
    if not auth_header:
        raise HTTPException(status_code=401, detail="Authorization header missing")
    try:
        response = requests.get(
            f"{EXTERNAL_API_URL}/products",
            headers={"Authorization": auth_header}
        )
        if response.status_code == 200:
            products = response.json()
            categories = list({p.get("categoryName") for p in products if p.get("categoryName")})
            return categories
        elif response.status_code == 401:
            raise HTTPException(status_code=401, detail="Invalid or expired token")
        else:
            raise HTTPException(status_code=response.status_code, detail="Error fetching categories")
    except requests.RequestException:
        raise HTTPException(status_code=500, detail="External API error")
