(function() {
    var questions = [{
        question: "V běhu využíváme techniky běhu:",
        choices: ["šlapavý a švihadlový", "šlapadlový a švihový", "šlapavý a švihový"],
        correctAnswer: 2
    }, {
        question: "Sprinter hned po startu využívá techniku běhu:",
        choices: ["šlapavého", 
                  "švihového",
                  "frekvenčního"],
        correctAnswer: 0
    }, {
        question: "Každý běžecký krok se skládá z fází:",
        choices: ["oporová, dokročná, vzletová", 
                  "doběhová, letová, došlapová",
                  "oporová a bezoporová (letová)"],
        correctAnswer: 2
    }, {
        question: "Při běhu běžce pohání tyto fyzikální síly:",
        choices: ["třecí síla, síla větru proti běhu, gravitační síla", 
                  "gravitační síla, odrazová síla, setrvačná rychlost", 
                  "odporová síla větru, tření, setrvačná rychlost"],
        correctAnswer: 1
    }, {
        question: "Maratonec běží převážnou část své závodní trasy technikou:",
        choices: ["maratonskou", 
                  "švihovou",
                  "šlapavou"],
        correctAnswer: 1
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