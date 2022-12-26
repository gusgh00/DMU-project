let codediv = document.getElementById("codedivdiv");


document.getElementById("prevbtn").addEventListener('click', function () {
    codediv.scrollBy({
        behavior: 'smooth',
        left: -700,
        top: 0
    });
});

document.getElementById("nextbtn").addEventListener('click', function () {
    codediv.scrollBy({
        behavior: 'smooth',
        left: +700,
        top: 0
    });
});
