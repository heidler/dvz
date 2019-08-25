$(document).ready(function(){
    initComputer();
})

function initComputer(){
    var $wrapper = $('#computer');
    var $button = $wrapper.find('[type="submit"]');
    var $result = $wrapper.find('[data-result]');
    var $resultBox = $wrapper.find('[data-result-box]');
    $button.on('click', function(){
        var val1 = parseFloat($wrapper.find('#val1').val());
        var val2= parseFloat($wrapper.find('#val2').val());
        var result = ((val1 / val2) * 100).toFixed(2);

        var group; //default
        if(result == 0) {
            group = "Hodnota b nesmí být rovna 0.";
        }
        else if(inRange(result, 0.1, 25)) {
            group = "Tato hodnota odpovídá stupni normálně klenuté nohy (0,1–25 %).";
        }
        else if(inRange(result, 25.1, 40)) {
            group = "Tato hodnota odpovídá stupni normálně klenuté nohy (25,1–40 %).";
        }
        else if(inRange(result, 40.1, 45)) {
            group = "Tato hodnota odpovídá stupni normálně klenuté nohy (40,1–45 %).";
        }
        else if(inRange(result, 45.1, 50)) {
            group = "Tato hodnota odpovídá stupni ploché nohy (45,1–50 %).";
        }
        else if(inRange(result, 50.1, 60)) {
            group = "Tato hodnota odpovídá stupni ploché nohy (50,1–60 %).";
        }
        else if(inRange(result, 60.1, 100)) {
            group = "Tato hodnota odpovídá stupni ploché nohy (60,1–100 %).";
        } else{
            group = "Zadal jsi správně hodnoty a, b?"
        };

        $result.html("Výsledek indexu nohy je " + result + ". " + group);
        $resultBox.css("visibility","visible");
    })
}

function inRange(x, min, max) {
    return min <= x && x <= max;
}