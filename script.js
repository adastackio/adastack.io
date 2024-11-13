// Visitor counter
let count = 1337;
setInterval(() => {
    count++;
    document.getElementById('visitorCount').textContent = count;
}, 10000);

// Add sparkles to cursor
document.addEventListener('mousemove', (e) => {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = e.pageX + 'px';
    sparkle.style.top = e.pageY + 'px';
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
});
