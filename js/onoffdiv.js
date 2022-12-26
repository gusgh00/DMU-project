function onoff() {
    let codediv = document.getElementById('codediv');
    let title = document.getElementById("listtitle");

    if (codediv.style.top === '60px') {
        codediv.style.top = '730px';
        codediv.style.opacity = '0.4';
    }
    else {
        codediv.style.top = '60px';
        codediv.style.opacity = '0.9';
    }
}