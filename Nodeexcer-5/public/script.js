document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetID = this.getAttribute('href').substring(1);
        document.getElementById(targetID).scrollIntoView({ behavior: 'smooth' });
    });
});
