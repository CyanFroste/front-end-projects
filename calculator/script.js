function display(value) {
    if(document.getElementById("display").value == "SYNTAX ERROR"){
        document.getElementById("display").value = "";
    }
    document.getElementById("display").value += value;
    document.getElementById("display").focus();
}

function calculate() {
    try{
        let display = document.getElementById("display").value;
        document.getElementById("display").value = eval(display);
    }catch(e){
        document.getElementById("display").value = "SYNTAX ERROR";        
    }
}
function clr() {
    document.getElementById("display").value = "";
}