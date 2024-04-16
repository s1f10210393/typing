const RANDOM_SENTENCE_URL_API = "https://official-joke-api.appspot.com/jokes/random";
const typeDisplay = document.getElementById('typeDisplay');
const typeInput = document.getElementById("typeInput");
const timer = document.getElementById("timer");
const result = document.getElementById('result');

let correctIndex = 0;


typeInput.addEventListener("input", () => {
    const sentenceArray = typeDisplay.querySelectorAll("span");//sentenceArrayにspanタグがついているものを入れる
    // console.log(sentenceArray);
    const arrayValue = typeInput.value.split("");//入力した文字をarrayValueに入れる
    // console.log(arrayValue);

    let correct = true;



    //characterSpan,indexがよくわからない
    sentenceArray.forEach((characterSpan, index) =>{ 
        if((arrayValue[index] == null)){
            characterSpan.classList.remove("correct");
            characterSpan.classList.remove("incorrect");
            correct = false;
        }
        else if(characterSpan.innerText == arrayValue[index]){
            characterSpan.classList.add("correct");
            characterSpan.classList.remove("incorrect");
        }
        else{
            characterSpan.classList.add("incorrect");
            characterSpan.classList.remove("correct");
            correct = false;
            typeInput.value = arrayValue.slice(0, index).join("");
        }
    })

    if(correct == true){
        correctIndex++;
        RenderNextSentence();   
        resultCount();
    }

});






function GetRandomSentence(){
    return fetch(RANDOM_SENTENCE_URL_API).then((response) => response.json()).then((data) => data.setup);
}

//GetRandomSentenceが非同期処理なためasync,awaitを使用しGetRandomSentenceの処理が終わるまで待つ
async function RenderNextSentence(){
    const sentence = await GetRandomSentence();
    // console.log(sentence);

    typeDisplay.innerText = ""; //innerTextはhtmlテキストを取得することができる。
    
    let oneText = sentence.split("");//sentenceを一つ一つ区切る
    
    //foreach配列の中身を一つ一つ確認する関数
    oneText.forEach((character) => {
        const characterSpan = document.createElement("span");
        characterSpan.innerText = character;
        // console.log(characterSpan);
        typeDisplay.appendChild(characterSpan);
        // characterSpan.classList.add("correct");//classList.add("correct")はcharacterSpanにcorrectというクラスを追加する
    });

    typeInput.value = "";//typeInputのtypeを表示させなくする。
    
    StartTimer();
}

let startTime;
let originTime = 30;

function StartTimer(){
    timer.innerText = originTime;
    startTime = new Date();
    setInterval(() => {
        timer.innerText = originTime - getTimerTime();
        if(timer.innerText <= 0)TimeUp();

    }, 1000);

}


function getTimerTime(){
    return Math.floor((new Date()- startTime) / 1000);

};

function TimeUp(){
    RenderNextSentence();
    // window.location.href= "ommg.html";
    
}


RenderNextSentence();