
const incorrectAnswer = [1, 2, 3, 4];
const answer = 6;

const option = (answer, incorrectAnswer) => {
        const length = incorrectAnswer.length;
        const randomNum = Math.floor(Math.random() * (length + 1))
        incorrectAnswer.splice(randomNum, 0, answer)
        return incorrectAnswer;


}






console.log(option(answer,incorrectAnswer))



