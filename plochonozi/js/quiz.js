(function() {
    var questions = [{
        question: "Člověk moderní doby má sníženou přirozenou pohybovou aktivitu díky:",
        choices: ["nedostatku sportovních zařízení", "technologickému pokroku", "bipedální lokomoci"],
        correctAnswer: 1
    }, {
        question: "Celkový objem pohybové aktivity u dětí může ovlivnit:",
        choices: ["čas trávený u PC, televize, mobilních telefonů", "výuka tělesné výchovy", "nevyvážená strava"],
        correctAnswer: 0
    }, {
        question: "Bipedální lokomoce znamená:",
        choices: ["chůze po čtyřech končetinách", "chůze po dvou končetinách", "plazení"],
        correctAnswer: 1
    }, {
        question: "Klenba nohy je vyvinuta:",
        choices: ["až v dospělosti (zhruba ve 20 letech)", "už při narození", "nikdy se zcela nevyvine"],
        correctAnswer: 1
    }, {
        question: "Obraz klenby nohy můžeme zjistit:",
        choices: ["podle tvaru bot", "pouhým pohledem", "otiskem nohy na podložku"],
        correctAnswer: 2
    }, {
        question: "Nožní klenba je část chodidla, která:",
        choices: ["nemusí být v kontaktu s podložkou", "tvoří část paty", "ohýbá nohu v hlezenním kloubu (kotníku)"],
        correctAnswer: 0
    }, {
        question: "Kostra nohy je složena z celkem:",
        choices: ["26 kostí", "56 kostí", "9 kostí"],
        correctAnswer: 0
    }, {
        question: "Zdravá noha má:",
        choices: ["plochý tvar", "pouze klenbu příčnou", "klenbu příčnou a podélnou"],
        correctAnswer: 2
    }, {
        question: "Podélná klenba se rozkládá mezi:",
        choices: ["patou a předním okrajem nártních kostí", "předním okrajem nártních kostí a články prstů", "kostmi klínovými a kostí krychlovou"],
        correctAnswer: 0
    }, {
        question: "Hlavní anatomické části klenby nohy jsou tvořeny:",
        choices: ["pouze kostmi nohy", "pouze vazy nohy", "kostmi, vazy a svaly nohy"],
        correctAnswer: 2
    }, {
        question: "Klenba nohy:",
        choices: ["zajišťuje pružnost nohy a stabilizuje stoj člověka", "je stálá a neměnná po celý život člověka", "není důležitá pro pohyb člověka"],
        correctAnswer: 0
    }, {
        question: "Pokud jsou vazy a svaly podporující klenbu nohy ochablé a oslabené:",
        choices: ["klenba nohy drží svůj tvar", "mění se tvar nášlapné plochy chodidla a může dojít k oploštění klenby", "nemá to vliv na žádnou část nohy"],
        correctAnswer: 1
    }, {
        question: "Oploštění nožní klenby podporuje:",
        choices: ["používání nevhodné obuvi a nadměrná hmotnost jedince", "chůze naboso po nerovném povrchu", "přiměřená pohybová aktivita"],
        correctAnswer: 0
    }, {
        question: "Jako vhodnou obuv na cvičení můžeme označit:",
        choices: ["obuv, která má volnou patu", "obuv se špatně tvarovanou vložkou a měkkou v nártu", "obuv pevnou v nártu, která je přiměřená délce chodidla"],
        correctAnswer: 2
    }, {
        question: "Prevencí vzniku plochonoží je:",
        choices: ["nepřiměřená fyzická zátěž", "dlouhodobé stání", "chůze naboso po písku"],
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