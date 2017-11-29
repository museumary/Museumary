

// Get the modal
var modal = document.getElementById('Modal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    document.getElementsByClassName("tablink")[0].click();
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        document.getElementsByClassName("tablink")[0].click();
        modal.style.display = "none";
    }
}

document.getElementsByClassName("tablink")[0].click();

function openModel(evt, model) {
    var i, x, tablinks;
    x = document.getElementsByClassName("city");

    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < x.length; i++) {
        tablinks[i].classList.remove("w3-light-grey");
    }

    document.getElementById(model).style.display = "block";
    evt.currentTarget.classList.add("w3-light-grey");
}