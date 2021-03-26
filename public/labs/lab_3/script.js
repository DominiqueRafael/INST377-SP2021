let curr = 1;

// next and previous
function next(n) {
    show(curr += n);
}

function showCurr(n) {
    show(curr = n);
}

function show(n) {
    let i;
    let pics = document.getElementsByClassName("item");

    if (n > pics.length) {
        curr = 1;
    }
    if (n < 1) {
        curr = pics.length;
    }

    for (i=0; i<pics.length; i++) {
        pics[i].style.display = "none";
    }
    
    pics[curr-1].style.display = "block";
    
}