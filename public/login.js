const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.moveTo(30, 22);
ctx.lineTo(15, 35);
ctx.moveTo(15, 35);
ctx.lineTo(30, 49);
ctx.strokeStyle = 'white';
ctx.strokeStyle = 'white';
ctx.lineWidth = 2;
ctx.stroke();




canvas.addEventListener('click', function() {
            window.location.href = 'cadastro.html';
        });
