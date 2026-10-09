const canvas = document.getElementById('croquiCanvas');
const ctx = canvas.getContext('2d');
let desenhando = false;

const croquiRef = database.ref('croquis/sala_1/linhas');

canvas.addEventListener('mousedown', () => desenhando = true);
canvas.addEventListener('mouseup', () => {
    desenhando = false;
    ctx.beginPath();
});

canvas.addEventListener('mousemove', (e) => {
    if (!desenhando) return;

    const rect = canvas.getBoundingClientRect();
    const ponto = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        cor: document.getElementById('colorPicker').value,
        espessura: document.getElementById('strokeWidth').value,
        timestamp: Date.now()
    };

    // Envia o ponto para o Firebase em tempo real
    croquiRef.push(ponto);
});

// Escuta novos pontos enviados por qualquer usuário conectado
croquiRef.on('child_added', (snapshot) => {
    const p = snapshot.val();
    desenharPonto(p.x, p.y, p.cor, p.espessura);
});

function desenharPonto(x, y, cor, espessura) {
    ctx.lineWidth = espessura;
    ctx.lineCap = 'round';
    ctx.strokeStyle = cor;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}