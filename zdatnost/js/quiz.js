(function() {
    var questions = [{
        question: "Co je to tepová frekvence?",
        choices: ["hmatatelný pulz srdce, který se dá změřit kdekoliv na těle", "počet úderů žíly na těle", "počet stahů svalů za minutu"],
        correctAnswer: 0
    }, {
        question: "Pro přibližné stanovení hodnoty maximální srdeční frekvence (SF<sub>max</sub>) se používá výpočet dle vzorce:",
        choices: ["SF<sub>max</sub> = 220 – tělesná výška", "SF<sub>max</sub> = 220 – věk", "SF<sub>max</sub> = 220 – tělesná hmotnost"],
        correctAnswer: 1
    }, {
        question: "Jak zjistím manuálně tepovou frekvenci?",
        choices: ["Přiložím ukazováček a prostředníček na krk nebo zápěstí a změřím srdeční tep za 10 sekund a vynásobím čtyřmi.", 
                  "Přiložím ukazováček a prostředníček na krk nebo zápěstí a změřím srdeční tep za 10 sekund a vynásobím šesti.",
                  "Přiložím ukazováček a prostředníček na krk nebo zápěstí a změřím srdeční tep za 15 sekund a vynásobím šesti."],
        correctAnswer: 1
    }, {
        question: "Co je to aerobní pásmo?",
        choices: ["Je zóna vhodná pro pohybové aktivity, které jsou hodně náročné, bez přístupu kyslíku. Srdeční frekvence se pohybuje v pásmu 85–95 % vaší SF<sub>max</sub>.", 
                  "Je zóna vhodná pro pohybové aktivity, při kterých dochází v těle k fyziologickým procesům bez přístupu kyslíku. Jedná se o pásmo přibližně 85–95 % vaší SF<sub>max</sub>.",
                  "Je zóna vhodná pro pohybové aktivity, při kterých dochází v těle k fyziologickým procesům za přístupu kyslíku. Jedná se o pásmo přibližně 55–75 % vaší SF<sub>max</sub>."],
        correctAnswer: 2
    }, {
        question: "Když se budu chtít zlepšit ve své výkonnosti a chci, aby mé sportování mělo význam:",
        choices: ["Při cvičení v aerobní zóně musím strávit nepřetržitě minimálně 10 minut a činnost opakovat minimálně jednou týdně.", 
                  "Při cvičení v aerobní zóně musím strávit nepřetržitě minimálně 20 minut a činnost opakovat minimálně jednou týdně.", 
                  "Při cvičení v aerobní zóně musím strávit nepřetržitě minimálně 20 minut a činnost opakovat minimálně třikrát týdně."],
        correctAnswer: 2
    }];

    var questionCounter = 0; //Tracks question number
    var selections = []; //Array containing user choices
    var quiz = $('#quiz'); //Quiz div object

    // Display initial question
    displayNext();

    //remove errors on selection
    quiz.on('click', '[type="radio"], label', function(){
        $('#quiz').removeClass('border-danger').addClass('border-dark').parent().find('.error').remove();
    });

    // Click handler for the 'next' button
    $('#next').on('click', function (e) {
        e.preventDefault();

        // Suspend click listener during fade animation
        if(quiz.is(':animated')) {
            return false;
        }
        choose();

        // If no user selection, progress is stopped
        if (isNaN(selections[questionCounter])) {
            if(!$('#quiz').hasClass('border-danger')){
                $('#quiz').removeClass('border-dark').addClass('border-danger');
                $('#quiz').parent().append('<div class="error">Prosím, zvolte odpověď!</div>');
            }
        } else {
            questionCounter++;
            displayNext();
        }
    });

    // Click handler for the 'prev' button
    $('#prev').on('click', function (e) {
        e.preventDefault();

        if(quiz.is(':animated')) {
            return false;
        }
        choose();
        questionCounter--;
        displayNext();
    });

    // Click handler for the 'Start Over' button
    $('#start').on('click', function (e) {
        e.preventDefault();

        if(quiz.is(':animated')) {
            return false;
        }
        questionCounter = 0;
        selections = [];
        displayNext();
        $('#start').hide();
    });


    // Creates and returns the div that contains the questions and
    // the answer selections
    function createQuestionElement(index) {
        var qElement = $('<div>', {
            id: 'question'
        });


        var header = $('<div class="card-header">Otázka ' + (index + 1) + '</div>');
        qElement.append(header);

        qElement.append($('<div class="card-body">'));
        var qBody = qElement.find('.card-body');
        var question = "<h2 class='h5 my-2'>" + questions[index].question + "</h2>";
        qBody.append(question);
        var radioButtons = createRadios(index);
        qBody.append(radioButtons);

        return qElement;
    }

    // Creates a list of the answer choices as radio inputs
    function createRadios(index) {
        var radioList = $('<fieldset>');
        var item;
        var input = '';
        for (var i = 0; i < questions[index].choices.length; i++) {
            item = $('<div class="my-2 custom-control custom-radio">');
            input = '<input type="radio" id="customRadio'+i+'" class="custom-control-input" name="answer" value=' + i + ' />';
            input += '<label class="custom-control-label" for="customRadio'+i+'">'+questions[index].choices[i]+'</label>';
            item.append(input);
            radioList.append(item);
        }
        return radioList;
    }

    // Reads the user selection and pushes the value to an array
    function choose() {
        selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }

    // Displays next requested element
    function displayNext() {
        quiz.fadeOut(function() {
            $('#question').remove();

            if(questionCounter < questions.length){
                var nextQuestion = createQuestionElement(questionCounter);
                quiz.append(nextQuestion).fadeIn();
                if (!(isNaN(selections[questionCounter]))) {
                    $('input[value='+selections[questionCounter]+']').prop('checked', true);
                }

                // Controls display of 'prev' button
                if(questionCounter === 1){
                    $('#prev').show();
                } else if(questionCounter === 0){

                    $('#prev').hide();
                    $('#next').show();
                }
            }else {
                var scoreElem = displayScore();
                quiz.append(scoreElem).fadeIn();
                $('#next').hide();
                $('#prev').hide();
                $('#start').show();
            }
        });
    }

    // Computes score and returns a paragraph element to be displayed
    function displayScore() {
        var scoreHTML = $('<div>',{id: 'question'});
        scoreHTML.append($('<div class="card-header">Hodnocení</div>'))

        var numCorrect = 0;
        for (var i = 0; i < selections.length; i++) {
            if (selections[i] === questions[i].correctAnswer) {
                numCorrect++;
            }
        }

        scoreHTML.append($('<div class="card-body">Z celkových ' + questions.length + ' otázek, jsi odpověděl ' + numCorrect + ' správně!</div>'));
        return scoreHTML;
    }
})();