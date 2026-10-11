//Create a survey with 5 questions and based on those answers randomly generate Wu-Tang inspired names 
//5 survey answers -> pool of names -> randomly select names -> server returns generated name

//Select HTML elements needed for the survey and the answers selected by the user
//Listen for the user to submit the survey - click "Generate Name" button 
//Collect the user's answers
//Prevent survey submission without all 5 questions answered
//Store answers in an object - use each question as a key 
//Convert server response from JSON into an Object 
//Display the generated name 

//Select the HTML elements
const surveyQuestions = document.querySelector('#surveyQuestions');
const result = document.querySelector('#result');
const wuTangName = document.querySelector('#wu-tangName');

//Listens for user clicking the Submit Button "Generate Name"
surveyQuestions.addEventListener('submit', generateName);

function generateName(event) { 
    event.preventDefault();  //prevent browser from reloading the page at form submission

    //names of the radio button groups in HTML
    const questionNames  = ['personality', 'animal', 'element', 'season', 'time'];

    //finds the user chosen answer for each question
    const userAnswers = questionNames.map(function(question)
    {
        const userInput = document.querySelector('input[name="' + question + '"]:checked'
        );

            return userInput ? userInput.value : ''; //return user input or empty string
        });

        //checks that all 5 questions have been answered 
        if(userAnswers.includes('')) {
            return; 
        }

        //creates an object to pair question with answer 
        const answers = {};

        questionNames.forEach(function(question,index) { 
            answers[question] = userAnswers[index];
        });

        //send information collected to the server
        //answer
        fetch('/api?generate=' + encodeURIComponent(JSON.stringify(answers)))
            .then(res => res.json())
            .then(data => { 
                console.log(data)
                wuTangName.textContent = data.name;
                result.hidden = false;
            })       
            .catch(err => {                //catch errors and handle issue with the request
            console.log('Error', err)
        })
}

//Display the survey 
//User selects one answer for each question 
//User selection is sent to the server 
//Server received the survey answers and selects a random word for each 
//Random words are combined to create a name
//Server returns the generated name and displays "Your Wu-Tang name is... "
//Restart Button for another use
