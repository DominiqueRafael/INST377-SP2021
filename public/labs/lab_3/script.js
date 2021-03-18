/* Put your javascript in here */

let curr = 1
showPics(curr);

function showNext(curr) {
    if (curr + 1 > curr.length) {
        curr = 1
    } else {
        curr = curr + 1
    }
}

function showPrev(curr) {
    if (curr - 1 == 0){
        curr = curr.length
    } else {
        curr = curr - 1
    }
}

function showPics(curr) {
    let pics = document.getElementsByClassName("item");
    for (let p of pics) {
        p.style.display = "none";
    }
    pics[curr - 1].style.display = "block";
}