import os
from flask import Flask, render_template, jsonify
import firebase_admin
from firebase_admin import credentials, db

# Configura o Flask para reconhecer as pastas de templates e estáticos
app = Flask(__name__, template_folder='templates', static_folder='static')

# Inicialização segura do Firebase Admin no ambiente da Vercel
if not firebase_admin._apps:
    if os.path.exists("dados.json"):
        cred = credentials.Certificate("dados.json")
    else:
        cred = credentials.Certificate({
            "type": "service_account",
            "project_id": os.getenv("FIREBASE_PROJECT_ID", "projetocroqui-105df"),
            "private_key": os.getenv("FIREBASE_PRIVATE_KEY", "").replace('\\n', '\n'),
            "client_email": os.getenv("FIREBASE_CLIENT_EMAIL")
        })

    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://projetocroqui-105df-default-rtdb.firebaseio.com'
    })

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/status', methods=['GET'])
def status():
    return jsonify({"status": "Servidor rodando", "projeto": "projetocroqui-105df"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)