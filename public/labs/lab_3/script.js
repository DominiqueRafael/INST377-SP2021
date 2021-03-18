/* Put your javascript in here */

let curr = 1
showPics(curr);

function showPics(curr) {
    let i;
    let pics = document.getElementsByClassName("item")
    if (curr > pics.length) {
        curr = 1
    }
    
}