$(document).ready(function(){
    initComputer();
})

function initComputer(){
    var $wrapper = $('#computer');
    var $button = $wrapper.find('[type="submit"]');
    var $result = $wrapper.find('[data-result]');
    $button.on('click', function(){
        var val1 = parseFloat($wrapper.find('#val1').val());
        var val2= parseFloat($wrapper.find('#val2').val());
        var result = (val1 / val2) * 100;

        var group; //default
        if(result == 0) {
            group = "0 nula je nula. prej tu ma byt nejaky info";
        }
        else if(inRange(result, 0.1, 25)) {
            group = "Stupeň normálně klenuté nohy (0,1-25%)";
        }
        else if(inRange(result, 25.1, 40)) {
            group = "Stupeň normálně klenuté nohy (25,1-40%)";
        }
        else if(inRange(result, 40.1, 45)) {
            group = "Stupeň normálně klenuté nohy (40,1-45%)";
        }
        else if(inRange(result, 45.1, 50)) {
            group = "Stupeň ploché nohy (45,1%-50%)";
        }
        else if(inRange(result, 50.1, 60)) {
            group = "Stupeň ploché nohy (50,1%-60%)";
        }
        else if(inRange(result, 60.1, 100)) {
            group = "Stupeň ploché nohy (60,1%-100%)";
        }else{
            group = "neco se rozbilo. zadals hodnoty?"
        };

        $result.text(result + " skupina: " + group);
    })
}

function inRange(x, min, max) {
    return min <= x && x <= max;
}