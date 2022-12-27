let codediv1 = document.getElementById("codedivdiv1");
let codediv2 = document.getElementById("codedivdiv2");
let codediv3 = document.getElementById("codedivdiv3");


document.getElementById("prevbtn").addEventListener('click', function () {
    codediv1.scrollBy({
        behavior: 'smooth',
        left: -700,
        top: 0
    });
    codediv2.scrollBy({
        behavior: 'smooth',
        left: -700,
        top: 0
    });
    codediv3.scrollBy({
        behavior: 'smooth',
        left: -700,
        top: 0
    });
});

document.getElementById("nextbtn").addEventListener('click', function () {
    codediv1.scrollBy({
        behavior: 'smooth',
        left: +700,
        top: 0
    });
    codediv2.scrollBy({
        behavior: 'smooth',
        left: +700,
        top: 0
    });
    codediv3.scrollBy({
        behavior: 'smooth',
        left: +700,
        top: 0
    });
});
