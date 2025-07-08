This is a Konovo Backend + Frontend Application

### 1. Kloniranje repozitorijuma

```bash
git clone https://github.com/nedeljkovicfilipdev/konovo-app.git

# Backend

Backend je zamišljen kao **posrednik između frontend aplikacije i eksternog API-ja**, i sadrži jednostavan sistem za autentikaciju i prikaz podataka.

---

## Pokretanje projekta

cd konovo-app/backend

Linux / macOS:

    python3 -m venv venv
    source venv/bin/activate

Windows:

    python -m venv venv
    venv\Scripts\activate

pip install -r requirements.txt
uvicorn main:app --reload


#Frontend

Frontend sadrži jednostavan sistem radi prikazivanja proizvoda bez korišćenja biblioteke za upravljanje stanja Redux

## Pokretanje projekta

cd konovo-app/frontend
npm i
npm run dev
